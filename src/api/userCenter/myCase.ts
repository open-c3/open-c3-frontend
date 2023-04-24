import request from '@/utils/request'

/**
 * /api/agent/monitor/caseinfo/mycase 获取我的事件列表 get
 */
export function getMyCase () {
  return request({
    url: '/api/agent/monitor/caseinfo/mycase',
    method: 'get'
  })
}

// getMonitorAlert 获取当前告警工单地址 get
// getMonitorAlertTottbind 获取当前告警工单列表 get
// toCase 获取当前告警工单地址 get