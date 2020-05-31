import en_us from './src/en_us'
import zh_tw from './src/zh_tw'
import React from 'react'

export function i18n (locale) {
  if (locale === 'zh_tw') {
    return zh_tw
  }
  return en_us
}

export const LocaleContext = React.createContext('en_us')
