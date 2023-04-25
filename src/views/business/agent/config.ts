// 表头
export const THEAD_CONFIG = [
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'region', label: 'region', align: 'center' },
  { prop: 'proxy', label: 'proxy', align: 'center', type: 'slot' },
  { prop: 'agent', label: 'network', align: 'center', type: 'slot' }
]

// 添加自定义区域
export const ADD_REGION_CONFIG = {
  width: '800px',
  title: 'customizeARegionTitle',
  titleParams: {title: ''},
  noDefaultFooter: true
}

// 表头
export const REGION_THEAD_CONFIG = [
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'select', label: 'select', align: 'center', type: 'slot' },
  { prop: 'name', label: 'region', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
]

// 添加代理
export const PROXY_THEAD_CONFIG = Object.freeze([
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'ip', label: 'IP', align: 'center' },
  { prop: 'status', label: 'status', align: 'center', type: 'slot' },
  { prop: 'version', label: 'version', align: 'center', type: 'slot' },
  { prop: 'fail', label: 'failCount', align: 'center' },
  { prop: 'reason', label: 'reason', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])

// 服务树机器表头
export const HOST_THEAD_CONFIG = Object.freeze([
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'nameCheck', label: 'hostname', align: 'center', type: 'slotTable' },
  { prop: 'type', label: 'type', align: 'center' },
  { prop: 'inipCheck', label: 'privateIP', align: 'center', type: 'slotTable' },
  { prop: 'exipCheck', label: 'internetIP', align: 'center', type: 'slotTable'  },
])

// 服务树机器弹框配置
export const TREE_HOST_CONFIG = {
  width: '800px',
  title: 'treeHostTitle',
  titleParams: {parent: '', id: ''},
  noDefaultFooter: true
}

// 添加网段
export const ADD_AGENT_CONFIG = {
  width: '800px',
  title: 'addAgentTitle',
  titleParams: {parent: '', name: ''},
  noDefaultFooter: true
}

// 网段表头
export const AGENT_THEAD_CONFIG = Object.freeze([
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'ip', label: 'network', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot'  },
])