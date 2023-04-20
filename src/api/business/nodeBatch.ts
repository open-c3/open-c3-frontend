import request from '@/utils/request'
import { createJobxGroupData  } from '@/api/interface/business'
// 获取分批列表
export function getJobxGroup (treeId: number) {
  return request({
    url: `/api/jobx/group/${treeId}`,
    method: 'get'
  })
}

// 获取流水线列表
export function getCiList (treeId: number) {
  return request({
    url: `/api/ci/group/${treeId}`,
    method: 'get'
  })
}

// 新建分批
export function createJobxGroup (treeId: number, data: createJobxGroupData) {
  return request({
    url: `/api/jobx/group/${treeId}`,
    method: 'post',
    data
  })
}

// 修改分批
export function updateJobxGroup (treeId: number,id: number|string, data: createJobxGroupData) {
  return request({
    url: `/api/jobx/group/${treeId}/${id}`,
    method: 'post',
    data
  })
}

// 获取分批详情
export function getJobxGroupInfo (treeId: number, id: number) {
  return request({
    url: `/api/jobx/group/${treeId}/${id}`,
    method: 'get'
  })
}

// 获取分批机器详情
export function getJobxGroupMachine (treeId: number, id: number) {
  return request({
    url: `/api/jobx/group/${treeId}/${id}/node`,
    method: 'get'
  })
}

// 删除分批
export function deleteJobxGroupInfo (treeId: number, id: number) {
  return request({
    url: `/api/jobx/group/${treeId}/${id}`,
    method: 'delete'
  })
}
