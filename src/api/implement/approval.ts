// 配置相关的api
import request from '@/utils/request'
import {
  InitiateApprovalInfo,
} from '../interface/implement'
import {
  TreeIdInfo,
  IResponseInfo,
} from '../interface/index'

/**
 * 执行审批  post
 * /api/job/task/{treeId}/plugin_approval
 * @param {TreeIdInfo} treeId
 * @param {*}  data
 */

export const initiateApproval = (data: InitiateApprovalInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/task/${data.treeId}/plugin_approval`,
    method: 'post',
    data: data.data
  })
}
