import request from '@/utils/request'
import { addConnectorPrivateData } from '@/api/interface/global'
/**
 * /api/connector/private 获取私有节点列表 get
 */
export function getConnectorPrivate () {
  return request({
    url: '/api/connector/private',
    method: 'get'
  })
}

/**
 * /api/connector/private 添加私有节点 post
 */
export function addConnectorPrivate (data: addConnectorPrivateData) {
  return request({
    url: '/api/connector/private',
    method: 'post',
    data
  })
}

