// 语言包
export const LANGUAGE_PACK = [
  {
    value: 'zhCn',
    label: '中文'
  },
  {
    value: 'en',
    label: 'English'
  }
]

export const whiteList = ['/login', '/404', '/403'] // 白名单
export const whiteListHasParams = [/^\/monitor\/allCase\/ack\/[a-zA-Z0-9]+$/] // 白名单带参数

// 判断是否在白名单中
export const checkWhite = (path: string) => {
  const index = whiteList.findIndex(item => item === path)
  if (index > -1) {
    return true
  } else {
    const regIndex = whiteListHasParams.findIndex(item => item.test(path))
    return regIndex > -1
  }
}

