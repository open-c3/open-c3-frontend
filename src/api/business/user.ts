import request from '@/utils/request'
import { getBusinessUseData, createBusinessUseData } from '@/api/interface/business'
// 获取账户管理列表
export function getBusinessUse (treeId: number, params: getBusinessUseData) {
  return request({
    url: `/api/job/userlist/${treeId}`,
    method: 'get',
    params
  })
}

// 新建账户
export function createBusinessUse (treeId: number, data: createBusinessUseData) {
  return request({
    url: `/api/job/userlist/${treeId}`,
    method: 'post',
    data
  })
}

// 删除用户
export function deleteBusinessUse (treeId: number, id: number) {
  return request({
    url: `/api/job/userlist/${treeId}/${id}`,
    method: 'delete'
  })
}
