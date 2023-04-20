import request from '@/utils/request'
import { deleteCMDBManageData, editCMDBManageData } from '@/api/interface/global'
/**
 * /api/agent/cmdbmanage 获取列表 get
 */
export function getCMDBManage () {
  return request({
    url: '/api/agent/cmdbmanage',
    method: 'get'
  })
}

/**
 * /api/agent/cmdbmanage 删除CMDB delete
 */
export function deleteCMDBManage (data: deleteCMDBManageData) {
  return request({
    url: '/api/agent/cmdbmanage',
    method: 'delete',
    data
  })
}

/**
 * /api/agent/cmdbmanage 获取CMDB配置 get
 */
export function getCMDBManageDetail (name: string) {
  return request({
    url: `/api/agent/cmdbmanage/${name}`,
    method: 'get'
  })
}

/**
 * /api/agent/cmdbmanage 编辑CMDB post
 */
export function editCMDBManage (data: editCMDBManageData) {
  return request({
    url: '/api/agent/cmdbmanage',
    method: 'post',
    data
  })
}
