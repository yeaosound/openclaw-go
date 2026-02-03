import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const i18n = i18next.createInstance();

let initialized = false;

async function loadTranslations() {
  const [enCommon, enViews, zhCommon, zhViews, zhHkCommon, zhHkViews, zhTwCommon, zhTwViews] = await Promise.all([
    import('./locales/en/common.json'),
    import('./locales/en/views.json'),
    import('./locales/zh-CN/common.json'),
    import('./locales/zh-CN/views.json'),
    import('./locales/zh-HK/common.json'),
    import('./locales/zh-HK/views.json'),
    import('./locales/zh-TW/common.json'),
    import('./locales/zh-TW/views.json')
  ]);

  return {
    en: {
      common: enCommon.default,
      views: enViews.default,
    },
    'zh-CN': {
      common: zhCommon.default,
      views: zhViews.default,
    },
    'zh-HK': {
      common: zhHkCommon.default,
      views: zhHkViews.default,
    },
    'zh-TW': {
      common: zhTwCommon.default,
      views: zhTwViews.default,
    },
  };
}

export async function initI18n(): Promise<void> {
  if (initialized) {
    return;
  }

  const resources = await loadTranslations();

  await i18n
    .use(LanguageDetector)
    .init({
      fallbackLng: 'en',
      supportedLngs: ['en', 'zh-CN', 'zh-HK', 'zh-TW'],
      defaultNS: 'common',
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'openclaw-language',
      },
      interpolation: {
        escapeValue: false,
      },
      resources,
    });

  initialized = true;
}

export async function changeLanguage(lng: string): Promise<void> {
  await i18n.changeLanguage(lng);
}

export function getCurrentLanguage(): string {
  return i18n.language || 'en';
}

export function isLanguageSupported(lng: string): boolean {
  return ['en', 'zh-CN', 'zh-HK', 'zh-TW'].includes(lng);
}

export function onLanguageChanged(callback: (lng: string) => void): () => void {
  i18n.on('languageChanged', callback);
  return () => {
    i18n.off('languageChanged', callback);
  };
}
