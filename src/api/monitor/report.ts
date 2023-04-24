import request from '@/utils/request'

// 监控告警报告

/**
 * /api/ci/monreport/{treeid}/datalist 获取排班组列表 get
 */
export function getMonReportTimeList (treeId: number) {
  return request({
    url: `/api/ci/monreport/${treeId}/datalist`,
    method: 'get'
  })
}

/**
 * /api/ci/monreport/{treeid}/report?data={date} 获取排班组列表 get
 */
export function getMonReportData (treeId: number, date: string) {
  return request({
    url: `/api/ci/monreport/${treeId}/report?data=${date}`,
    method: 'get'
  })
}
