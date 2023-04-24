import request from '@/utils/request'
import { getMachineListParams, addMachineData  } from '@/api/interface/business'
// 获取机器列表
export function getMachineList (treeId: number, params: getMachineListParams) {
  return request({
    url: `/api/job/nodelist/${treeId}`,
    method: 'get',
    params
  })
}

// 添加机器列表
export function addMachine (treeId: number, data: addMachineData) {
  return request({
    url: `/api/job/nodelist/${treeId}`,
    method: 'post',
    data
  })
}

// 删除机器列表
export function deleteMachine (treeId: number, id: string | number) {
  return request({
    url: `/api/job/nodelist/${treeId}/${id}`,
    method: 'delete'
  })
}
