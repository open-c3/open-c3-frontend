import request from '@/utils/request'

// 获取变量列表
export function getVariateList (treeId: number) {
  return request({
    url: `/api/job/vv/${treeId}/table`,
    method: 'get'
  })
}

// 删除变量
export function deleteVariate (treeId: number, id: number | string) {
  return request({
    url: `/api/job/vv/${treeId}/table/${id}`,
    method: 'delete'
  })
}
