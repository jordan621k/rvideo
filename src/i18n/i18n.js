import en from './src/en'
import zh from './src/zh'
import React from 'react'

export function i18n (locale) {
  if (locale === 'zh') {
    return zh
  }
  return en
}

export const LocaleContext = React.createContext('zh');
