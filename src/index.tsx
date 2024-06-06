import { NativeModules, Platform } from 'react-native';

interface NativeLanguageModule {
  getAppLanguage: () => Promise<string>;
  setAppLanguage: (language: string) => Promise<void>;
}

const LINKING_ERROR =
  `The package 'react-native-native-language' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const NativeLanguage: NativeLanguageModule = NativeModules.NativeLanguage
  ? NativeModules.NativeLanguage
  : new Proxy<NativeLanguageModule>({} as NativeLanguageModule, {
      get() {
        throw new Error(LINKING_ERROR);
      },
    });

export const getAppLanguage = (): Promise<string> => {
  return NativeLanguage.getAppLanguage();
};

export const setAppLanguage = (language: string): Promise<void> => {
  return NativeLanguage.setAppLanguage(language);
};
