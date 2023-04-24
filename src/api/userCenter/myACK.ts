import request from '@/utils/request'
import { updateMyACKData } from '@/api/interface/userCenter'
/**
 * /api/agent/monitor/ack/myack/bycookie 获取列表 get
 */
export function getMyACK () {
  return request({
    url: '/api/agent/monitor/ack/myack/bycookie',
    method: 'get'
  })
}

/**
 * /api/agent/monitor/ack/myack/bycookie 撤销 post
 */
export function updateMyACK (data: updateMyACKData) {
  return request({
    url: '/api/agent/monitor/ack/myack/bycookie',
    method: 'post',
    data
  })
}
