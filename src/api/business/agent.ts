import request from '@/utils/request'

// 获取开关状态
export function getAgentStatus (treeId: number) {
  return request({
    url: `/api/agent/check/${treeId}`,
    method: 'get'
  })
}

// 获取区域列表
export function getRegionList (treeId: number) {
  return request({
    url: `/api/agent/region/${treeId}/active`,
    method: 'get'
  })
}