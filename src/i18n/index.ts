/**
 * i18n Core Module
 *
 * Main entry point for the internationalization system.
 * Provides translation functions and locale management.
 *
 * @example
 * ```typescript
 * import { t, setLocale } from './i18n/index.js';
 *
 * // Basic usage
 * console.log(t('cli.plugins.description'));
 * // => "Manage OpenClaw plugins/extensions" (en)
 * // => "管理 OpenClaw 插件/扩展" (zh-CN)
 *
 * // With interpolation
 * console.log(t('common.status.loading', { item: 'gateway' }));
 * // => "Loading gateway..."
 *
 * // Change locale
 * setLocale('zh-CN');
 * ```
 */

import type { InterpolationParams, AvailableLocale } from "./types.js";
// Import locale data
import { en } from "./locales/en/index.js";
import { zhCN } from "./locales/zh-CN/index.js";
import { zhHK } from "./locales/zh-HK/index.js";
import { zhTW } from "./locales/zh-TW/index.js";
import { DEFAULT_LOCALE, isAvailableLocale, type LocaleLoader } from "./types.js";

/**
 * Locale data storage
 */
const localeData: Record<AvailableLocale, Record<string, string>> = {
  en,
  "zh-CN": zhCN,
  "zh-HK": zhHK,
  "zh-TW": zhTW,
};

/**
 * Currently active locale
 */
let currentLocale: AvailableLocale = DEFAULT_LOCALE;

/**
 * Custom locale loader (for dynamic loading)
 */
let customLoader: LocaleLoader | null = null;

/**
 * Get a translation by key
 *
 * @param key - Translation key (e.g., 'cli.plugins.description')
 * @param params - Optional interpolation parameters
 * @returns Translated string (or key itself if not found)
 *
 * @example
 * ```typescript
 * t('cli.plugins.description')
 * // => "Manage OpenClaw plugins/extensions"
 *
 * t('common.time.minutesAgo', { count: 5 })
 * // => "5 minutes ago"
 * ```
 */
export function t(key: string, params?: InterpolationParams): string {
  const messages = localeData[currentLocale] ?? localeData[DEFAULT_LOCALE];
  let message = messages[key];

  // Fallback to key itself if translation not found
  if (message === undefined) {
    // Try fallback locale
    if (currentLocale !== DEFAULT_LOCALE) {
      const fallbackMessages = localeData[DEFAULT_LOCALE];
      message = fallbackMessages[key];
    }

    // If still not found, return the key
    if (message === undefined) {
      return key;
    }
  }

  // Handle interpolation
  if (params) {
    Object.entries(params).forEach(([paramKey, value]) => {
      if (value !== undefined) {
        // Replace all occurrences: {key} -> value
        message = message.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(value));
      }
    });
  }

  return message;
}

/**
 * Set the current locale
 *
 * @param locale - Locale code (e.g., 'zh-CN', 'en')
 * @throws Error if locale is not available
 *
 * @example
 * ```typescript
 * setLocale('zh-CN');
 * console.log(t('cli.plugins.description')); // Chinese text
 * ```
 */
export function setLocale(locale: string): void {
  if (!isAvailableLocale(locale)) {
    throw new Error(
      `Locale "${locale}" is not available. ` +
        `Available locales: ${getAvailableLocales().join(", ")}`,
    );
  }
  currentLocale = locale;
}

/**
 * Get the current locale
 *
 * @returns Current locale code
 */
export function getLocale(): AvailableLocale {
  return currentLocale;
}

/**
 * Get all available locales
 *
 * @returns Array of available locale codes
 */
export function getAvailableLocales(): AvailableLocale[] {
  return Object.keys(localeData) as AvailableLocale[];
}

/**
 * Check if a translation key exists
 *
 * @param key - Translation key to check
 * @returns True if key exists in current or fallback locale
 */
export function hasTranslation(key: string): boolean {
  const messages = localeData[currentLocale] ?? localeData[DEFAULT_LOCALE];
  if (messages[key] !== undefined) {
    return true;
  }

  // Check fallback
  if (currentLocale !== DEFAULT_LOCALE) {
    const fallbackMessages = localeData[DEFAULT_LOCALE];
    return fallbackMessages[key] !== undefined;
  }

  return false;
}

/**
 * Set a custom locale loader for dynamic loading
 *
 * @param loader - Function to load locale data
 */
export function setLocaleLoader(loader: LocaleLoader): void {
  customLoader = loader;
}

/**
 * Reload locale data (useful for hot-reloading in development)
 */
export function reloadLocales(): void {
  // In a real implementation, this would re-import locale files
  // For now, locales are statically imported
}

/**
 * Get translation count for debugging
 *
 * @returns Object with locale names and their translation counts
 */
export function getTranslationStats(): Record<string, number> {
  const stats: Record<string, number> = {};
  for (const [locale, messages] of Object.entries(localeData)) {
    stats[locale] = Object.keys(messages).length;
  }
  return stats;
}

// Re-export types
export type { InterpolationParams, AvailableLocale } from "./types.js";
export { DEFAULT_LOCALE, isAvailableLocale, AVAILABLE_LOCALES, LANG_ENV_VAR } from "./types.js";
