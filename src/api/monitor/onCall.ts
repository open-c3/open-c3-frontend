import request from '@/utils/request'
import { addConfigOnCallData } from '@/api/interface/monitor'
// 值班

/**
 * /api/agent/monitor/config/oncall 获取排班组列表 get
 */
export function getConfigOnCall () {
  return request({
    url: '/api/agent/monitor/config/oncall',
    method: 'get'
  })
}

/**
 * /api/agent/monitor/config/oncall 添加或编辑值班组 post
 *  用途：新建组
      post数据：
        name: 名称
        description： 描述
        config： 配置 文件内容
    用途：编辑组
      post数据：
        id: 组编号
        name: 名称  【编辑过程中名字不允许编辑】
        description： 描述
        config： 配置 文件内容
 */
export function addConfigOnCall (data: addConfigOnCallData) {
  return request({
    url: '/api/agent/monitor/config/oncall',
    method: 'post',
    data
  })
}

/**
 * /api/agent/monitor/config/oncall/{groupid} 获取排班组列表 get
 */
export function getConfigOnCallById (groupId: number) {
  return request({
    url: `/api/agent/monitor/config/oncall/${groupId}`,
    method: 'get'
  })
}

/**
 *  /api/agent/monitor/config/oncall/{groupid} 删除组 delete
 */
export function deleteOnCallGroup (groupId: number) {
  return request({
    url: `/api/agent/monitor/config/oncall/${groupId}`,
    method: 'delete'
  })
}

/**
 *  /api/agent/monitor/config/oncall/list/{groupname} 查看值班表 get
 */
export function getDutySchedule (groupName: string) {
  return request({
    url: `/api/agent/monitor/config/oncall/list/${groupName}`,
    method: 'get'
  })
}

/**
 *  /api/agent/monitor/config/oncall/cal/{groupname}?user={username} 查看值班日历 get
 * 注： 其中username可以传也可以不传。有username时为指定查看具体用户的值班日历。
 */
export function getCalendar (groupName: string, userName: string) {
  return request({
    url: userName === '' ? `/api/agent/monitor/config/oncall/cal/${groupName}` : `/api/agent/monitor/config/oncall/cal/${groupName}?user=${userName}`,
    method: 'get'
  })
}
