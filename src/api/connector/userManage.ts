import request from '@/utils/request'
import { connectorAddUserData } from '@/api/interface/connector'

/**
 * /api/connector/default/user/userlist 获取用户列表 get
 */
export function getUserList () {
  return request({
    url: '/api/connector/default/user/userlist',
    method: 'get'
  })
}

/**
 * /api/connector/default/user/adduser 添加用户 post
 */
export function connectorAddUser (data: connectorAddUserData) {
  return request({
    url: '/api/connector/default/user/adduser',
    method: 'post',
    data
  })
}

/**
 * /api/connector/default/user/deluser?user=${name} 删除用户 delete
 */
export function deleteConnectorUser (name: string) {
  return request({
    url: `/api/connector/default/user/deluser?user=${name}`,
    method: 'delete'
  })
}
