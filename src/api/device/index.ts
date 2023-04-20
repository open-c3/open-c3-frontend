// 配置相关的api
import request from '@/utils/request'
import {
  TreeIdInfo,
  CMDBChpassword,
  CMDBDataMenuInfo,
  DevicePromiseInfo,
  CMDBResourceDataInfo,
  CMDBResourceDataBlankInfo,
} from '../interface/device'

/**
 * 获取分组选择列表 get
 * /api/agent/device/timemachine
 * @param treeId
 */
export const getMachineList = (data: TreeIdInfo): Promise<DevicePromiseInfo | any> => {
  return request({
    url: `/api/agent/device/timemachine`,
    method: 'get',
  })
}


/**
 * 获取CMDB资源信息 get
 * /api/ci/v2/c3mc/cmdb/menu?treeid={treeid}&timemachine={selectedtimemachine}
 * @param treeId
 */
export const getCMDBResourceList = (treeId:string| string[]| number, params: CMDBDataMenuInfo): Promise<DevicePromiseInfo | any> => {
  return request({
    url: `/api/agent/device/menu/${treeId}`,
    method: 'get',
    params
  })
}

/**
 * 获取CMDB Data页列表信息与筛选信息  post
 * /api/agent/device/data/{type}/{subtype}/{treeid}
 * @param type
 * @param subtype 
 * @param treeId
 * @param data => {grepdata,timemachine}
 */

export const getCMDBDataDetail = (data:CMDBResourceDataInfo): Promise<DevicePromiseInfo | any> => {
  return request({
    url: `/api/agent/device/data/${data.type}/${data.subtype}/${data.treeId}`,
    method: 'post',
    data: data.data
  })
}

/**
 * 获取 CMDB资源详情跳转链接 post
 * /api/agent/device/detail/{type}/{subtype}/{treeid}/{uuid}?timemachine={timemachine} , { 'exturl': config['url'] 
 * @param type
 * @param subtype
 * @param treeId
 * @param uuid
 * @param timemachine
 * @param exturl => {exturl: string}
 */

export const getCMDBDataBlank = (data:CMDBResourceDataBlankInfo): Promise<DevicePromiseInfo | any> => {
  return request({
    url: `/api/agent/device/detail/${data.type}/${data.subtype}/${data.treeId}/${data.uuid}?timemachine=${data.timemachine}`,
    method: 'post',
    data: data.data
  })
}

/**
 * 获取资源详情弹窗具体数据 get
 * /api/agent/device/detail/{type}/{subtype}/{treeId}/{uuid}?timemachine={timemachine}
 * @param type
 * @param subtype
 * @param treeId
 * @param uuid
 * @param timemachine
 */

export const getDataModelDetail = (data:CMDBResourceDataBlankInfo): Promise<DevicePromiseInfo | any> => {
  return request({
    url: `/api/agent/device/detail/${data.type}/${data.subtype}/${data.treeId}/${data.uuid}?timemachine=${data.timemachine}`,
    method: 'get',
  })
}

/**
 * 获取内部服务树列表 get
 * /api/connector/connectorx/treemap
 * @param treeId
 */

export const getIntervalServerTree = (data:TreeIdInfo): Promise<DevicePromiseInfo | any> => {
  return request({
    url: `/api/connector/connectorx/treemap`,
    method: 'get',
  })
}

/**
 * 获取内部服务树列表 get
 * /api/agent/device/tree/bind/{type}/{subtype}/{uuid}/{newtree} 
 * @param type
 * @param subtype
 * @param treeId
 * @param uuid
 * @param timemachine
 */

export const getDeviceTreebind = (data:CMDBResourceDataBlankInfo): Promise<DevicePromiseInfo | any> => {
  return request({
    url: `/api/agent/device/tree/bind/${data.type}/${data.subtype}/${data.uuid}/${data.newtree}`,
    method: 'get',
  })
}


/**
 * 获取内部服务树列表 post
 * api/agent/device/extcol/{type}/{subtype}/{uuid}/{name} 
 * @param type
 * @param subtype
 * @param treeId
 * @param uuid
 * @param timemachine
 */

export const handleSaveExtcol = (data:CMDBResourceDataBlankInfo): Promise<DevicePromiseInfo | any> => {
  return request({
    url: `api/agent/device/extcol/${data.type}/${data.subtype}/${data.uuid}/${data.name}`,
    method: 'post',
    data: data.data
  })
}

/**
 * 修改账号信息 post
 * api/agent/device/extcol/{type}/{subtype}/{uuid}/{name} 
 * @param dbtype
 * @param dbaddr
 * @param passwd
 */

export const handleAuthExtcol = (data:CMDBChpassword): Promise<DevicePromiseInfo | any> => {
  return request({
    url: `/api/agent/device/chpassword`,
    method: 'post',
    data: data
  })
}