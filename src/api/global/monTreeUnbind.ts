import request from '@/utils/request'

/**
 * /api/agent/monitor/config/treeunbind 获取 get
 */
export function getTreeUnbindList () {
  return request({
    url: '/api/agent/monitor/config/treeunbind',
    method: 'get'
  })
}
