import request from '@/utils/request'
import { updateApprovalData } from '@/api/interface/global'
/**
 * /api/job/adminapproval 获取列表 get
 */
export function getAdminApproval () {
  return request({
    url: '/api/job/adminapproval',
    method: 'get'
  })
}

/**
 * /api/job/adminapproval 获取日志 get
 */
export function getAdminApprovalOaLog (id: string | number) {
  return request({
    url: `/api/job/adminapproval/oalog/${id}`,
    method: 'get'
  })
}

/**
 * /api/job/adminapproval/oaredo/${id} 重新发起oa工单
 */
export function oaRedo (id: string | number) {
  return request({
    url: `/api/job/adminapproval/oaredo/${id}`,
    method: 'post'
  })
}

/**
 * /api/job/adminapproval/notifyredo/${id} 重新发起审批消息
 */
export function notifyRedo (id: string | number) {
  return request({
    url: `/api/job/adminapproval/notifyredo/${id}`,
    method: 'post'
  })
}

/**
 * /api/job/adminapproval 获取审批信息 get
 */
export function getApprovalDetail (id: string|number) {
  return request({
    url: `/api/job/adminapproval/${id}`,
    method: 'get'
  })
}

/**
 * /api/job/adminapproval 审批操作 post
 */
export function updateApproval (data: updateApprovalData) {
  return request({
    url: '/api/job/adminapproval',
    method: 'post',
    data
  })
}
