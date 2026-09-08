import "dotenv/config";
import OpenAITranslator from "./translation/openai-translator.js";
import DeepLTranslator from "./translation/deepl-translator.js";

// --- CONFIGURATION ---
const SOURCE_DIR = "../locales/en";
const TARGET_DIR = "../locales";
const PROJECT_ROOT = "./"; // Root directory for checking image files

const TARGET_LANGS = [
  { code: "de", name: "German" },
];

// Limit concurrent calls to the API to avoid rate limits.
const MAX_CONCURRENT_TRANSLATIONS = 5;

/**
 * Factory function to create the appropriate translator based on the provider
 */
function createTranslator(provider) {
  const config = {
    sourceDir: SOURCE_DIR,
    targetDir: TARGET_DIR,
    targetLangs: TARGET_LANGS,
    maxConcurrentTranslations: MAX_CONCURRENT_TRANSLATIONS,
    projectRoot: PROJECT_ROOT,
  };

  switch (provider.toLowerCase()) {
    case "openai":
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("❌ OPENAI_API_KEY environment variable is not set.");
      }

      config.apiKey = process.env.OPENAI_API_KEY;
      config.cachePath = "./translation-cache.json";
      config.model = "gpt-4.1-2025-04-14"; // Can be configured via env var if needed

      return new OpenAITranslator(config);

    case "deepl":
      if (!process.env.DEEPL_API_KEY) {
        throw new Error("❌ DEEPL_API_KEY environment variable is not set.");
      }

      config.apiKey = process.env.DEEPL_API_KEY;
      config.cachePath = "./translation-cache-deepl.json";
      return new DeepLTranslator(config);

    default:
      throw new Error(
        `❌ Unsupported translation provider: ${provider}. Use 'openai' or 'deepl'.`,
      );
  }
}

/**
 * Main function to run the translation process
 */
async function main() {
  // Get the translation provider from command line arguments or default to OpenAI
  const args = process.argv.slice(2);
  const provider = args[0] || "openai";

  console.log(
    `🚀 Starting translation process using ${provider.toUpperCase()}...`,
  );

  try {
    // Create and initialize the appropriate translator
    const translator = createTranslator(provider);
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
