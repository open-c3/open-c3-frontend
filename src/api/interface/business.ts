// 作业管理列表搜索
export interface getJobListData {
  jobname?: string;
  create_user?: string;
  edit_user?: string;
  create_time_start?: string;
  create_time_end?: string;
  edit_time_start?: string;
  edit_time_end?: string;
}

// 获取账户管理列表
export interface getBusinessUseData {
  name?: string;
  create_user?: string;
  create_time_start?: string;
  create_time_end?: string;
}

// 创建用户
export interface createBusinessUseData {
  username: string;
}

// 获取作业列表
export interface getJobListData {
  project_id: number;
}

// 添加token
export interface addTokenData {
  token: string;
  describe: string;
  isjob: boolean;
  jobname?: string;
}

// 查询脚本列表
export interface getScriptsParams {
  name?: string;
  create_user?: string;
  edit_user?: string;
  create_time_start?: string;
  create_time_end?: string;
  edit_time_start?: string;
  edit_time_end?: string;
}

// 添加脚本
export interface addScriptData {
  type?: string;
  name?: string;
  cont?: string;
}

// 获取机器分组列表
export interface getNodeGroupParams {
  name?: string;
  plugin?: string;
  jobname?: string;
  create_user?: string;
  edit_user?: string;
  create_time_start?: string;
  create_time_end?: string;
  edit_time_start?: string;
  edit_time_end?: string;
}

// 机器分组-创建分组
export interface createNodeGroupData {
  name: string;
  plugin: string;
  params: string;
}

// 机器分批-新建分批
export interface createJobxGroupData {
  name: string;
  note: string;
  group_type: string;
  node?: string;
  percent?: string;
}