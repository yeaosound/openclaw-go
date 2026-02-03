#!/usr/bin/env node
/**
 * Translation Keys Validation Script
 *
 * Validates that:
 * 1. All translation keys used in code exist in locale files
 * 2. All keys in locale files are used in code
 * 3. EN and ZH-CN locale files have the same keys
 */

import { readFile } from "fs/promises";
import { glob } from "glob";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { en } from "../locales/en/index.js";
import { zhCN } from "../locales/zh-CN/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const T_KEY_PATTERN = /t\(['"`]([^'"`]+)['"`]/g;

async function extractKeysFromCode() {
  const srcDir = join(__dirname, "..");
  const files = await glob("**/*.ts", {
    cwd: srcDir,
    ignore: ["**/*.test.ts", "**/node_modules/**", "**/dist/**"],
  });

  const usedKeys = new Set<string>();
  const keyLocations: Record<string, string[]> = {};

  for (const file of files) {
    const content = await readFile(join(srcDir, file), "utf-8");
    let match;

    while ((match = T_KEY_PATTERN.exec(content)) !== null) {
      const key = match[1];
      usedKeys.add(key);

      if (!keyLocations[key]) {
        keyLocations[key] = [];
      }
      keyLocations[key].push(file);
    }
  }

  return { usedKeys, keyLocations };
}

function validateTranslations() {
  const enKeys = Object.keys(en);
  const zhKeys = Object.keys(zhCN);

  const issues: Array<{ type: string; message: string; keys?: string[] }> = [];

  // Check EN locale keys
  const enKeySet = new Set(enKeys);

  // Check ZH-CN locale keys
  const zhKeySet = new Set(zhKeys);

  // Check 1: Keys in EN but not in ZH-CN
  const missingInZh = enKeys.filter((key) => !zhKeySet.has(key));
  if (missingInZh.length > 0) {
    issues.push({
      type: "missing_in_zh",
      message: `Keys in EN but missing in ZH-CN: ${missingInZh.length}`,
      keys: missingInZh,
    });
  }

  // Check 2: Keys in ZH-CN but not in EN
  const missingInEn = zhKeys.filter((key) => !enKeySet.has(key));
  if (missingInEn.length > 0) {
    issues.push({
      type: "missing_in_en",
      message: `Keys in ZH-CN but missing in EN: ${missingInEn.length}`,
      keys: missingInEn,
    });
  }

  // Check 3: Count statistics
  const stats = {
    en: enKeys.length,
    zh: zhKeys.length,
    common: enKeys.filter((key) => zhKeySet.has(key)).length,
  };

  return { issues, stats, enKeySet, zhKeySet };
}

async function main() {
  console.log("🔍 Translation Keys Validation\n");

  // Step 1: Extract keys from code
  console.log("Step 1: Extracting keys from source code...");
  const { usedKeys, keyLocations } = await extractKeysFromCode();
  console.log(`  Found ${usedKeys.size} unique translation keys in code\n`);

  // Step 2: Validate locale files
  console.log("Step 2: Validating locale files...");
  const { issues, stats, enKeySet, zhKeySet } = validateTranslations();

  console.log(`  EN locale: ${stats.en} keys`);
  console.log(`  ZH-CN locale: ${stats.zh} keys`);
  console.log(`  Common keys: ${stats.common}\n`);

  // Step 3: Check used keys exist in locales
  console.log("Step 3: Checking used keys exist in locales...");
  const missingInLocales: string[] = [];

  for (const key of usedKeys) {
    if (!enKeySet.has(key) && !zhKeySet.has(key)) {
      missingInLocales.push(key);
    }
  }

  if (missingInLocales.length > 0) {
    issues.push({
      type: "missing_in_locales",
      message: `Keys used in code but missing in locales: ${missingInLocales.length}`,
      keys: missingInLocales,
    });
  } else {
    console.log("  ✅ All used keys exist in locales\n");
  }

  // Step 4: Check for unused keys in locales
  console.log("Step 4: Checking for unused keys in locales...");
  const unusedKeys: string[] = [];

  for (const key of enKeySet) {
    if (!usedKeys.has(key)) {
      unusedKeys.push(key);
    }
  }

  if (unusedKeys.length > 0) {
    console.log(`  ⚠️  Found ${unusedKeys.length} unused keys in locales`);
    console.log("     (This may be normal for dynamically constructed keys)\n");
  } else {
    console.log("  ✅ All locale keys are used in code\n");
  }

  // Step 5: Report issues
  console.log("Step 5: Summary\n");

  if (issues.length === 0) {
    console.log("✅ All validation checks passed!\n");
    process.exit(0);
  } else {
    console.log(`❌ Found ${issues.length} issue(s):\n`);

    for (const issue of issues) {
      console.log(`  [${issue.type.toUpperCase()}] ${issue.message}`);
      if (issue.keys && issue.keys.length <= 10) {
        for (const key of issue.keys) {
          if (keyLocations[key]) {
            console.log(`    - ${key} (used in: ${keyLocations[key].slice(0, 3).join(", ")})`);
          } else {
            console.log(`    - ${key}`);
          }
        }
      } else if (issue.keys) {
        console.log(`    - ... and ${issue.keys.length} more`);
      }
      console.log();
    }

    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
