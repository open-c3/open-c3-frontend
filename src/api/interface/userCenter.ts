// 驳回ACK
export interface updateMyACKData {
  uuid: string;
  type: string;
  mt: string;
}

export interface TreeIdInfo {
  treeId?: string | number | string[]
}

export interface IFavoritesInfo {
  stat: boolean;
  data?: object | Array<any>;
  info: string
}

// 新建镜像
export interface addImagesData {
  name: string;
  describe: string;
  share: string;
}

export interface IAssignmentInfo {
  stat: boolean;
  data?: object | Array<any>;
  info: string
}

//操作协助列表
export interface IAssignmentParam {
  activeName: 'tome' | 'byme'
}

// 操作协助的具体操作

export interface IAssignmentOperateData {
  id: string
}

export interface IAssignmentOperateDetailData extends IAssignmentOperateData {
  data?: {
    status?: string,
    handle_reason?: string
  }
}

export interface ICustonizeData {
  api: string,
  data: {
    namespace:string, 
    ticketid: string,
  }
}
