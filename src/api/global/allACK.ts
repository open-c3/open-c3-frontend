import request from '@/utils/request'
import { updateAllACKData } from '@/api/interface/global'
/**
 * /api/agent/monitor/ack/allack/bycookie 获取列表 get
 */
export function getAllACK () {
  return request({
    url: '/api/agent/monitor/ack/allack/bycookie',
    method: 'get'
  })
}

/**
 * /api/agent/monitor/ack/allack/bycookie 撤销 post
 */
export function updateAllACK (data: updateAllACKData) {
  return request({
    url: '/api/agent/monitor/ack/allack/bycookie',
    method: 'post',
    data
  })
}
