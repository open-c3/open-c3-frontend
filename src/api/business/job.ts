// api/job/jobs/:projectid

import request from '@/utils/request'
import { g_url } from '@/utils/index'
import { getJobListData } from '@/api/interface/business'
const c3siteaddr = g_url
/**
 * http://127.0.0.1/api/agent/monitor/config/treeunbind/:treeid
 * /api/agent/monitor/config/treeunbind/:treeid 服务树解绑/获取状态 get
 */
export function getJobList (treeId: number, params: getJobListData) {
  return request({
    url: `/api/job/jobs/${treeId}`,
    method: 'get',
    params
  })
}