import request from '@/utils/request'
import { addConnectorResourceData } from '@/api/interface/connector'

/**
 * /api/connector/connectorx/usertree 获取服务树列表 get
 */
export function getConnectorResource (treeId: number) {
  return request({
    url: `/api/connector/default/node/${treeId}`,
    method: 'get'
  })
}

/**
 * /api/connector/default/node/${treeId} 添加机器 post
 */
export function addConnectorResource (treeId: number, data: addConnectorResourceData) {
  return request({
    url: `/api/connector/default/node/${treeId}`,
    method: 'post',
    data
  })
}

/**
 * /api/connector/default/node/${treeId} 删除机器 delete
 */
export function deleteConnectorResource (treeId: number, id: number) {
  return request({
    url: `/api/connector/default/node/${treeId}/${id}`,
    method: 'delete'
  })
}