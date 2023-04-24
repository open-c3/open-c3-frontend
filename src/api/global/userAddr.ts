import request from '@/utils/request'
import { addUserAddrData } from '@/api/interface/global'
/**
 * /api/connector/useraddr 获取地址簿 get
 */
export function getUserAddr () {
  return request({
    url: '/api/connector/useraddr',
    method: 'get'
  })
}

/**
 * /api/connector/useraddr 获取地址簿 get
 */
export function addUserAddr (data: addUserAddrData) {
  return request({
    url: '/api/connector/useraddr',
    method: 'post',
    data
  })
}

/**
 * /api/connector/useraddr 删除地址簿 delete
 */
export function deleteUserAddr (id: string) {
  return request({
    url: `/api/connector/useraddr/${id}`,
    method: 'delete'
  })
}
