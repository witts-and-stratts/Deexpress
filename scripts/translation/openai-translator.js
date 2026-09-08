import { OpenAI } from 'openai';
import { BaseTranslator, shouldSkipTranslation } from './base.js';

/**
 * OpenAI-based translator implementation
 */
class OpenAITranslator extends BaseTranslator {
    constructor(config) {
        super(config);
        
        if (!config.apiKey) {
            throw new Error('OpenAI API key is required');
        }
        
        this.openai = new OpenAI({ apiKey: config.apiKey });
        this.model = config.model || 'gpt-4.1-2025-04-14';
        this.temperature = config.temperature || 0.3;
        this.maxTokens = config.maxTokens || 1500;
    }

    /**
     * Translates a single string of text using the OpenAI API.
     */
    async translateText(text, targetLang) {
        if (shouldSkipTranslation(text)) {
            return text;
        }

        const cacheKey = `${targetLang.code}::${text}`;
        if (Object.hasOwn(this.cache, cacheKey)) {
            return this.cache[cacheKey];
        }

        await this.translationSemaphore.acquire();
        try {
            const prompt = `Translate the text below to ${targetLang.name}.

Return only the translation. Preserve every placeholder, including {{variable}} and {{{variable}}}, exactly. Preserve URLs, paths, markup, line breaks, and punctuation.

Text to translate:
${text}`;

            const res = await this.openai.chat.completions.create({
                model: this.model,
                messages: [{ role: 'user', content: prompt }],
                temperature: this.temperature,
                max_tokens: this.maxTokens,
            });

            const content = res.choices[0]?.message?.content;
            if (typeof content !== 'string' || content.trim() === '') {
                throw new Error('OpenAI returned no translation text.');
            }
            const result = content.trim();

            this.cache[cacheKey] = result;
            return result;

        } catch (error) {
            console.error(`❌ Failed to translate "${text}" to ${targetLang.name}:`, error.message);
            return text; // Return original text on failure
        } finally {
            this.translationSemaphore.release();
        }
    }
}

export default OpenAITranslator;
