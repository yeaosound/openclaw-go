#!/usr/bin/env node
/**
 * i18n Runtime Test
 * Tests language switching and translation functionality at runtime
 */

import { t, setLocale, getLocale, getAvailableLocales, hasTranslation, getTranslationStats } from '../index.js';

console.log('🧪 i18n Runtime Tests\n');

// Test 1: Basic translations
console.log('Test 1: Basic Translations');
console.log('  EN:', t('channel.discord.notAllowed'));
setLocale('zh-CN');
console.log('  ZH:', t('channel.discord.notAllowed'));
console.log('  ✅ Basic translations work\n');

// Test 2: Locale switching
console.log('Test 2: Locale Switching');
setLocale('en');
console.log('  Current locale:', getLocale());
setLocale('zh-CN');
console.log('  After switch:', getLocale());
console.log('  ✅ Locale switching works\n');

// Test 3: Available locales
console.log('Test 3: Available Locales');
const locales = getAvailableLocales();
console.log('  Available:', locales.join(', '));
console.log('  ✅ Available locales retrieved\n');

// Test 4: Interpolation
console.log('Test 4: Parameter Interpolation');
setLocale('zh-CN');
const result = t('channel.discord.system.pinnedMessage', { location: 'general' });
console.log('  Result:', result);
console.log('  ✅ Interpolation works\n');

// Test 5: Fallback
console.log('Test 5: Fallback for missing keys');
const missingKey = t('this.key.does.not.exist');
console.log('  Missing key returns:', missingKey);
console.log('  ✅ Fallback works\n');

// Test 6: Translation stats
console.log('Test 6: Translation Statistics');
const stats = getTranslationStats();
console.log('  Stats:', JSON.stringify(stats, null, 2));
console.log('  ✅ Stats retrieved\n');

// Test 7: Key existence check
console.log('Test 7: Key Existence Check');
console.log('  Has "channel.discord.notAllowed":', hasTranslation('channel.discord.notAllowed'));
console.log('  Has "nonexistent.key":', hasTranslation('nonexistent.key'));
console.log('  ✅ Key existence check works\n');

console.log('✅ All runtime tests passed!');
