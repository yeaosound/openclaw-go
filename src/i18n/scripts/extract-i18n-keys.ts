#!/usr/bin/env node --import tsx
/**
 * i18n Key Extraction Script
 *
 * Automatically extracts hardcoded text from source files
 * and generates a report of missing translation keys.
 *
 * Usage:
 *   pnpm tsx scripts/extract-i18n-keys.ts
 *   pnpm tsx scripts/extract-i18n-keys.ts --format=json
 *   pnpm tsx scripts/extract-i18n-keys.ts --output=missing-keys.json
 */

import { glob } from 'glob';
import { readFile, writeFile } from 'fs/promises';
import { join, relative } from 'path';

interface ExtractedText {
  type: 'description' | 'message' | 'label' | 'text' | 'note';
  text: string;
  file: string;
  line: number;
  suggestedKey?: string;
}

interface ExtractionReport {
  generatedAt: string;
  total: number;
  byType: Record<string, number>;
  byFile: Record<string, number>;
  items: ExtractedText[];
}

// Patterns to extract
const PATTERNS = [
  {
    type: 'description' as const,
    regex: /\.description\(["'`]([^"'`]+)["'`]\)/g,
  },
  {
    type: 'message' as const,
    regex: /message:\s*["'`]([^"'`]+)["'`]/g,
  },
  {
    type: 'label' as const,
    regex: /label:\s*["'`]([^"'`]+)["'`]/g,
  },
  {
    type: 'text' as const,
    regex: /text:\s*["'`]([^"'`]+)["'`]/g,
  },
  {
    type: 'note' as const,
    regex: /\.note\(["'`]([^"'`]+)["'`]\)/g,
  },
];

// Files to exclude
const EXCLUDE_PATTERNS = [
  '**/*.test.ts',
  '**/*.spec.ts',
  '**/node_modules/**',
  '**/dist/**',
  '**/i18n/**',
];

// Generate suggested key from text
function suggestKey(text: string, type: string, file: string): string {
  // Clean up text
  const clean = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .substring(0, 50);

  // Determine prefix based on file path
  let prefix = 'cli';
  if (file.includes('wizard')) prefix = 'wizard';
  if (file.includes('pairing')) prefix = 'pairing';
  if (file.includes('channels')) prefix = 'channel';
  if (file.includes('browser')) prefix = 'browser';

  // Generate key parts
  const words = clean.split(/\s+/).slice(0, 5);
  const keyPart = words.join('-').replace(/--+/g, '-');

  return `${prefix}.${type}.${keyPart}`;
}

async function extractKeys(): Promise<ExtractionReport> {
  const files = await glob('src/**/*.ts', {
    ignore: EXCLUDE_PATTERNS,
  });

  const items: ExtractedText[] = [];

  for (const file of files) {
    const content = await readFile(file, 'utf-8');
    const lines = content.split('\n');

    for (const { type, regex } of PATTERNS) {
      let match;
      // Reset regex for each file
      const fileRegex = new RegExp(regex.source, 'g');

      while ((match = fileRegex.exec(content)) !== null) {
        // Find line number
        const textBeforeMatch = content.substring(0, match.index);
        const line = textBeforeMatch.split('\n').length;

        const text = match[1];

        // Skip if already using t() function
        const lineContent = lines[line - 1] || '';
        if (lineContent.includes("t('") || lineContent.includes('t("')) {
          continue;
        }

        // Skip common non-translatable patterns
        if (text.match(/^[\d.]+$/)) continue; // Numbers only
        if (text.match(/^https?:\/\//)) continue; // URLs
        if (text.match(/^\d+(ms|s|min|h)$/)) continue; // Time units
        if (text.startsWith('CLI:')) continue; // Debug prefixes
        if (text.length < 3) continue; // Too short

        items.push({
          type,
          text,
          file: relative(process.cwd(), file),
          line,
          suggestedKey: suggestKey(text, type, file),
        });
      }
    }
  }

  // Calculate stats
  const byType: Record<string, number> = {};
  const byFile: Record<string, number> = {};

  for (const item of items) {
    byType[item.type] = (byType[item.type] || 0) + 1;
    byFile[item.file] = (byFile[item.file] || 0) + 1;
  }

  return {
    generatedAt: new Date().toISOString(),
    total: items.length,
    byType,
    byFile,
    items,
  };
}

function generateMarkdownReport(report: ExtractionReport): string {
  const lines: string[] = [
    '# i18n Key Extraction Report',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '## Summary',
    '',
    `- **Total items:** ${report.total}`,
    `- **By type:**`,
    ...Object.entries(report.byType).map(([type, count]) =>
      `  - ${type}: ${count}`
    ),
    '',
    '## Details',
    '',
    '| Type | Text | File | Line | Suggested Key |',
    '|------|------|------|------|---------------|',
    ...report.items.map(item =>
      `| ${item.type} | ${item.text.substring(0, 50)}${item.text.length > 50 ? '...' : ''} | ${item.file} | ${item.line} | \`${item.suggestedKey}\` |`
    ),
    '',
    '## Action Items',
    '',
    '1. Review each extracted text',
    '2. Add appropriate translation keys to `src/i18n/locales/en/*.ts`',
    '3. Add Chinese translations to `src/i18n/locales/zh-CN/*.ts`',
    '4. Replace hardcoded text with `t("key")` calls',
    '',
    '## Example Migration',
    '',
    '### Before:',
    '```typescript',
    '.description("List discovered plugins")',
    '```',
    '',
    '### After:',
    '```typescript',
    'import { t } from "../i18n/index.js";',
    '.description(t(\'cli.plugins.list.description\'))',
    '```',
  ];

  return lines.join('\n');
}

async function main() {
  const args = process.argv.slice(2);
  const format = args.find(a => a.startsWith('--format='))?.split('=')[1] || 'markdown';
  const output = args.find(a => a.startsWith('--output='))?.split('=')[1];

  console.log('🔍 Extracting i18n keys from source files...');

  const report = await extractKeys();

  if (format === 'json') {
    const json = JSON.stringify(report, null, 2);
    if (output) {
      await writeFile(output, json);
      console.log(`✅ JSON report saved to: ${output}`);
    } else {
      console.log(json);
    }
  } else {
    const markdown = generateMarkdownReport(report);
    if (output) {
      await writeFile(output, markdown);
      console.log(`✅ Markdown report saved to: ${output}`);
    } else {
      console.log(markdown);
    }
  }

  console.log(`\n📊 Found ${report.total} items to migrate`);
  console.log('Run with --format=json for machine-readable output');
  console.log('Run with --output=file.md to save to file');
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
