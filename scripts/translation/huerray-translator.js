import { BaseTranslator, shouldSkipTranslation, withRetry } from './base.js';

const DEFAULT_ENDPOINT = 'https://backend.huerray.de/api/v1/translation/translate';

/**
 * Translator backed by the Huerray/DeepL proxy endpoint.
 */
class HuerrayTranslator extends BaseTranslator {
    constructor(config) {
        super(config);

        this.endpoint = config.endpoint || DEFAULT_ENDPOINT;
        this.origin = config.origin || 'https://deexpress-logistics.eu';
        this.sourceLang = config.sourceLang || 'EN';
    }

    /**
     * Protect template expressions because the endpoint delegates to DeepL.
     */
    protectMustacheTemplates(text) {
        const placeholders = [];
        const protectedText = text.replace(/\{\{\{[\s\S]*?\}\}\}|\{\{[\s\S]*?\}\}/g, (match, index) => {
            const placeholder = `HUERRAY_PLACEHOLDER_${placeholders.length}_${index}`;
            placeholders.push({ placeholder, original: match });
            return placeholder;
        });

        return { protectedText, placeholders };
    }

    restoreMustacheTemplates(text, placeholders) {
        return placeholders.reduce(
            (result, { placeholder, original }) => result.split(placeholder).join(original),
            text,
        );
    }

    async requestTranslation(text, targetLang) {
        const { protectedText, placeholders } = this.protectMustacheTemplates(text);
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Referer: `${this.origin}/`,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent': 'Mozilla/5.0 (compatible; DeexpressTranslationScript/1.0)',
        };

        // The API identifies browser clients by Origin. Allow callers to override
        // it for staging or a different deployed frontend.
        if (this.origin) headers.Origin = this.origin;

        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                source_lang: this.sourceLang,
                target_lang: targetLang.code.toUpperCase(),
                text: [protectedText],
            }),
        });

        const rawBody = await response.text();
        let body;
        try {
            body = rawBody ? JSON.parse(rawBody) : null;
        } catch {
            body = rawBody;
        }

        if (!response.ok) {
            const message = typeof body === 'object' && body?.message
                ? body.message
                : rawBody || response.statusText;
            const error = new Error(`Huerray translation request failed (${response.status}): ${message}`);
            error.status = response.status;
            error.retryable = response.status === 429 || response.status >= 500;
            throw error;
        }

        const translatedText = body?.data?.translations?.[0]?.text;
        if (typeof translatedText !== 'string' || translatedText.trim() === '') {
            throw new Error('Huerray returned no translated text.');
        }

        return this.restoreMustacheTemplates(translatedText, placeholders);
    }

    async translateText(text, targetLang) {
        if (shouldSkipTranslation(text)) return text;

        const cacheKey = `${targetLang.code}::${text}`;
        if (Object.hasOwn(this.cache, cacheKey)) return this.cache[cacheKey];

        await this.translationSemaphore.acquire();
        try {
            const translatedText = await withRetry(
                () => this.requestTranslation(text, targetLang),
                3,
                500,
            );
            this.cache[cacheKey] = translatedText;
            return translatedText;
        } catch (error) {
            console.error(`❌ Failed to translate "${text.substring(0, 50)}..." to ${targetLang.code} using Huerray:`, error.message);
            return text;
        } finally {
            this.translationSemaphore.release();
        }
    }
}

export { DEFAULT_ENDPOINT };
export default HuerrayTranslator;
