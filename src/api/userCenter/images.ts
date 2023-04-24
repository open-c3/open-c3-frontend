import request from '@/utils/request'
import { addImagesData } from '@/api/interface/userCenter'
/**
 * /api/ci/images 获取镜像列表 get
 */
export function getImagesList () {
  return request({
    url: '/api/ci/images',
    method: 'get'
  })
}

/**
 * /api/ci/images/${id} 获取镜像详情 get
 */
export function getImagesDetail (id: string|number) {
  return request({
    url: `/api/ci/images/${id}`,
    method: 'get'
  })
}

/**
 * /api/ci/images/${id}/upload 获取镜像文件详情 get
 */
export function getImagesFileDetail (id: string|number) {
  return request({
    url: `/api/ci/images/${id}/upload`,
    method: 'get'
  })
}

/**
 * /api/ci/images 新建镜像 post
 */
export function addImages (data: addImagesData) {
  return request({
    url: '/api/ci/images',
    method: 'post',
    data
  })
}

/**
 * /api/ci/images 更新镜像 post
 */
export function updateImages (id: string | number,data: addImagesData) {
  return request({
    url: `/api/ci/images/${id}`,
    method: 'post',
    data
  })
}

/**
 * /api/ci/images 删除镜像 delete
 */
export function deleteImages (id: string|number) {
  return request({
    url: `/api/ci/images/${id}`,
    method: 'delete'
  })
}
