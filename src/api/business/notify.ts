import request from '@/utils/request'
import { getNotifyListParams, addNotifyUserData  } from '@/api/interface/business'
// 获取机器列表
export function getNotifyList (treeId: number, params: getNotifyListParams) {
  return request({
    url: `/api/job/notify/${treeId}`,
    method: 'get',
    params
  })
}

// 添加机器列表
export function addNotifyUser (treeId: number, data: addNotifyUserData) {
  return request({
    url: `/api/job/notify/${treeId}`,
    method: 'post',
    data
  })
}

// 删除机器列表
export function deleteNotify (treeId: number, id: string | number) {
  return request({
    url: `/api/job/notify/${treeId}/${id}`,
    method: 'delete'
  })
}
