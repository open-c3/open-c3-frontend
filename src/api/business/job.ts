// api/job/jobs/:projectid

import request from '@/utils/request'
import { g_url } from '@/utils/index'
import { 
  getJobListInfo, 
  JobItemsInfo,
  JobItemsVariableInfo,
  RunJobItemInfo,
} from '@/api/interface/business'
import {
  TreeIdInfo,
  IResponseInfo,
} from '../interface/index'

const c3siteaddr = g_url
/**
 * http://127.0.0.1/api/agent/monitor/config/treeunbind/:treeid
 * /api/agent/monitor/config/treeunbind/:treeid 服务树解绑/获取状态 get
 */
export function getJobList(treeId: number, params: getJobListInfo) {
  return request({
    url: `/api/job/jobs/${treeId}`,
    method: 'get',
    params
  })
}

/**
 * 删除作业任务 delete
 * /api/job/jobs/{treeId}/${uuid}
 * @param {string | string[] | number} treeId
 * @param {string} uuid
 */

export function deleteJobItem(data: JobItemsInfo): Promise<IResponseInfo | any> {
  return request({
    url: `/api/job/jobs/${data.treeId}/${data.uuid}`,
    method: 'delete',
  })
}

/**
 * 作业/变量/获取作业变量 get
 * http://127.0.0.1/api/job/variable/:projectid/:jobuuid
 * /api/job/variable/{treeId}/{jobuuid}?empty=1
 * @param {string | string[] | number} treeId
 * @param {string} jobuuid
 * @param {string | number} empty - query类型参数
 * @param {string} exclude - query类型参数
 * @param {'in' | 'test' | 'online'} env - query类型参数
 */

export function getJobVariable(params: JobItemsVariableInfo): Promise<IResponseInfo | any> {
  return request({
    url: `/api/job/variable/${params.treeId}/${params.jobuuid}`,
    method: 'get',
    params: params.query
  })
}

/**
 * 作业任务/提交任务 post
 * http://127.0.0.1/api/job/task/:projectid/job
 * /api/job/task/{treeId}/job
 * @param {string | string[] | number} treeId
 * @param {RunJobItemInfo} data 
 */

export function runJobOperate(params: RunJobItemInfo): Promise<IResponseInfo | any> {
  return request({
    url: `/api/job/task/${params.treeId}/job`,
    method: 'post',
    data: params.data
  })
}
