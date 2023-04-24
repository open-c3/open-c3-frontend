import request from '@/utils/request'

/**
 * /api/jobx/monitor/metrics?json=1 获取系统监控信息列表 get
 */
export function getSystemMonitor () {
  return request({
    url: '/api/jobx/monitor/metrics?json=1',
    method: 'get'
  })
}
