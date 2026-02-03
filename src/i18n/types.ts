/**
 * i18n Type Definitions
 *
 * Core types for the internationalization system.
 */

/**
 * Interpolation parameters for translation strings
 */
export interface InterpolationParams {
  [key: string]: string | number | undefined;
}

/**
 * i18n Configuration interface
 */
export interface I18nConfig {
  /** Current locale (e.g., 'zh-CN', 'en') */
  locale: string;
  /** Fallback locale when translation is missing */
  fallbackLocale: string;
}

/**
 * Translation function type
 */
export type TranslateFunction = (key: string, params?: InterpolationParams) => string;

/**
 * Locale loader function type
 */
export type LocaleLoader = (
  locale: string,
) => Promise<Record<string, string>> | Record<string, string>;

/**
 * Available locales in the system
 */
export const AVAILABLE_LOCALES = ["en", "zh-CN", "zh-HK", "zh-TW"] as const;

/**
 * Type for available locale codes
 */
export type AvailableLocale = (typeof AVAILABLE_LOCALES)[number];

/**
 * Check if a locale is available
 */
export function isAvailableLocale(locale: string): locale is AvailableLocale {
  return AVAILABLE_LOCALES.includes(locale as AvailableLocale);
}

/**
 * Default locale
 */
export const DEFAULT_LOCALE: AvailableLocale = "en";

/**
 * Environment variable name for language setting
 */
export const LANG_ENV_VAR = "OPENCLAW_LANG";
