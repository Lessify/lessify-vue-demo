import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {Lessify} from '@lessify/sdk';

Vue.use(VueI18n)

export const i18n: VueI18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {}
})

export const lessify: Lessify = new Lessify({
  spaceId: 'e600fed0-0674-11eb-8ebc-355c3e3200ae',
  environment: 'master',
  apiKey: 'api-key-Tqcgc-38872940-0d32-11eb-8a0e-61e5b1516e7a-Zlh7j'
})

const loadedLanguages: string[] = [] // our default language that is preloaded

function setI18nLanguage (lang: string): string {
  i18n.locale = lang
  document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang: string): Promise<string> {
  // If the same language
  if (loadedLanguages.length > 0 && i18n.locale === lang) {
    return Promise.resolve(lang)
  }
  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  return lessify.translation.get(lang)
  .then(
      messages => {
        i18n.setLocaleMessage(lang, messages)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      }
  )
}


