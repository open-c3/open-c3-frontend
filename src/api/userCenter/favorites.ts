import request from '@/utils/request'
import {
  TreeIdInfo,
  IFavoritesInfo
} from '@/api/interface/userCenter'

/**
 * 获取我的收藏夹列表列表 get
 * /api/ci/group/favorites/{treeId}
 * @param treeId
 */

export const getFavoriteList = (params: TreeIdInfo): Promise<IFavoritesInfo | any> => {
  return request({
    url: `/api/ci/group/favorites/${params.treeId}`,
    method: 'get',
  })
}
