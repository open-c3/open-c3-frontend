// 新建看板
export interface createKanBanData {
  name: string;
  url: string;
}

// 屏蔽操作
export interface editACKData {
  ctrl: string;
  type: string;
}

// 服务树继承解除
export interface setTreeUnbindData {
  status: string | number;
}

// 添加采集
export interface addCollectorData {
  id?: number;
  type: string;
  subtype: string;
  content1: string | number;
  content2?: string | number;
}

// 测试通道
export interface configUserTestData {
  projectid: number | string;
  user: any;
}

// 添加告警组
export interface addConfigGroupData {
  id?: number;
  name: string;
  description: string;
}

// 组添加成员
export interface addGroupUserData {
  groupid: number;
  user: string;
}

// 添加值班表
export interface addConfigOnCallData {
  id?: number;
  name: string;
  description: string;
  config: string;
}

// 邮件
export interface addEmailConfigData {
  id?: number;
  name: string;
  description: string;
  config: string;
}

// 添加自愈套餐
export interface addSelfHealingData {
  id?: number | string;
  name: string;
  altername: string;
  jobname: string;
  eips: string;
}