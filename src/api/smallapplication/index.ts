// 配置相关的api
import request from '@/utils/request'

import {

} from '../interface/smallapplication'
import {
  TreeIdInfo,
  IResponseInfo,
} from '../interface/index'

/**
 * 获取轻应用列表信息  get
 * /api/job/smallapplication/bytreeid/{treeId}
 * @param {TreeIdInfo} treeId
 */

export const getSmallApplication = (data: TreeIdInfo): Promise<IResponseInfo | any> => {
  return request({
    url: `/api/job/smallapplication/bytreeid/${data.treeId}`,
    method: 'get',
  })
}