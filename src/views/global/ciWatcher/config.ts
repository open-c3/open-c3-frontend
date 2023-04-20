// CI 队列
export const CI_SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'project_id',
      type: 'text',
      placeholder: 'flowID'
    },
    {
      label: '',
      prop: 'project_groupid',
      type: 'text',
      placeholder: 'treeID'
    },
    {
      label: '',
      prop: 'project_name',
      type: 'text',
      placeholder: 'flowLineName'
    },
    {
      label: '',
      prop: 'version_name',
      type: 'text',
      placeholder: 'tagVersions'
    },
    {
      label: '',
      prop: 'version_slave',
      type: 'text',
      placeholder: 'taskSlave'
    },
    {
      label: '',
      prop: 'project_cpulimit',
      type: 'text',
      placeholder: 'cpuLimit'
    },
    {
      label: '',
      prop: 'project_memlimit',
      type: 'text',
      placeholder: 'memoryLimit'
    },
    {
      label: '',
      prop: 'version_status',
      type: 'text',
      placeholder: 'presetStatus'
    },
    {
      label: '',
      prop: 'version_queueid',
      type: 'text',
      placeholder: 'queueID'
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

// 正在运行
export const RUNNING_SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'project_id',
      type: 'text',
      placeholder: 'flowID'
    },
    {
      label: '',
      prop: 'project_groupid',
      type: 'text',
      placeholder: 'treeID'
    },
    {
      label: '',
      prop: 'project_name',
      type: 'text',
      placeholder: 'flowLineName'
    },
    {
      label: '',
      prop: 'version_name',
      type: 'text',
      placeholder: 'tagVersions'
    },
    {
      label: '',
      prop: 'version_slave',
      type: 'text',
      placeholder: 'taskSlave'
    },
    {
      label: '',
      prop: 'project_cpulimit',
      type: 'text',
      placeholder: 'cpuLimit'
    },
    {
      label: '',
      prop: 'project_memlimit',
      type: 'text',
      placeholder: 'memoryLimit'
    },
    {
      label: '',
      prop: 'version_status',
      type: 'text',
      placeholder: 'presetStatus'
    },
    {
      label: '',
      prop: 'version_queueid',
      type: 'text',
      placeholder: 'queueID'
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
// 表头
export const CI_THEAD_CONFIG = Object.freeze([
  { prop: 'project_id', label: 'flowID', align: 'center' },
  { prop: 'project_groupid', label: 'treeID', align: 'center' },
  { prop: 'project_name', label: 'flowLineName', align: 'center' },
  { prop: 'version_name', label: 'tagVersions', align: 'center'  },
  { prop: 'version_slave', label: 'taskSlave', align: 'center'  },
  { prop: 'project_cpulimit', label: 'cpuLimit', align: 'center'  },
  { prop: 'project_memlimit', label: 'memoryLimit', align: 'center'  },
  { prop: 'version_status', label: 'presetStatus', align: 'center'  },
  { prop: 'version_queueid', label: 'queueID', align: 'center'  },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot'  }
])

// 表头
export const RUNNING_THEAD_CONFIG = Object.freeze([
  { prop: 'project_id', label: 'flowID', align: 'center' },
  { prop: 'project_groupid', label: 'treeID', align: 'center' },
  { prop: 'project_name', label: 'flowLineName', align: 'center' },
  { prop: 'version_name', label: 'tagVersions', align: 'center'  },
  { prop: 'version_slave', label: 'taskSlave', align: 'center'  },
  { prop: 'project_cpulimit', label: 'cpuLimit', align: 'center'  },
  { prop: 'project_memlimit', label: 'memoryLimit', align: 'center'  },
  { prop: 'version_status', label: 'presetStatus', align: 'center'  },
  { prop: 'version_queueid', label: 'queueID', align: 'center'  },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot'  }
])