import {
  TreeIdInfo,
  IResponseInfo,
} from '../interface/index'

export interface ITaskJobxGroupInfo extends TreeIdInfo {
  data: {
    [propsName: string]: any
  }
}

export interface ITaskJobUUIDParams {
  taskuuid: string
}

export interface IKillTaskInfo extends ITaskJobUUIDParams {
  slave: string
}
export interface IFlowlineDetailParams extends TreeIdInfo {
  uuid: string | string[] | number
  subtaskuuid?: string
}

export interface ISubTaskSubuuIdParams extends TreeIdInfo {
  subuuid: string | string[] | number
}

export interface IRollbackTaskJobxParams extends TreeIdInfo, IFlowlineDetailParams {
  rollbackType: string
}

export interface ISubTaskConfirmData {
  taskuuid: string;
  subtaskuuid: string;
  subtasktype: string;
  control?: string
}
export interface ISubTaskConfirmParams extends TreeIdInfo {
  data: ISubTaskConfirmData
}

export interface IAWSECSTicketidData {
  ticketid: string,
  data?: {
    cmd: string
  }
}