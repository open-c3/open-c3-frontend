import axios from 'axios'
import store from '@/store'
import { getToken, setToken } from '@/utils/cookie'
import { notification } from './index'
import router from '@/router/index'

// 创建axios实例
const service = axios.create({
  timeout: 50000, // 请求超时时间
  withCredentials: false
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (store.state.app.token) {
      const token = 'sid'
      config.headers[token] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)
// let msg = null
// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code === 10000) {
      notification('您的登录已失效，请重新登录', 'error')
      store.dispatch('setToken', '')
      setToken('')
      router.push('/login')
      return Promise.reject(res)
    } else if (res.stat === false) {
      notification(res.info, 'error')
      return Promise.reject(res)
    } else {
      if (Object.keys(res).length > 2) {
        return res
      }
      return res.data || res
    }
  },
  error => {
    notification(error.response?.data?.msg || 'error', 'error')
    return Promise.reject(error)
  }
)

export default service
