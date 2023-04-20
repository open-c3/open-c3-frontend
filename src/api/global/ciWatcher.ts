import request from '@/utils/request'
import { getAuditLogParams } from '@/api/interface/global'
/**
 * /api/ci/watcher 获取列表 get
 */
export function getWatcherList () {
  return request({
    url: '/api/ci/watcher',
    method: 'get'
  })
}

/**
 * /api/ci/watcher/jump/${uuid} 插队 post
 */
export function watcherJump (uuid: string|number) {
  return request({
    url: `/api/ci/watcher/jump/${uuid}`,
    method: 'get'
  })
}