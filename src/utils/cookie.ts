import Cookies from 'js-cookie'
const TokenKey = process.env.NODE_ENV === 'development' ? 'sid' : 'sid'
let domain = null

export function getToken () {
  return Cookies.get(TokenKey)
}
export function setToken (token:any) {
  return Cookies.set(TokenKey, token, { domain: domain }) // 设置主域名cookie便于子域名共享
}

export function setCookies (name, val) {
  return Cookies.set(name, val, { domain: domain }) // 设置主域名cookie便于子域名共享
}
export function setCookiesExpires (name, value, expires) {
  return Cookies.set(name, value, { expires, domain: domain })
}
export function getCookie (name) {
  return Cookies.get(name)
}
export function removeToken () {
  Cookies.remove(TokenKey)
  Cookies.remove('u', { domain: domain })
}
