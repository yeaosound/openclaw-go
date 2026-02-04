#!/usr/bin/env node --import tsx

import { en } from "../locales/en/index.js";
import { zhCN } from "../locales/zh-CN/index.js";

interface ValidationIssue {
  type: "missing" | "empty" | "mismatch" | "format";
  key: string;
  message: string;
  enValue?: string;
  zhValue?: string;
}

interface ValidationResult {
  valid: boolean;
  enCount: number;
  zhCount: number;
  issues: ValidationIssue[];
}

function validate(): ValidationResult {
  const issues: ValidationIssue[] = [];
  const enKeys = Object.keys(en);
  const zhKeys = Object.keys(zhCN);

  // Check for missing keys in zh-CN
  for (const key of enKeys) {
    if (!(key in zhCN)) {
      issues.push({
        type: "missing",
        key,
        message: `Missing in zh-CN`,
        enValue: en[key],
      });
    }
  }

  // Check for missing keys in en
  for (const key of zhKeys) {
    if (!(key in en)) {
      issues.push({
        type: "missing",
        key,
        message: `Missing in en`,
        zhValue: zhCN[key],
      });
    }
  }

  // Check for empty values
  for (const key of enKeys) {
    if (!en[key]?.trim()) {
      issues.push({
        type: "empty",
        key,
        message: `Empty value in en`,
      });
    }
  }

  for (const key of zhKeys) {
    if (!zhCN[key]?.trim()) {
      issues.push({
        type: "empty",
        key,
        message: `Empty value in zh-CN`,
      });
    }
  }

  // Check key format (should be lowercase with dots and hyphens)
  const validKeyPattern = /^[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)*$/;
  for (const key of [...enKeys, ...zhKeys]) {
    if (!validKeyPattern.test(key)) {
      issues.push({
        type: "format",
        key,
        message: `Invalid key format`,
      });
    }
  }

  return {
    valid: issues.length === 0,
    enCount: enKeys.length,
    zhCount: zhKeys.length,
    issues,
  };
}

function main() {
  const result = validate();

  console.log("🔍 i18n Validation Report");
  console.log("========================\n");

  console.log(`English keys: ${result.enCount}`);
  console.log(`Chinese keys: ${result.zhCount}`);
  console.log(`Issues found: ${result.issues.length}\n`);

  if (result.issues.length === 0) {
    console.log("✅ All validations passed!");
    process.exit(0);
  }

  // Group issues by type
  const byType: Record<string, ValidationIssue[]> = {};
  for (const issue of result.issues) {
    if (!byType[issue.type]) byType[issue.type] = [];
    byType[issue.type].push(issue);
  }

  for (const [type, issues] of Object.entries(byType)) {
    console.log(`\n${type.toUpperCase()} (${issues.length}):`);
    for (const issue of issues) {
      console.log(`  - ${issue.key}: ${issue.message}`);
      if (issue.enValue) console.log(`    EN: "${issue.enValue.substring(0, 50)}"`);
      if (issue.zhValue) console.log(`    ZH: "${issue.zhValue.substring(0, 50)}"`);
    }
  }

  console.log("\n❌ Validation failed");
  process.exit(1);
}

main();
