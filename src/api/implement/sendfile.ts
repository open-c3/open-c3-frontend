// 配置相关的api
import request from '@/utils/request'
import {
  FileListInfo,
} from '../interface/implement'
import {
  TreeIdInfo,
  IResponseInfo,
} from '../interface/index'
import { getBusinessUseData } from '@/api/interface/business'
/**
 * 快速执行 发送文件 获取文件目录  get
 * /api/job/task/{treeId}?sudo={selectUser}&path={filepath}
 * @param {TreeIdInfo} treeId
 * @param {*}  data
 */

export const getJobSendFileList = (data: FileListInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/sendfile/list/${data.treeId}?sudo=${data.selectUser}&path=${data.filepath}`,
    method: 'get'
  })
}

/**
 * 快速执行 发送文件 获取任务列表  get
 * /api/job/task/{treeId}?name=sendfile&time_start={nowTime}
 * @param {TreeIdInfo} treeId
 * @param {Date} newTime
 */

export const getJobTaskList = (treeId: string, params: getBusinessUseData): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/task/${treeId}`,
    method: 'get',
    params,
  })
}
