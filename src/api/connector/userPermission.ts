import request from '@/utils/request'
import { addUserAuthData, addUserTreeAuthData } from '@/api/interface/connector'

/**
 * /api/connector/default/auth/userauth 获取用户权限列表 get
 */
export function getUserAuthList () {
  return request({
    url: '/api/connector/default/auth/userauth',
    method: 'get'
  })
}

/**
 * /api/connector/default/auth/addauth 添加用户权限 post
 */
export function addUserAuth (data: addUserAuthData) {
  return request({
    url: '/api/connector/default/auth/addauth',
    method: 'post',
    data
  })
}

/**
 * /api/connector/default/auth/delauth?user=${name} 删除用户权限 delete
 */
export function deleteUserAuth (name: string) {
  return request({
    url: `/api/connector/default/auth/delauth?user=${name}`,
    method: 'delete'
  })
}

/**
 * /api/connector/default/auth/tree/userauth 获取用户服务树权限列表 get
 */
export function getUserTreeAuthList () {
  return request({
    url: '/api/connector/default/auth/tree/userauth',
    method: 'get'
  })
}

/**
 * /api/connector/default/auth/tree/addauth 添加用户服务树权限 post
 */
export function addUserTreeAuth (data: addUserTreeAuthData) {
  return request({
    url: '/api/connector/default/auth/tree/addauth',
    method: 'post',
    data
  })
}

/**
 * /api/connector/default/auth/tree/delauth?id=${id} 删除用户服务树权限 delete
 */
export function deleteUserTreeAuth (id: number) {
  return request({
    url: `/api/connector/default/auth/tree/delauth?id=${id}`,
    method: 'delete'
  })
}