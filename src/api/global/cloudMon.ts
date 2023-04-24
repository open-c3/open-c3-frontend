import request from '@/utils/request'
import { addCloudMonData } from '@/api/interface/global'
/**
 * /api/agent/cloudmon 获取列表 get
 */
export function getCloudMon () {
  return request({
    url: '/api/agent/cloudmon',
    method: 'get'
  })
}

/**
 * /api/agent/cloudmon 添加云监控 post
 */
export function addCloudMon (data: addCloudMonData) {
  return request({
    url: '/api/agent/cloudmon',
    method: 'post',
    data
  })
}

/**
 * /api/agent/cloudmon/${id} 删除云监控 delete
 */
export function deleteCloudMon (id: string | number) {
  return request({
    url: `/api/agent/cloudmon/${id}`,
    method: 'delete'
  })
}

/**
 * /api/agent/cloudmon/exporter 获取type列表 get
 */
export function getCloudMonExporter () {
  return request({
    url: '/api/agent/cloudmon/exporter',
    method: 'get'
  })
}

/**
 * /api/agent/cloudmon 获取云监控详情 get
 */
export function getCloudMonDetail (id: number | string) {
  return request({
    url: `/api/agent/cloudmon/${id}`,
    method: 'get'
  })
}
