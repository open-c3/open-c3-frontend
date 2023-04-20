// 配置相关的api
import request from '@/utils/request'

/**
 * /api/connector/default/user/login  登录 post
 * @param user
 * @param pass
 */
interface loginParams {
  user: string;
  pass: string;
  domain: string;
}
export const login = (data: loginParams) => {
  return request({
    url: '/api/connector/default/user/login',
    method: 'post',
    data
  })
}

export function getUserTree (params?) {
  return request({
    url: '/api/connector/connectorx/usertree',
    method: 'get',
    params
  })
}

export function getUserInfo (params?) {
  return request({
    url: '/api/connector/connectorx/sso/userinfo',
    method: 'get',
    params
  })
}

/**
 * /api/basic/org/user/password 更新个人密码 post
 * @param new1 string 新密码
 * @param old string 原始密码
 * @param new2 string 确认秘密
 */

export function updatePassword (data) {
  return request({
    url: '/api/connector/default/user/chpasswd',
    method: 'post',
    data
  })
}
