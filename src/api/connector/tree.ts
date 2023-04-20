import request from '@/utils/request'
import { connectorAddTreeNodeData } from '@/api/interface/connector'

/**
 * /api/connector/connectorx/usertree 获取服务树列表 get
 */
export function getConnectorUserTree () {
  return request({
    url: '/api/connector/connectorx/usertree',
    method: 'get'
  })
}

/**
 * /api/connector/default/tree/${nodeId} 添加节点 post
 */
export function connectorAddTreeNode (nodeId: number, data: connectorAddTreeNodeData) {
  return request({
    url: `/api/connector/default/tree/${nodeId}`,
    method: 'post',
    data
  })
}

/**
 * /api/connector/release?id=${nodeId} 获取当前服务树节点下是否有资源
 */
export function getTreeNodeResource (nodeId: number) {
  return request({
    url: `/api/connector/release?id=${nodeId}`,
    method: 'get'
  })
}

/**
 * /api/connector/default/tree/${nodeId} 删除节点 delete
 */
export function connectorDeleteTreeNode (nodeId: number) {
  return request({
    url: `/api/connector/default/tree/${nodeId}`,
    method: 'delete'
  })
}