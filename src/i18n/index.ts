import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LayoutEng from './English/layout.json';
import LayoutKa from './Georgian/layout.json';
import loginEn from './English/login.json';
import loginKa from './Georgian/login.json';
import registerEn from './English/register.json';
import registerKa from './Georgian/register.json';

i18n.use(initReactI18next).init({
  resources: {
    ka: {
      layout: LayoutKa,
      login: loginKa,
      register: registerKa,
    },
    en: {
      layout: LayoutEng,
      login: loginEn,
      register: registerEn,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
