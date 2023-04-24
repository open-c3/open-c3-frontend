import request from '@/utils/request'

/**
 * /api/agent/networkmonitor 获取代理网络列表 get
 */
export function getNetworkMonitor () {
  return request({
    url: '/api/agent/networkmonitor',
    method: 'get'
  })
}

/**
 * /api/ci/networkmonitor 获取流水线网络列表 get
 */
export function getCINetworkMonitor () {
  return request({
    url: '/api/ci/networkmonitor',
    method: 'get'
  })
}
