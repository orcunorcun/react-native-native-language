import {getAppLanguage, setAppLanguage} from 'react-native-native-language';
import i18next, {type ThirdPartyModule} from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en';
import ja from './locales/ja';
import tr from './locales/tr';

export const initializeI18n = async () => {
  const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async (callback: (lng: string) => void) => {
      callback(await getAppLanguage().catch(() => 'en'));
    },
    init: () => {},
    cacheUserLanguage: (lng: string) => {
      setAppLanguage(lng).catch((err: any) => {
        console.error('Failed to set app language:', err);
      });
    },
  };

  await i18next
    .use(languageDetector as ThirdPartyModule)
    .use(initReactI18next)
    .init({
      resources: {
        en,
        ja,
        tr,
      },
      fallbackLng: 'en',
      react: {
        useSuspense: false,
      },
      interpolation: {
        escapeValue: false,
      },
      compatibilityJSON: 'v3',
    });
};
