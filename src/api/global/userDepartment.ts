import request from '@/utils/request'
import { addUserDepartmentData } from '@/api/interface/global'
/**
 * /api/connector/userdepartment 获取用户部门关系绑定列表 get
 */
export function getUserDepartment () {
  return request({
    url: '/api/connector/userdepartment',
    method: 'get'
  })
}

/**
 * /api/connector/userdepartment 添加用户部门关系绑定 post
 */
export function addUserDepartment (data: addUserDepartmentData) {
  return request({
    url: '/api/connector/userdepartment',
    method: 'post',
    data
  })
}

/**
 * /api/connector/userdepartment 删除用户部门关系绑定 delete
 */
export function deleteUserDepartment (id: string|number) {
  return request({
    url: `/api/connector/userdepartment/${id}`,
    method: 'delete'
  })
}
