import request from '@/utils/request'
import { addEmailConfigData } from '@/api/interface/monitor'
/**
 *  /api/agent/monitor/config/mailmon/history 获取邮件监控历史 get
 * 字段说明：
    id: 编号
    account： 账号
    date: 日期
    from： From
    to: To
    severity: 级别
    subject： 标题
    content： 内容
    create_time： 处理时间
 */
export function getEmailHistory () {
  return request({
    url: '/api/agent/monitor/config/mailmon/history',
    method: 'get'
  })
}

/**
 *  /api/agent/monitor/config/mailmon 获取邮件监控列表 get
 * 字段说明：
    id: 编号
    name: 名称
    description:  描述
    edit_user: 编辑者
    edit_time： 编辑时间
 */
export function getEmailList () {
  return request({
    url: '/api/agent/monitor/config/mailmon',
    method: 'get'
  })
}

/**
 *  /api/agent/monitor/config/mailmon 获取邮件监控列表 get
 * 用途： 创建邮件监控
    字段：
      name: 名称
      description： 描述
      config： 配置
    用途：编辑邮件监控
      字段：
        id： 编号
        name: 名称 【注： 不需要编辑名称】
        description： 描述
        config： 配置
 */
export function addEmailConfig (data: addEmailConfigData) {
  return request({
    url: '/api/agent/monitor/config/mailmon',
    method: 'post',
    data
  })
}

/**
 *  /api/agent/monitor/config/mailmon/{id} 获取邮件监控列表 get
 * 字段说明：
    id: 编号
    name: 名称
    description:  描述
    edit_user: 编辑者
    edit_time： 编辑时间
 */
export function getEmailConfig (id: number) {
  return request({
    url: `/api/agent/monitor/config/mailmon/${id}`,
    method: 'get'
  })
}

/**
 *  /api/agent/monitor/config/mailmon/{id} 删除邮件监控： delete
 */
export function deleteEmailConfig (id: number) {
  return request({
    url: `/api/agent/monitor/config/mailmon/${id}`,
    method: 'delete'
  })
}
