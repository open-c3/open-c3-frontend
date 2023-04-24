// 添加用户
export interface connectorAddUserData {
  user: string;
}

// 添加用户权限
export interface addUserAuthData {
  user: string;
  level: string;
}

// 添加用户服务树权限
export interface addUserTreeAuthData {
  user: string;
  tree: number;
  level: string;
}

// 添加服务树节点
export interface connectorAddTreeNodeData {
  name: string;
}

// 添加机器
export interface addConnectorResourceData {
  name: string;
}

export interface setConnectorConfigData {
  juyunappname: string;
  juyunappkey: string;
}