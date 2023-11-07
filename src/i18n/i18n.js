import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import tranEn from './Text/translationEn.json'
import tranFr from './Text/translationFr.json'

i18n.use(LanguageDetector)
     .use(initReactI18next)
     .init({
          resources: {
               en: { translation: tranEn },
               fr: { translation: tranFr },
          },
          detection: {
               order: ['cookie'],
               caches: ['cookie'],
          },
          fallbackLng: 'en',
          interpolation: { escapeValue: false },
     })

export default i18n
