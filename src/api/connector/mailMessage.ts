import request from '@/utils/request'

/**
 * /api/connector/default/mail 获取邮件 get
 */
export function getMail () {
  return request({
    url: '/api/connector/default/mail',
    method: 'get'
  })
}

/**
 * /api/connector/default/mail 获取短信 get
 */
export function getMessage () {
  return request({
    url: '/api/connector/default/mesg',
    method: 'get'
  })
}
