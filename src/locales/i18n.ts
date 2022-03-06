import i18next, { i18n as i18nInterface } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import store from 'store';
import { directionActions } from 'app/molecules/Direction/ducks/slice';
import en from './en/translation.json';
import ar from './ar/translation.json';

export const translationsJson = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};
export interface LanguageLabelsType {
  en: string;
  ar: string;
  [key: string]: string;
}
export const languageLabels: LanguageLabelsType = {
  en: 'English',
  ar: 'العربية',
};
export const languageLabelsSel: LanguageLabelsType = {
  en: 'Select English',
  ar: 'Select Arabic',
};
export const locales: string[] = ['en', 'ar'];

export const changeLanguage = (i18nx: i18nInterface, language: string): void => {
  store.dispatch(directionActions.setLanguage(language));
  i18nx.changeLanguage(language);
};

export const i18n = i18next
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: translationsJson,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',

    interpolation: {
      format(value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'bold') return String(value).bold();
        return value;
      },
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      // ...
      defaultTransParent: 'div', // a valid react element - required before react 16
      transEmptyNodeValue: '', // what to return for empty Trans
      transSupportBasicHtmlNodes: true, // allow <br/> and simple html elements in translations
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'], // don't convert to <1></1> if simple react elements
    },
  });
