import request from '@/utils/request'

/**
 * /api/job/environment 获取通知列表 get
 */
export function getEnvironment () {
  return request({
    url: '/api/job/environment',
    method: 'get'
  })
}

/**
 * /api/job/environment 保存通知列表 post
 */
export function setEnvironment (data) {
  return request({
    url: '/api/job/environment',
    method: 'post',
    data
  })
}
