import request from '@/utils/request'
import { addSelfHealingData } from '@/api/interface/monitor'
// 自愈

/**
 * /api/agent/selfhealing/config 获取配置 get
 */
export function getSelfHealingConfig () {
  return request({
    url: '/api/agent/selfhealing/config',
    method: 'get'
  })
}

/**
 * /api/agent/selfhealing/task 获取自愈套餐 get
 */
export function getSelfHealingTask () {
  return request({
    url: '/api/agent/selfhealing/task',
    method: 'get'
  })
}

/**
 * /api/job/jobs/0 获取作业列表 get
 */
export function getJobList () {
  return request({
    url: '/api/job/jobs/0',
    method: 'get'
  })
}

/**
 * /api/agent/selfhealing/config 添加自愈套餐 post
 */
export function addSelfHealing (data: addSelfHealingData) {
  return request({
    url: '/api/agent/selfhealing/config',
    method: 'post',
    data
  })
}

/**
 * /api/agent/selfhealing/config/${id} 删除自愈套餐 delete
 */
export function deleteSelfHealing (id) {
  return request({
    url: `/api/agent/selfhealing/config/${id}`,
    method: 'delete'
  })
}
