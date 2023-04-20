import request from '@/utils/request'
import saveSysctlData from '@/api/interface/global'

/**
 * /api/connector/sysctl 获取系统参数配置 get
 */
export function getSysctl () {
  return request({
    url: '/api/connector/sysctl',
    method: 'get'
  })
}

/**
 * /api/connector/sysctl 保存系统参数配置 post
 */
export function saveSysctl (data: saveSysctlData) {
  return request({
    url: '/api/connector/sysctl',
    method: 'post',
    data
  })
}
