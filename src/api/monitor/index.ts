import request from '@/utils/request'
import { g_url } from '@/utils/index'
// const siteaddr = window.location.protocol + '//' + window.location.host
const siteaddr = g_url
import { createKanBanData, editACKData, addConfigGroupData, addGroupUserData } from '@/api/interface/monitor'
// 监控看板
/**
 * /api/agent/monitor/config/kanban 获取看板列表 get
 */
export function getConfigKanBanList (treeId: number):Promise<any> {
  return request({
    url: `/api/agent/monitor/config/kanban/${treeId}`,
    method: 'get'
  })
}

/**
 * /api/agent/monitor/config/kanban 创建看板 post
 * @param { string } name
 * @param { string } url
 */
export function createKanBan (treeId: number, data: createKanBanData) {
  return request({
    url: `/api/agent/monitor/config/kanban/${treeId}`,
    method: 'post',
    data
  })
}

/**
 * /api/agent/monitor/config/kanban/setdefault/{treeid}/{kanbanid} 变更缺省看板 post
 * @param { string } treeid
 * @param { string } kanbanid
 */
export function updateKanBan (treeId: number, kanBanId: number) {
  return request({
    url: `/api/agent/monitor/config/kanban/setdefault/${treeId}/${kanBanId}`,
    method: 'post'
  })
}

/**
 * /api/agent/monitor/config/kanban/{treeid}/{kanbanid} 删除看板 delete
 * @param { string } treeid
 * @param { string } kanbanid
 */
export function deleteKanBan (treeId: number, kanBanId: number) {
  return request({
    url: `/api/agent/monitor/config/kanban/${treeId}/${kanBanId}`,
    method: 'delete'
  })
}

// 当前告警
/**
 * /api/agent/monitor/alert 获取当前告警列表 get
 * @param treeId
 */
export function getMonitorAlertList (treeId: number) {
  return request({
    url: `/api/agent/monitor/alert/${treeId}?siteaddr=${siteaddr}`,
    method: 'get'
  })
}

/**
 * /api/agent/monitor/alert/tottbind 获取当前告警工单列表 get
 * @param treeId
 */
export function getMonitorAlertTottbind (treeId: number) {
  return request({
    url: `/api/agent/monitor/alert/tottbind/${treeId}`,
    method: 'get'
  })
}

/**
 * /api/agent/monitor/alert/tottbind 获取当前告警工单地址 get
 * @param treeId
 */
export function toCase (params) {
  return request({
    url: `/api/agent/monitor/alert/gotocase/0?uuid=${params.uuid}&caseuuid=${params.caseuuid}`,
    method: 'get'
  })
}

/**
 * /api/agent/monitor/alert/tottbind 当前告警转工单
 */
export function transferOrder (data) {
  return request({
    url: '/api/agent/monitor/alert/tott/0',
    method: 'post',
    data
  })
}

// 监控事件
/**
 * api/agent/monitor/caseinfo/allcase 获取告警事件列表 get
 */
export function getAllCase () {
  return request({
    url: 'api/agent/monitor/caseinfo/allcase',
    method: 'get'
  })
}
/**
 * /api/agent/monitor/alert/0?siteaddr=${siteaddr}&uuidonly=1 获取告警事件状态 get
 */
export function getMonitorAlert () {
  return request({
    url: `/api/agent/monitor/alert/0?siteaddr=${siteaddr}&uuidonly=1`,
    method: 'get'
  })
}

// 获取屏蔽列表
export function getMonitorACK (uuid: string) {
  return request({
    url: `/api/agent/monitor/ack/${uuid}`,
    method: 'get'
  })
}

// 屏蔽操作
export function editACK (uuid: string, data: editACKData) {
  return request({
    url: `/api/agent/monitor/ack/${uuid}`,
    method: 'post',
    data
  })
}

/**
 * /api/agent/monitor/ack/tott/${data.id} 监控事件转工单 post
 * @param caseinfo
 * @param casedata
 * @param caseuuid
 */
export function monitorACKOrder (uuid: string, data: any) {
  return request({
    url: `/api/agent/monitor/ack/tott/${uuid}`,
    method: 'post',
    data
  })
}

// 报警组

/**
 * /api/agent/monitor/config/group 获取监控组列表 get
 */
export function getConfigGroup () {
  return request({
    url: '/api/agent/monitor/config/group',
    method: 'get'
  })
}

/**
 * /api/agent/monitor/config/group 创建/编辑告警组 post
 * 用途： 创建告警组
    post数据：
            name： 名称
            description： 描述

    用途： 编辑告警组信息
    post数据：
            id： 要编辑的组的id
            name： 名称
            description： 描述
 */
export function addConfigGroup (data: addConfigGroupData) {
  return request({
    url: '/api/agent/monitor/config/group',
    method: 'post',
    data
  })
}

/**
 * /api/agent/monitor/config/group/{groupid} 删除组 delete
 */
export function deleteGroup (groupId: number) {
  return request({
    url: `/api/agent/monitor/config/group/${groupId}`,
    method: 'delete'
  })
}

/**
 * /api/agent/monitor/config/groupuser/{groupid} 获取组用户列表 get
 */
export function getGroupUser (groupId: number) {
  return request({
    url: `/api/agent/monitor/config/groupuser/${groupId}`,
    method: 'get'
  })
}

/**
 * /api/agent/monitor/config/groupuser 添加组成员 post
 * post数据：
    groupid： 组id
    user：添加到组中的用户
 */
export function addGroupUser (data: addGroupUserData) {
  return request({
    url: '/api/agent/monitor/config/groupuser',
    method: 'post',
    data
  })
}

/**
 * /api/agent/monitor/config/groupuser/{uid} 删除组成员 delete
 */
export function deleteUser (uid) {
  return request({
    url: `/api/agent/monitor/config/groupuser/${uid}`,
    method: 'delete'
  })
}
