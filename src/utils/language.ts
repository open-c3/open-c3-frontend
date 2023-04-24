import i18n from '@/language/index'
import store from '@/store/index'

const langIns = i18n.global
const i18nT = i18n.global.t

// 重新封装多语言函数
export const t = (val:string, arr?:any) => {
  const obj = langIns.getLocaleMessage(store.state.app.locale || localStorage.getItem('language') || 'zhCn') || {}
  const keys = Object.keys(obj)
  const code = val.replace(/\./g, '_')
  if (keys.indexOf(code) === -1) return code
  if (arr) {
    return i18nT(code, arr) || code
  } else {
    return i18nT(code) || code
  }
}
