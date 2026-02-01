/**
 * i18n Configuration Module
 *
 * Handles initialization of i18n from environment variables and config files.
 */

import { readConfigFileSnapshot } from '../config/io.js';
import type { OpenClawConfig } from '../config/types.js';
import {
  setLocale,
  getLocale,
  DEFAULT_LOCALE,
  isAvailableLocale,
  LANG_ENV_VAR,
} from './index.js';

/**
 * Initialize i18n from environment variable or config file
 *
 * Resolution order:
 * 1. Environment variable OPENCLAW_LANG
 * 2. Config file lang field
 * 3. System locale (if detectable)
 * 4. Default locale (en)
 *
 * @returns Promise that resolves when initialization is complete
 */
export async function initializeI18n(): Promise<void> {
  // 1. Check environment variable first
  const envLang = process.env[LANG_ENV_VAR];
  if (envLang && isAvailableLocale(envLang)) {
    setLocale(envLang);
    return;
  }

  // 2. Check config file
  try {
    const snapshot = await readConfigFileSnapshot();
    if (snapshot.valid && snapshot.config.lang) {
      const configLang = snapshot.config.lang;
      if (isAvailableLocale(configLang)) {
        setLocale(configLang);
        return;
      }
    }
  } catch {
    // Config file may not exist, continue to defaults
  }

  // 3. Use default
  setLocale(DEFAULT_LOCALE);
}

/**
 * Initialize i18n synchronously (for non-async contexts)
 *
 * Only checks environment variable. For full initialization
 * including config file, use initializeI18n().
 */
export function initializeI18nSync(): void {
  const envLang = process.env[LANG_ENV_VAR];
  if (envLang && isAvailableLocale(envLang)) {
    setLocale(envLang);
  } else {
    setLocale(DEFAULT_LOCALE);
  }
}

/**
 * Get the current language setting from all sources
 *
 * @returns Object with the active locale and its source
 */
export async function getLanguageSettings(): Promise<{
  locale: string;
  source: 'env' | 'config' | 'default';
}> {
  // Check environment variable
  const envLang = process.env[LANG_ENV_VAR];
  if (envLang && isAvailableLocale(envLang)) {
    return { locale: envLang, source: 'env' };
  }

  // Check config file
  try {
    const snapshot = await readConfigFileSnapshot();
    if (snapshot.valid && snapshot.config.lang) {
      const configLang = snapshot.config.lang;
      if (isAvailableLocale(configLang)) {
        return { locale: configLang, source: 'config' };
      }
    }
  } catch {
    // Config file may not exist
  }

  // Default
  return { locale: DEFAULT_LOCALE, source: 'default' };
}

/**
 * Update language in config file
 *
 * @param locale - New locale to set
 * @throws Error if locale is not available
 */
export async function updateLanguageSetting(locale: string): Promise<void> {
  if (!isAvailableLocale(locale)) {
    throw new Error(
      `Cannot set language to "${locale}". ` +
        `Available locales: ${getAvailableLocales().join(', ')}`,
    );
  }

  const snapshot = await readConfigFileSnapshot();
  const config: OpenClawConfig = snapshot.valid ? snapshot.config : {};

  config.lang = locale;

  const { writeConfigFile } = await import('../config/io.js');
  await writeConfigFile(config);

  // Update current locale
  setLocale(locale);
}

/**
 * Get available locales with display names
 *
 * @returns Array of locale objects with code and display name
 */
export function getAvailableLocalesWithNames(): Array<{
  code: string;
  name: string;
  nativeName: string;
}> {
  return [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文' },
  ];
}

/**
 * Re-export for convenience
 */
export { getLocale, DEFAULT_LOCALE, isAvailableLocale, LANG_ENV_VAR } from './index.js';
