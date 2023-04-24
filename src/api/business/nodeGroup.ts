import request from '@/utils/request'
import { getNodeGroupParams, createNodeGroupData  } from '@/api/interface/business'
// 获取机器分组列表
export function getJobNodeGroup (treeId: number, params?: getNodeGroupParams) {
  return request({
    url: `/api/job/nodegroup/${treeId}`,
    method: 'get',
    params
  })
}

// 获取机器列表
export function getJobNodeInfo (treeId: number) {
  return request({
    url: `/api/job/nodeinfo/${treeId}`,
    method: 'get'
  })
}

// 删除分组
export function deleteJobGroup (treeId: number, id: number) {
  return request({
    url: `/api/job/nodegroup/${treeId}/${id}`,
    method: 'delete'
  })
}

// 新建分组
export function createJobNodeGroup (treeId: number, data: createNodeGroupData) {
  return request({
    url: `/api/job/nodegroup/${treeId}`,
    method: 'post',
    data
  })
}

// 修改分组
export function updateJobNodeGroup (treeId: number,id: string|number, data: createNodeGroupData) {
  return request({
    url: `/api/job/nodegroup/${treeId}/${id}`,
    method: 'post',
    data
  })
}

// 获取分组详情
export function getJobNodeGroupInfo (treeId: number| string, id: number | string) {
  return request({
    url: `/api/job/nodegroup/${treeId}/${id}`,
    method: 'get'
  })
}