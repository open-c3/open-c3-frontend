import request from '@/utils/request'
import {
  ICustonizeData,
  IAssignmentParam,
  IAssignmentInfo,
  IAssignmentOperateData,
  IAssignmentOperateDetailData
} from '@/api/interface/userCenter'
/**
 * /api/ci/ticket 获取操作协助列表 get
 * @param {'tome'| 'byme'} activeName 
 */

export function getAssignList(params: IAssignmentParam) {
  return request({
    url: `/api/ci/assignment/${params.activeName}`,
    method: 'get'
  })
}

/**
 * 操作协助 get
 * 提交/重试操作   get
 * /api/ci/assignment/{id}
 * @param {string} id
 */

export function getAssignCommit(params: IAssignmentOperateData): Promise<IAssignmentInfo | any> {
  return request({
    url: `/api/ci/assignment/${params.id}`,
    method: 'get'
  })
}

/**
 * 操作协助
 * 拒绝/关闭/取消操作  post
 * @param {string} id 
 * @param {{status: string}} data
 */

export function getAssignOperate(data: IAssignmentOperateDetailData): Promise<IAssignmentInfo | any> {
  return request({
    url: `/api/ci/assignment/${data.id}`,
    method: 'post',
    data: data.data
  })
}

/**
 * 操作协助返回的链接请求 （自定义） post
 * {customize}
 * @param {string} api
 * @param  {{namespace:string, ticketid: string}} data
 */
export function setCustomize(data: ICustonizeData): Promise<IAssignmentInfo | any> {
  return request({
    url: data.api,
    method: 'post',
    data: data.data
  })
}