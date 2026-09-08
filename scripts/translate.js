import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAITranslator from "./translation/openai-translator.js";
import DeepLTranslator from "./translation/deepl-translator.js";
import HuerrayTranslator, { DEFAULT_ENDPOINT as HUERRAY_TRANSLATION_ENDPOINT } from "./translation/huerray-translator.js";
import { BaseTranslator } from "./translation/base.js";

// --- CONFIGURATION ---
const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = path.join(PROJECT_ROOT, "locales", "en");
const TARGET_DIR = path.join(PROJECT_ROOT, "locales");

const TARGET_LANGS = [
  { code: "de", name: "German" },
];

// Limit concurrent calls to the API to avoid rate limits.
const MAX_CONCURRENT_TRANSLATIONS = 5;

/**
 * Factory function to create the appropriate translator based on the provider
 */
function createTranslator(provider, { dryRun = false } = {}) {
  const config = {
    sourceDir: SOURCE_DIR,
    targetDir: TARGET_DIR,
    targetLangs: TARGET_LANGS,
    maxConcurrentTranslations: MAX_CONCURRENT_TRANSLATIONS,
    projectRoot: PROJECT_ROOT,
    dryRun,
  };

  switch (provider.toLowerCase()) {
    case "huerray":
      config.cachePath = path.join(PROJECT_ROOT, "translation-cache.json");
      config.endpoint = process.env.HUERRAY_TRANSLATION_ENDPOINT || HUERRAY_TRANSLATION_ENDPOINT;
      config.origin = process.env.HUERRAY_TRANSLATION_ORIGIN || "https://deexpress-logistics.eu";
      return new HuerrayTranslator(config);

    case "openai":
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("❌ OPENAI_API_KEY environment variable is not set.");
      }

      config.apiKey = process.env.OPENAI_API_KEY;
      config.cachePath = path.join(PROJECT_ROOT, "translation-cache.json");
      config.model = process.env.OPENAI_MODEL || "gpt-4.1-2025-04-14";

      return new OpenAITranslator(config);

    case "deepl":
      if (!process.env.DEEPL_API_KEY) {
        throw new Error("❌ DEEPL_API_KEY environment variable is not set.");
      }

      config.apiKey = process.env.DEEPL_API_KEY;
      config.cachePath = path.join(PROJECT_ROOT, "translation-cache-deepl.json");
      return new DeepLTranslator(config);

    default:
      throw new Error(
        `❌ Unsupported translation provider: ${provider}. Use 'huerray', 'openai', or 'deepl'.`,
      );
  }
}

/**
 * Main function to run the translation process
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const checkOnly = args.includes("--check");
  const provider = args.find((arg) => !arg.startsWith("--")) || "huerray";

  if (args.includes("--help") || args.includes("-h")) {
    console.log("Usage: npm run translate -- [huerray|openai|deepl] [--dry-run|--check]");
    return;
  }

  console.log(
    `🚀 Starting translation process using ${provider.toUpperCase()}...`,
  );

  try {
    if (checkOnly) {
      const validator = new BaseTranslator({ sourceDir: SOURCE_DIR });
      await validator.validateSourceFiles();
      console.log("✅ Translation configuration and source locale files are valid.");
      return;
    }

    // Create and initialize the appropriate translator
    const translator = createTranslator(provider, { dryRun });
    await translator.initialize();

    // Run the translation process
    await translator.processFiles();

    console.log(`\n🎉 Translation process completed successfully!`);
  } catch (err) {
    console.error("\n❌ An unrecoverable error occurred:", err.message);
    if (err.stack) {
      console.error(err.stack);
    }
    process.exit(1);
  }
}

// Run the main function
main();
