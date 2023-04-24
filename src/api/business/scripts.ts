import request from '@/utils/request'
import { getScriptsParams, addScriptData } from '@/api/interface/business'
// 获取脚本列表
export function getScripts (treeId: number, params: getScriptsParams) {
  return request({
    url: `/api/job/scripts/${treeId}`,
    method: 'get',
    params
  })
}

// 删除脚本
export function deleteScript (treeId: number, id: number) {
  return request({
    url: `/api/job/scripts/${treeId}/${id}`,
    method: 'delete'
  })
}

// 运行脚本
export function runScript (treeId: number, id: number) {
  return request({
    url: `/api/job/scripts/${treeId}/${id}`,
    method: 'delete'
  })
}

// 新建脚本
export function addScript (treeId: number, data: addScriptData) {
  return request({
    url: `/api/job/scripts/${treeId}`,
    method: 'post',
    data
  })
}

// 编辑脚本
export function updateScript (treeId: number, data: addScriptData, id: number) {
  return request({
    url: `/api/job/scripts/${treeId}/${id}`,
    method: 'post',
    data
  })
}

// 获取脚本详情
export function getScriptDetail (treeId: number, id: number) {
  return request({
    url: `/api/job/scripts/${treeId}/${id}`,
    method: 'get'
  })
}
