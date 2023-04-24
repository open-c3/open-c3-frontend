import request from '@/utils/request'

/**
 * /api/ci/ticket 获取我的凭据列表 get
 */
export function getTicketList () {
  return request({
    url: '/api/ci/ticket',
    method: 'get'
  })
}

/**
 * /api/ci/ticket/${id} 通过id删除凭据 delete
 */
export function deleteTicketById (id: number | string) {
  return request({
    url: `/api/ci/ticket/${id}`,
    method: 'delete'
  })
}
