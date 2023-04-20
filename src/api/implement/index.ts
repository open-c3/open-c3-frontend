
// 配置相关的api
import request from '@/utils/request'
import {
  JobGroupFormInfo,
  CreateTaskInfo,
  RunJobTaskInfo,
  RunScriptTaskInfo,
} from '../interface/implement'
import {
  TreeIdInfo,
  IResponseInfo,
} from '../interface/index'
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
 * 获取服务树下job信息  get
 * /api/job/jobs/{treeId}
 * @param treeId
 * @param uuid
 * @param jobType
 */

export const getTreeJobs = (params: TreeIdInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/jobs/${params.treeId}`,
    method: 'get',
  })
}

/**
 * 机器分批列表 get
 * /api/jobx/group/{treeId}
 * @param treeId
 */

export const getGroupBatchesList = (params: TreeIdInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/jobx/group/${params.treeId}`,
    method: 'get',
  })
}



/**
 * 获取作业任务下的form表单   get
 * /api/job/variable/{treeid}/{uuid}?empty=0&usrext=1
 * @param treeid ==> treeeId
 * @param uuid 
 */

export const getJobformList = (params: JobGroupFormInfo): Promise<IResponseInfo | any>  => {
  return request({
    url: `/api/job/variable/${params.treeId}/${params.uuid}?empty=0&usrext=1`,
    method: 'get',
  })
}

/**
 * 加载子服务树   get
 * /api/ci/v2/c3mc/tree/subtreemap/{treeId}
 * @param treeId
 */

export const getSubTreeList = (params: TreeIdInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/ci/v2/c3mc/tree/subtreemap/${params.treeId}`,
    method: 'get',
  })
}

/**
 * 创建任务 post
 * /api/jobx/task/{treeId}/job/byname
 * @param data: CreateTaskInfo
 */

export const createNewTask = (data: CreateTaskInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/jobx/task/${data.id}/job/byname`,
    method: 'post',
    data: data.data
  })
}

/**
 * 快速执行 中的 执行作业  post
 * /api/job/task/{treeId}/job
 * @param  treeId => treeid
 * @param data
 */

export const runquicklyRunjob = (treeId: string| string[]| number, data: RunJobTaskInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/task/${treeId}/job`,
    method: 'post',
    data,
  })
}

/**
 * 快速执行 中的 执行脚本  post
 * /api/job/task/{treeId}/plugin_cmd
 * @param  treeId => treeid
 * @param data
 */

export const runquicklyRunScript = (treeId: string| string[]| number, data: RunScriptTaskInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/task/${treeId}/plugin_cmd`,
    method: 'post',
    data,
  })
}

/**
 * 快速执行 中的 分发文件 获取执行账户列表  get
 * /api/job/userlist/{treeId}
 * @param  treeId => treeid
 */

export const getJobUserList = (params: TreeIdInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/userlist/${params.treeId}`,
    method: 'get',
  })
}