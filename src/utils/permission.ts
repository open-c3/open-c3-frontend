import NProgress  from 'nprogress' // Progress 进度条
import router from '@/router/index'
import store from '@/store'
import { getUserInfo } from '@/api/userCenter/index'
import { getToken, setCookies, getCookie } from '@/utils/cookie'
import { whiteList, checkWhite } from '@/utils/constants'


// 进度环隐藏显示
NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next : any) => {
  const path = to.path
  // const token = getToken()
  if (checkWhite(path)) {
    next()
  } else {
    console.log('VUX--------' + store.getters.userName)
    console.log('VUX--------' + store.getters.userInfo)
    console.log('COOKIE--------' + getCookie('userName'))
    // 没有账户信息需要重新获取一下 否则直接跳转
    if (!store.getters.userName) {
      getUserInfo().then((res : any) => {
        setCookies('userName', res.name)
        setCookies('userInfo', JSON.stringify(res))
        store.dispatch('setUserInfo', res)
        store.dispatch('setUserName', res.name)
        let star = localStorage.getItem('star')
        if (star) {
          star = JSON.parse(star)
          if ((star as any).account !== res.name) {
            delete localStorage.star
          }
        }
        next()
      })
    } else {
      next()
    }
  }
  // console.log(token)
  // whiteList.indexOf(path) !== -1
  console.log(path)
  // if (token) {
  //   if (checkWhite(path)) {
  //     next()
  //   } else {
  //     console.log('VUX--------' + store.getters.userName)
  //     console.log('VUX--------' + store.getters.userInfo)
  //     console.log('COOKIE--------' + getCookie('userName'))
  //     // 没有账户信息需要重新获取一下 否则直接跳转
  //     if (!store.getters.userName) {
  //       getUserInfo().then((res : any) => {
  //         setCookies('userName', res.name)
  //         setCookies('userInfo', JSON.stringify(res))
  //         store.dispatch('setUserInfo', res)
  //         store.dispatch('setUserName', res.name)
  //         let star = localStorage.getItem('star')
  //         if (star) {
  //           star = JSON.parse(star)
  //           if ((star as any).account !== res.name) {
  //             delete localStorage.star
  //           }
  //         }
  //         next()
  //       })
  //     } else {
  //       next()
  //     }
  //   }
  // } else {
  //   // 白名单直接跳转 否则跳转到登录页
  //   if (checkWhite(path)) {
  //     next()
  //   } else {
  //     router.push('/login')
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done()
})

/* 路由异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面 */
router.onError((error) => {
  console.log('routerErr:', error)
  const pattern = /Loading chunk (.)+ failed/g
  const flag = error.message.includes('Failed to fetch dynamically imported module')
  const isChunkLoadFailed = error.message.match(pattern)
  // if (isChunkLoadFailed || flag) { location.reload() }

})