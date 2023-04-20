import request from '@/utils/request'
import { addImagesData } from '@/api/interface/userCenter'
/**
 * /api/job/approval 获取审批列表 get
 */
export function getApprovalList () {
  return request({
    url: '/api/job/approval',
    method: 'get'
  })
}

/**
 * /api/job/approval/${uuid} 获取审批详情 get
 */
export function getApprovalDetail (uuid: string) {
  return request({
    url: `/api/job/approval/${uuid}`,
    method: 'get'
  })
}

/**
 * /api/job/approval 审批 post
 */

export function updateApproval (data) {
  return request({
    url: '/api/job/approval',
    method: 'post',
    data
  })
}
