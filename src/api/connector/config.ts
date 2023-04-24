import request from '@/utils/request'

/**
 * /api/connector/config?name=${name} 获取配置 get
 */
export function getConnectorConfig (name: string) {
  return request({
    url: `/api/connector/config?name=${name}`,
    method: 'get'
  })
}

/**
 * /api/connector/config/list 获取连接器列表 get
 */
export function getConnectorList () {
  return request({
    url: '/api/connector/config/list',
    method: 'get'
  })
}

/**
 * /api/connector/config 设置 post
 */
export function setConnectorConfig (data) {
  return request({
    url: `/api/connector/config`,
    method: 'post',
    data
  })
}
