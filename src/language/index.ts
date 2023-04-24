import { createI18n } from 'vue-i18n' // 引入vue-i18n组件
import zhCn from '@/language/zhCn/index'
import en from '@/language/en'
const i18n = createI18n({
  fallbackLocale: 'zhCn',
  globalInjection: true,
  legacy: false,
  locale: localStorage.getItem('language') || 'zhCn',
  warnHtmlMessage: false,
  messages: {
    zhCn,
    en
  }
})

export default i18n
