import request from '@/utils/request'
import { getJobListData, getBusinessUseData, addTokenData } from '@/api/interface/business'
// 获取文件列表
export function getFileServer (treeId: number, params: getBusinessUseData) {
  return request({
    url: `/api/job/fileserver/${treeId}`,
    method: 'get',
    params
  })
}

// 获取token列表
export function getTokenList (treeId: number) {
  return request({
    url: `/api/job/token/${treeId}/info`,
    method: 'get'
  })
}

// 获取作业列表
export function getJobList (data: getJobListData) {
  return request({
    url: '/api/job/third/option/jobname',
    method: 'post',
    data
  })
}

// 添加token
export function addToken (treeId: number, data: addTokenData) {
  return request({
    url: `/api/job/token/${treeId}`,
    method: 'post',
    data
  })
}

// 删除用户
export function deleteToken (treeId: number, id: number) {
  return request({
    url: `/api/job/token/${treeId}/${id}`,
    method: 'delete'
  })
}

// 获取下载地址
export function getDownloadUrl (treeId: number, name: string) {
  return request({
    url: `/api/job/fileserver/${treeId}/download?name=${name}`,
    method: 'get'
  })
}

// 删除文件
export function deleteFile (treeId: number, id: number) {
  return request({
    url: `/api/job/fileserver/${treeId}/${id}`,
    method: 'delete'
  })
}
