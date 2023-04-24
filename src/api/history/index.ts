// 

// 配置相关的api
import request from '@/utils/request'
import {
  IAWSECSTicketidData,
  ISubTaskSubuuIdParams,
  ITaskJobxGroupInfo,
  IFlowlineDetailParams,
  IRollbackTaskJobxParams,
  ISubTaskConfirmParams,
  ITaskJobUUIDParams,
} from '../interface/history'
import {
  TreeIdInfo,
  IResponseInfo,
} from '../interface/index'
/**
 * 获取某个服务树下分组列表 get
 * /api/jobx/task/{treeId}
 * @param treeId
 * @param param
 */

export const getJobxGroupList = (params: ITaskJobxGroupInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/jobx/task/${params.treeId}`,
    method: 'get',
    params: params.data
  })
}

/**
 * 获取分组任务下 某个服务树下分组列表 get
 * /api/jobx/task/{treeId}
 * @param treeId
 * @param param
 */

export const getJobGroupList = (params: ITaskJobxGroupInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/task/${params.treeId}`,
    method: 'get',
    params: params.data
  })
}
/**
 * 获取某个服务树下分组列表 get
 * /api/ci/group/{treeId}
 * @param treeId
 */

export const getAllGroupList = (params: TreeIdInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/ci/group/${params.treeId}`,
    method: 'get',
  })
}

/**
 * 获取流水线信息 get
 * /api/jobx/task/{treeId}/{uuid}
 * @param treeId
 * @param uuid
 */

export const getFlowlineInfo = (params: IFlowlineDetailParams): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/jobx/task/${params.treeId}/${params.uuid}`,
    method: 'get',
  })
}

/**
 * 获取Jobx信息  get
 * /api/jobx/subtask/{treeId}/{uuid}
 * @param treeId
 * @param uuid
 */

export const getSubTaskJobxInfo = (params: IFlowlineDetailParams): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/jobx/subtask/${params.treeId}/${params.uuid}`,
    method: 'get',
  })
}

/**
 * 获取Job信息  get
 * /api/job/subtask/{treeId}/{uuid}
 * @param treeId
 * @param uuid
 */

export const getSubTaskInfo = (params: IFlowlineDetailParams): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/subtask/${params.treeId}/${params.uuid}`,
    method: 'get',
  })
}

/**
 * 终止发布任务接口 delete
 * /api/jobx/task/{treeId}/{uuid}
 */

export const deleteKillTaskJobx = (params: IFlowlineDetailParams): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/jobx/task/${params.treeId}/${params.uuid}`,
    method: 'delete',
  })
}

/**
 * 回滚操作  put
 * /api/jobx/task/{treeId}/{uuid}/{rollbackType}
 * @param treeId
 * @param uuid
 * @param rollbackType
 */

export const rollbackTaskJobx = (params: IRollbackTaskJobxParams): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/jobx/task/${params.treeId}/${params.uuid}/${params.rollbackType}`,
    method: 'put',
  })
}

/**
 * 忽略错误操作 put
 * /api/jobx/subtask/{}/{}/confirm
 * @param treeId
 * @param subuuid
 */

export const updateIgnoreError = (params: ISubTaskSubuuIdParams): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/jobx/subtask/${params.treeId}/${params.subuuid}/confirm`,
    method: 'put',
  })
}

/**
 * 执行确认操作、 重试任务 put
 *  /api/job/subtask/{params.treeId}
 * @param treeId
 * @param data => ISubTaskConfirmData
 * @data control: running(重试)/next(执行确认)
 */

export const updateImpleOperate = (params: ISubTaskConfirmParams): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/subtask/${params.treeId}`,
    method: 'put',
    data: params.data
  })
}

/**
 * 忽略任务(ignore)、 终止整个任务(fail) post 
 * @param treeId
 * @param data => ISubTaskConfirmData
 * @data  control: ignore(忽略任务)/ fail(终止任务)
 */

export const updateTaskOperate = (params: ISubTaskConfirmParams): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/subtask/${params.treeId}`,
    method: 'post',
    data: params.data
  })
}

/**
 * 获取Job信息  get
 * /api/job/task/{params.treeId}/{params.uuid}
 * @param treeId string
 * @param uuid string
 */

export const getTaskJobInfo = (params: IFlowlineDetailParams): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/task/${params.treeId}/${params.uuid}`,
    method: 'get',
  })
}

/**
 * 任务详情弹窗获取信息 get
 * /api/job/subtask/{treeid}/{taskuuid}/{subtaskuuid}
 * @param treeId string
 * @param taskuuid => uuid string
 * @param subtaskuuid string
 */

export const getModalTaskJob = (params: IFlowlineDetailParams): Promise<IResponseInfo | any> => {
  return  request({
    url: `/api/job/subtask/${params.treeId}/${params.uuid}/${params.subtaskuuid}`,
    method: 'get',
  })
}

/**
 * 重做任务  post
 * /api/job/task/{treeId}/redo
 * @param treeId  string
 * @param data => ITaskJobUUIDParams
 */

export const getRedoTaskJob = (treeId: TreeIdInfo, data: ITaskJobUUIDParams): Promise<IResponseInfo | any> => {
  return  request({
    url: `/api/job/task/${treeId}/redo`,
    method: 'post',
    data
  })
}

/**
 * 获取AWS ECS 数据列表 post
 * /api/ci/v2/kubernetes/app/describe/ecs?ticketid={ticketid}
 * @param {string} ticketid
 * @param {{cmd: string}} data
 */

export const getPostEcsData =  (data: IAWSECSTicketidData): Promise<IResponseInfo | any> => {
  return  request({
    url: `/api/ci/v2/kubernetes/app/describe/ecs?ticketid=${data.ticketid}`,
    method: 'post',
    data: data.data
  })
}