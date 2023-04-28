// 配置相关的api
import request from '@/utils/request'

import {
  VariableOperateInfo,
  LightAppInfo,
} from '../interface/smallapplication'
import {
  TreeIdInfo,
  IResponseInfo,
} from '../interface/index'

/**
 * 获取轻应用列表信息  get
 * /api/job/smallapplication/bytreeid/{treeId}
 * @param {TreeIdInfo} treeId
 */

export const getSmallApplication = (data: TreeIdInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/smallapplication/bytreeid/${data.treeId}`,
    method: 'get',
  })
}

/**
 * 获取单个轻应用信息  get
 * /api/job/smallapplication/{treeId}
 * @param {TreeIdInfo} treeId
 */

export const getSmallApplicationItems = (data: TreeIdInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/smallapplication/${data.treeId}`,
    method: 'get',
  })
}

/**
 * 作业/变量/通过变量id删除变量 delete
 * /api/job/variable/byid/{jobid}?name=_authorization_
 * @param {string} jobid
 */

export const deleteVariableById = (jobid: string): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/variable/byid/${jobid}?name=_authorization_`,
    method: 'delete',
  })
}

/**
 * 作业/变量/添加变量 post
 * /api/job/variable/{treeId}/update
 * @param {TreeIdInfo} treeId
 */


export const addVariableApp = (treeId: string, data: VariableOperateInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/variable/${treeId}/update`,
    method: 'post',
    data
  })
}

/**
 * 删除轻应用 delete
 * /api/job/smallapplication/{id}
 * @param {string| number} id
 */

export const deleteLightApp = (id: string | number): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/smallapplication/${id}`,
    method: 'delete',
  })
}

/**
 * 添加轻应用 post
 * /api/job/smallapplication
 */

export const addLightApp = (data: LightAppInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/smallapplication`,
    method: 'post',
    data
  })
}

/**
 * 编辑轻应用 post
 * /api/job/smallapplication/{id}
 * @param {string| number} id
 */

export const updateLightApp = (id: string | number, data:LightAppInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/smallapplication/${id}`,
    method: 'post',
    data,
  })
}
