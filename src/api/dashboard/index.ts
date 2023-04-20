// 配置相关的api
import request from '@/utils/request'
import {
  TaskDataParams,
  DashboardPromiseInfo
} from '../interface/dashboard'

/**
 *  获取业务主机数 get
 * /api/job/nodeinfo/{treeId}/count
 * @param treeId
 */
export const taskDataLists = (params: TaskDataParams): Promise<DashboardPromiseInfo | any> => {
  return request({
    url: `/api/job/nodeinfo/${params.treeId}/count`,
    method: 'get',
    params
  })
}

/**
 *  获取常用作业数 get
 * /api/job/jobs/{treeId}/count
 * @param treeId
 */
export const commonDataLists = (params: TaskDataParams): Promise<DashboardPromiseInfo | any> => {
  return request({
    url: `/api/job/jobs/${params.treeId}/count`,
    method: 'get',
    params
  })
}

/**
 * 获取本月执行任务数 get
 * /api/job/task/{treeId}/count
 * @param treeId
 */
export const monthTaskLists = (params: TaskDataParams): Promise<DashboardPromiseInfo | any> => {
  return request({
    url: `/api/job/task/${params.treeId}/count`,
    method: 'get',
    params
  })
}

/**
 * 获取定时任务任务数 get
 * /api/job/crontab/{treeId}/count
 * @param treeId
 */
export const crontabTaskLists = (params: TaskDataParams): Promise<DashboardPromiseInfo | any> => {
  return request({
    url: `/api/job/crontab/${params.treeId}/count`,
    method: 'get',
    params
  })
}

/**
 * 获取历史任务执行情况图表数据 get
 * /api/job/task/{treeId}/analysis/date
 * @param treeId
 */

export const analysisDateLists = (params: TaskDataParams): Promise<DashboardPromiseInfo | any> => {
  return request({
    url: `/api/job/task/${params.treeId}/analysis/date`,
    method: 'get',
    params
  })
}

/**
 * 获取任务执行时长统计 get
 * /api/job/task/{treeId}//analysis/runtime
 * @param treeId
 */

export const analysisRunTimeLists = (params: TaskDataParams): Promise<DashboardPromiseInfo | any> => {
  return request({
    url: `/api/job/task/${params.treeId}/analysis/runtime`,
    method: 'get',
    params
  })
}

/**
 * 获取最近任务执行记录数据 get
 * /api/job/task/{treeId}//analysis/last
 * @param treeId
 */


export const analysisLastTableLists = (params: TaskDataParams): Promise<DashboardPromiseInfo | any> => {
  return request({
    url: `/api/job/task/${params.treeId}/analysis/last`,
    method: 'get',
    params
  })
}

/**
 * 获取ci流水线数据 get
 * /api/ci/group/{treeId}
 * @param treeId
 */

export const analysisGroupLists = (data: TaskDataParams): Promise<DashboardPromiseInfo | any> => {
  return request({
    url: `/api/ci/group/${data.treeId}`,
    method: 'get',
    data
  })
}