#!/usr/bin/env node
/**
 * Test detectSystemLanguage function
 */

import { detectSystemLanguage } from '../config.js';

console.log('Testing detectSystemLanguage function\n');

// Save original env
const originalLang = process.env.LANG;
const originalLcAll = process.env.LC_ALL;
const originalLcMessages = process.env.LC_MESSAGES;
const originalLanguage = process.env.LANGUAGE;

// Test cases
const testCases = [
  { env: { LANG: 'zh_CN.UTF-8' }, expected: 'zh-CN', description: 'Chinese with UTF-8' },
  { env: { LANG: 'en_US.UTF-8' }, expected: 'en', description: 'English US' },
  { env: { LC_ALL: 'zh_CN' }, expected: 'zh-CN', description: 'Chinese via LC_ALL' },
  { env: { LC_MESSAGES: 'zh_CN' }, expected: 'zh-CN', description: 'Chinese via LC_MESSAGES' },
  { env: { LANGUAGE: 'zh_CN:en_US' }, expected: 'zh-CN', description: 'Chinese via LANGUAGE' },
  { env: { LANG: 'zh_TW.UTF-8' }, expected: 'zh-CN', description: 'Taiwan Chinese (should match zh)' },
  { env: { LANG: 'de_DE.UTF-8' }, expected: undefined, description: 'German (not supported)' },
  { env: {}, expected: undefined, description: 'No language set' },
];

let passed = 0;
let failed = 0;

for (const testCase of testCases) {
  // Set environment
  process.env.LANG = testCase.env.LANG;
  process.env.LC_ALL = testCase.env.LC_ALL;
  process.env.LC_MESSAGES = testCase.env.LC_MESSAGES;
  process.env.LANGUAGE = testCase.env.LANGUAGE;
  
  const result = detectSystemLanguage();
  const success = result === testCase.expected;
  
  if (success) {
    console.log(`✅ ${testCase.description}`);
    console.log(`   Expected: ${testCase.expected}, Got: ${result}`);
    passed++;
  } else {
    console.log(`❌ ${testCase.description}`);
    console.log(`   Expected: ${testCase.expected}, Got: ${result}`);
    failed++;
  }
  console.log();
}

// Restore original env
process.env.LANG = originalLang;
process.env.LC_ALL = originalLcAll;
process.env.LC_MESSAGES = originalLcMessages;
process.env.LANGUAGE = originalLanguage;

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
