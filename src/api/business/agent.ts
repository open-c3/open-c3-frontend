import request from '@/utils/request'
import { saveAgentStatusData, addAgentProxyData } from '@/api/interface/business'
// 获取开关状态
export function getAgentStatus (treeId: number) {
  return request({
    url: `/api/agent/check/${treeId}`,
    method: 'get'
  })
}

// 保存开关状态
export function saveAgentStatus (treeId: number, data: saveAgentStatusData) {
  return request({
    url: `/api/agent/check/${treeId}`,
    method: 'post',
    data
  })
}

// 获取区域列表
export function getRegionList (treeId: number) {
  return request({
    url: `/api/agent/region/${treeId}/active`,
    method: 'get'
  })
}

// 添加自定义区域
export function addCustomizeRegion (treeId: number, data: { name: string}) {
  return request({
    url: `/api/agent/region/${treeId}`,
    method: 'post',
    data
  })
}

// 获取自定义区域列表
export function getCustomizeRegionList (treeId: number) {
  return request({
    url: `/api/agent/region/${treeId}?relation=1`,
    method: 'get'
  })
}

// 删除自定义区域
export function deleteCustomizeRegion (treeId: number, id: string|number) {
  return request({
    url: `/api/agent/region/${treeId}/${id}`,
    method: 'delete'
  })
}

// 获取获取区域和服务树的绑定关系
export function getRegionTreeRelation (treeId: number) {
  return request({
    url: `/api/agent/project_region_relation/${treeId}`,
    method: 'get'
  })
}

// 删除区域和服务树的绑定关系
export function deleteRegionTreeRelation (treeId: number, id: number) {
  return request({
    url: `/api/agent/project_region_relation/${treeId}/${id}`,
    method: 'delete'
  })
}

// 添加区域和服务树的绑定关系
export function addRegionTreeRelation (treeId: number, data: { regionid: number | string}) {
  return request({
    url: `/api/agent/project_region_relation/${treeId}`,
    method: 'post',
    data
  })
}

// 获取代理列表
export function getAgentProxyList (treeId: number, regionId: number | string) {
  return request({
    url: `/api/agent/proxy/${treeId}/${regionId}`,
    method: 'get'
  })
}

// 删除代理
export function deleteAgentProxy (treeId: number, id: number | string) {
  return request({
    url: `/api/agent/proxy/${treeId}/${id}`,
    method: 'delete'
  })
}

// 添加代理
export function addAgentProxy (treeId: number, regionId: number | string, data: addAgentProxyData) {
  return request({
    url: `/api/agent/proxy/${treeId}/${regionId}`,
    method: 'post',
    data
  })
}

// 获取网段列表
export function getAgentList (treeId: number, id: number | string) {
  return request({
    url: `/api/agent/agent/${treeId}/${id}`,
    method: 'get'
  })
}

// 添加网段
export function addAgentNetwork (treeId: number, regionId: number | string, data: { subnet: string }) {
  return request({
    url: `/api/agent/agent/${treeId}/${regionId}/subnet`,
    method: 'post',
    data
  })
}

// 删除网段
export function deleteAgentNetwork (treeId: number, networkId: number | string) {
  return request({
    url: `/api/agent/agent/${treeId}/${networkId}`,
    method: 'delete'
  })
}
