import request from '@/utils/request'

/**
 * /api/connector/version/log  获取 get
 */
export const getVersionLog = () => {
  return request({
    url: '/api/connector/version/log',
    method: 'get'
  })
}

/**
 * /api/connector/version/name  获取 get
 */
export const getVersionName = () => {
  return request({
    url: '/api/connector/version/name',
    method: 'get'
  })
}
