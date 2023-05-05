import request from '@/utils/request'

export interface VariableOperateInfo {
  jobuuid: string,
   data: {name?: string, value?: string, describe?: string}[]
}

export interface LightAppInfo {
  describe?: string;
  jobid?: string;
  title?: string;
  type?: string;
  treeid?: string | string[] | number,
  parameter?: string
}