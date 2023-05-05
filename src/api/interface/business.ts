// 作业管理列表搜索
export interface getJobListInfo {
  name?: string;
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

// 获取机器列表
export interface getMachineListParams {
  name?: string;
  create_user?: string;
  create_time_start?: string;
  create_time_end?: string;
  inip?: string;
  exip?: string;
}

// 添加机器
export interface addMachineData {
  name: string;
}

// 报警通知列表
export interface getNotifyListParams {
  name?: string;
}

// 添加报警人
export interface addNotifyUserData {
  user: string;
}

export interface JobItemsData {
  create_time: string
  create_user: string
  edit_time: string
  edit_user: string
  hasvariable: number
  id: string | number
  name: string
  stepcount: number
  uuid: string
}

export interface JobItemsInfo {
  treeId: string | string[] | number
  uuid: string
}

export interface JobItemsVariableQueryInfo {
  empty?: string | number
  exclude?: string
  env?: 'in' | 'test' | 'online'
}
export interface JobItemsVariableInfo {
  treeId: string | string[] | number
  jobuuid: string,
  query?: JobItemsVariableQueryInfo
}

export interface RunJobItemInfo {
  treeId: string | string[] | number
  data: {
    jobuuid: string
    variable?: { [propsName: string]: string }
  }
}