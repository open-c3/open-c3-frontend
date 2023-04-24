// 代理网络
export const PROXY_SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'id',
      type: 'text',
      placeholder: 'ID'
    },
    {
      label: '',
      prop: 'regionid',
      type: 'text',
      placeholder: 'regionid'
    },
    {
      label: '',
      prop: 'projectid',
      type: 'text',
      placeholder: 'projectid'
    },
    {
      label: '',
      prop: 'name',
      type: 'text',
      placeholder: 'name'
    },
    {
      label: '',
      prop: 'node',
      type: 'text',
      placeholder: 'Node'
    },
    {
      label: '',
      prop: 'check_time',
      type: 'text',
      placeholder: 'check_time'
    },
    {
      label: '',
      prop: 'tcp_speed',
      type: 'text',
      placeholder: 'tcp_speed'
    },
    {
      label: '',
      prop: 'tcp_error',
      type: 'text',
      placeholder: 'tcp_error'
    },
    {
      label: '',
      prop: 'udp_speed',
      type: 'text',
      placeholder: 'udp_speed'
    },
    {
      label: '',
      prop: 'udp_error',
      type: 'text',
      placeholder: 'udp_error'
    },
    {
      label: '',
      prop: 'subnet',
      type: 'text',
      placeholder: 'subnet'
    }
  ],
  formBtnConfig: [
    {
      name: 'reset',
      emitName: 'reset'
    },
    {
      name: 'query',
      emitName: 'query',
      type: 'primary'
    }
  ]
})

// 流水线网络
export const LINE_SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'flowid',
      type: 'text',
      placeholder: 'flowID'
    },
    {
      label: '',
      prop: 'treeid',
      type: 'text',
      placeholder: 'treeID'
    },
    {
      label: '',
      prop: 'name',
      type: 'text',
      placeholder: 'flowLineName'
    },
    {
      label: '',
      prop: 'check_time',
      type: 'text',
      placeholder: 'detectionTime'
    },
    {
      label: '',
      prop: 'test_nodes',
      type: 'text',
      placeholder: 'testEnvNode'
    },
    {
      label: '',
      prop: 'test_error',
      type: 'text',
      placeholder: 'testEnvNodeError'
    },
    {
      label: '',
      prop: 'online_nodes',
      type: 'text',
      placeholder: 'onlineEnvNode'
    },
    {
      label: '',
      prop: 'online_error',
      type: 'text',
      placeholder: 'onlineEnvNodeError'
    }
  ],
  formBtnConfig: [
    {
      name: 'reset',
      emitName: 'reset'
    },
    {
      name: 'query',
      emitName: 'query',
      type: 'primary'
    }
  ]
})
// 代理网络
export const PROXY_THEAD_CONFIG = Object.freeze([
  { prop: 'id', label: 'ID' },
  { prop: 'regionid', label: 'regionid' },
  { prop: 'projectid', label: 'projectid' },
  { prop: 'name', label: 'name'  },
  { prop: 'node', label: 'Node'  },
  { prop: 'check_time', label: 'check_time'  },
  { prop: 'tcp_speed', label: 'tcp_speed'  },
  { prop: 'tcp_error', label: 'tcp_error'  },
  { prop: 'udp_speed', label: 'udp_speed'  },
  { prop: 'udp_error', label: 'udp_error'  },
  { prop: 'subnet', label: 'subnet'  }
])

// 流水线网络
export const LINE_THEAD_CONFIG = Object.freeze([
  { prop: 'flowid', label: 'flowID' },
  { prop: 'treeid', label: 'treeID' },
  { prop: 'name', label: 'flowLineName' },
  { prop: 'check_time', label: 'detectionTime'  },
  { prop: 'test_nodes', label: 'testEnvNode'  },
  { prop: 'test_error', label: 'testEnvNodeError'  },
  { prop: 'online_nodes', label: 'onlineEnvNode'  },
  { prop: 'online_error', label: 'onlineEnvNodeError'  }
])
