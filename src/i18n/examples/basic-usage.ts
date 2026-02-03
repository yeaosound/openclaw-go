import {
  t,
  setLocale,
  getLocale,
  getAvailableLocales,
  hasTranslation,
  DEFAULT_LOCALE,
  isAvailableLocale,
} from "../index.js";

export async function demonstrateBasicUsage(): Promise<void> {
  console.log("=== Basic Usage Examples ===\n");

  // Example 1: Basic translation
  console.log("1. Basic translation:");
  console.log("   en:", t("cli.plugins.description"));

  // Example 2: Switch locale
  console.log("\n2. Switch to Chinese:");
  setLocale("zh-CN");
  console.log("   zh:", t("cli.plugins.description"));

  // Example 3: Get current locale
  console.log("\n3. Current locale:", getLocale());

  // Example 4: List available locales
  console.log("\n4. Available locales:", getAvailableLocales().join(", "));

  // Example 5: Check if translation exists
  console.log("\n5. Check translation exists:");
  console.log("   cli.plugins.description:", hasTranslation("cli.plugins.description"));
  console.log("   non.existing.key:", hasTranslation("non.existing.key"));

  // Reset to default
  setLocale(DEFAULT_LOCALE);
}

export async function demonstrateInterpolation(): Promise<void> {
  console.log("\n=== Interpolation Examples ===\n");

  // Example 1: Simple interpolation
  console.log("1. Simple interpolation:");
  console.log("   en:", t("pairing.request.code", { code: "123456" }));

  // Example 2: Multiple parameters
  console.log("\n2. Multiple parameters:");
  console.log("   en:", t("pairing.request.idLine", { id: "user123" }));

  // Example 3: Switch language and interpolate
  console.log("\n3. Chinese with interpolation:");
  setLocale("zh-CN");
  console.log("   zh:", t("pairing.request.code", { code: "654321" }));

  // Reset
  setLocale(DEFAULT_LOCALE);
}

export async function demonstrateErrorHandling(): Promise<void> {
  console.log("\n=== Error Handling Examples ===\n");

  // Example 1: Non-existent key returns the key itself
  console.log("1. Non-existent key:");
  console.log("   Result:", t("this.key.does.not.exist"));

  // Example 2: Check locale validity
  console.log("\n2. Check locale validity:");
  console.log('   isAvailableLocale("en"):', isAvailableLocale("en"));
  console.log('   isAvailableLocale("fr"):', isAvailableLocale("fr"));

  // Example 3: Invalid locale throws error
  console.log("\n3. Invalid locale handling:");
  try {
    setLocale("invalid-locale");
  } catch (error) {
    console.log("   Error:", (error as Error).message);
  }
}

export async function runAllExamples(): Promise<void> {
  await demonstrateBasicUsage();
  await demonstrateInterpolation();
  await demonstrateErrorHandling();

  console.log("\n=== All examples completed ===");
  console.log("\nTip: Set OPENCLAW_LANG environment variable to change language:");
  console.log("  OPENCLAW_LANG=zh-CN pnpm openclaw --help");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runAllExamples().catch(console.error);
}
