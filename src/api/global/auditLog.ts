import request from '@/utils/request'
import { getAuditLogParams } from '@/api/interface/global'
/**
 * /api/agent/monitor/ack/allack/bycookie 获取列表 get
 */
export function getAuditLog (params: getAuditLogParams) {
  return request({
    url: '/api/connector/connectorx/auditlog',
    method: 'get',
    params
  })
}
