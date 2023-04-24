import { t } from '@/utils/language';

export const TASK_STATUS_OPTION: Array<{ id: string | number, label: string, name: string, value: string }> = [
  { id: '', label: t('allCN'), name: t('allCN'), value: '' },
  { id: 'fail', label: t('executedFail'), name: t('executedFail'), value: 'fail' },
  { id: 'success', label: t('executedSuccess'), name: t('executedSuccess'), value: 'success' },
  { id: 'running', label: t('executing'), name: t('executing'), value: 'running' },
  { id: 'waiting', label: t('wait'), name: t('wait'), value: 'waiting' },
]


export const START_METHOD_MAP: { [propName: string]: string } = {
  page: t('jobxTaskPage'),
  api: 'API',
  crontab: t('jobxTaskPlan')
}

export const JOB_LIST_SEARCH_CONFIG = {
  labelWidth: 0,
  formConfig: [
    {
      label: 'taskName',
      prop: 'name',
      type: 'text',
      placeholder: 'jobxTaskName'
    },
    {
      label: 'initiator',
      prop: 'user',
      type: 'slot',
      placeholder: 'initiatorFullName'
    },
    {
      label: 'jobxTaskStatus',
      prop: 'status',
      type: 'select',
      data: TASK_STATUS_OPTION,
      placeholder: 'jobxTaskStatusPlaceholder'
    },
    {
      label: t('creatorTime'),
      prop: 'time_start',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
      placeholder: 'createStartAt'
    },
    {
      label: '',
      prop: 'time_end',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
      placeholder: 'createFinishAt'
    },
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
}

export const JOB_LIST_TABLE_CONFIG: Array<any> = [
  // 任务名称
  { prop: 'name', label: 'taskName', align: 'center' },
  // 关联流水线   ciinfo
  { prop: 'ciinfo', label: 'associatedFlow', align: 'center', type: 'slot' },
  // 启动人
  { prop: 'user', label: 'initiator', align: 'center' },
  // 任务状态  status
  { prop: 'status', label: 'jobxTaskStatus', align: 'center', type: 'slot' },
  // 开始时间
  { prop: 'starttime', label: 'startAt', align: 'center', width: 150 },
  // 结束时间
  { prop: 'finishtime', label: 'finishAt', align: 'center', width: 150 },
  // 耗时 seftime
  { prop: 'seftime', label: 'useTime', align: 'center', type: 'slot' },
  // 启动方式 startMethod
  { prop: 'startMethod', label: 'startMethod', align: 'center', type: 'slot' },
  // version version
  { prop: 'version', label: 'Version', align: 'center', type: 'slot' },
  // 操作  operate
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
]

// 任务状态 
export const JOBX_GROUP_TABLE_STATUS: { [propName: string]: { text: string, color: string, detailText?: string } } = {
  null: {
    text: t('Prepare'),
    detailText: t('Prepare'),
    color: 'var(--el-color-gray)'
  },
  init: {
    text: t('ready'),
    detailText: t('ready'),
    color: 'var(--el-color-gray)'
  },
  refuse: {
    text: t('refuse'),
    detailText: t('refuse'),
    color: 'var(--el-color-danger)'
  },
  '': {
    text: t('waitExecution'),
    detailText: t('wait'),
    color: 'var(--el-color-warning)'
  },
  success: {
    text: t('executedSuccess'),
    detailText: t('success'),
    color: 'var(--el-color-success)'
  },
  fail: {
    text: t('executedFail'),
    detailText: t('Fail'),
    color: 'var(--el-color-danger)'
  },
  decision: {
    text: t('Determined'),
    detailText: t('Determined'),
    color: 'var(--el-color-danger)'
  },
  running: {
    text: t('Running'),
    detailText: t('Running'),
    color: 'var(--el-color-warning)'
  },
  ignore: {
    text: t('ignore'),
    detailText: t('ignore'),
    color: 'var(--el-color-gray)'
  },
  waiting: {
    text: t('waiting'),
    detailText: t('waiting'),
    color: 'var(--el-color-warning)'
  },
  cancel: {
    text: t('unknown'),
    detailText: t('unknown'),
    color: 'var(--el-color-gray)'
  },
}

export const SUB_TASK_TYPE_MAP = {
  approval: t('approval'),
  cmd: t('remoteCommand'),
  scp: t('syncFiles')
}

export const TASK_JOB_DETAIL_MODAL_CONFIG = {
  width: '900px',
  title: t('taskExecutionLog'),
  noDefaultFooter: true,
}

export const ITEM_TABLE_HEAD: Array<any> = [
  { prop: 'name', label: 'taskName', align: 'center', type: '', hidden: false },
  { prop: 'approver', label: 'approver', align: 'center', type: '', hidden: true },
  { prop: 'nodecount', label: 'NumberExecutionHosts', align: 'center', type: '', hidden: false },
  { prop: 'starttime', label: 'startAt', align: 'center', type: '', hidden: false },
  { prop: 'finishtime', label: 'finishAt', align: 'center', type: '', hidden: false },
  { prop: 'seftime', label: 'useTime', align: 'center', type: 'slot', hidden: false },
  { prop: 'status', label: 'status', align: 'center', type: 'slot', hidden: false },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot', hidden: false },
]

export const TASK_JOB_DETAIL_STEP_MAP_TEXT = {
  cmd: t('scriptJobTask'),
  approval: t('approvalJobTask'),
  scp: t('fileAssignment')
}

export const JOB_TASK_STATUS_BUTTON_GROUP = {
  // 脚本作业 cmd
  cmd: {
    success: [
      {
        type: 'cmd',
        text: t('executionDetails'),
        value: 'detail',
        status: 'success',
      },
      {
        type: 'cmd',
        status: 'success',
        text: t('executionConfirmation'),
        value: 'confirm',
      },
    ],

    decision: [
      {
        type: 'cmd',
        status: 'decision',
        text: t('executionDetails'),
        value: 'detail',
      },
      {
        type: 'cmd',
        status: 'decision',
        text: t('retry'),
        value: 'running',
      },
      {
        type: 'cmd',
        status: 'decision',
        text: t('ignoreError'),
        value: 'ignore',
      },
      {
        type: 'cmd',
        status: 'decision',
        text: t('terminateTask'),
        value: 'shutTask',
      },
    ],

    ignore: [
      {
        type: 'cmd',
        status: 'ignore',
        text: t('executionDetails'),
        value: 'detail',
      },
      {
        type: 'cmd',
        status: 'ignore',
        text: t('executionConfirmation'),
        value: 'confirm',
      },
    ],

    running: [
      {
        type: 'cmd',
        status: 'running',
        text: t('executionDetails'),
        value: 'detail',
      }
    ],

    fail: [
      {
        type: 'cmd',
        status: 'fail',
        text: t('executionDetails'),
        value: 'detail',
      },
      {
        type: 'cmd',
        status: 'fail',
        text: t('executionConfirmation'),
        value: 'confirm',
      },
    ],
  },
  // 审批作业 approval
  approval: {
    success: [
      {
        type: 'approval',
        status: 'success',
        text: t('executionDetails'),
        value: 'detail',

      },
      {
        type: 'approval',
        status: 'success',
        text: t('executionConfirmation'),
        value: 'confirm'
      },
    ],

    decision: [
      {
        type: 'approval',
        status: 'decision',
        text: t('executionDetails'),
        value: 'detail',
      },
      {
        type: 'approval',
        status: 'decision',
        text: t('retry'),
        value: 'running',
      },
      {
        type: 'approval',
        status: 'decision',
        text: t('ignoreError'),
        value: 'ignore',
      },
      {
        type: 'approval',
        status: 'decision',
        text: t('terminateTask'),
        value: 'shutTask',
      },
    ],

    ignore: [
      {
        type: 'approval',
        status: 'ignore',
        text: t('executionDetails'),
        value: 'detail',
      },
      {
        type: 'approval',
        status: 'ignore',
        text: t('executionConfirmation'),
        value: 'confirm',
      },
    ],

    running: [
      {
        type: 'approval',
        status: 'running',
        text: t('executionDetails'),
        value: 'detail',
      },
    ],

    fail: [
      {
        type: 'approval',
        status: 'fail',
        text: t('executionDetails'),
        value: 'detail',
      },
      {
        type: 'approval',
        status: 'fail',
        text: t('nextStep'),
        value: 'next',
      },
      {
        type: 'approval',
        status: 'fail',
        text: t('executionConfirmation'),
        value: 'confirm',
      }
    ],

    refuse: [
      {
        type: 'approval',
        status: 'refuse',
        text: t('executionDetails'),
        value: 'detail',
      },
    ],
  },
  // 文件作业  scp
  scp: {
    success: [
      {
        type: 'scp',
        status: 'success',
        text: t('executionDetails'),
        value: 'detail',
      },
      {
        type: 'scp',
        status: 'success',
        text: t('executionConfirmation'),
        value: 'confirm',
      }
    ],

    decision: [
      {
        type: 'scp',
        status: 'decision',
        text: t('executionDetails'),
        value: 'detail',
      },
      {
        type: 'scp',
        status: 'decision',
        text: t('retry'),
        value: 'running',
      },
      {
        type: 'scp',
        status: 'decision',
        text: t('ignoreError'),
        value: 'ignore',
      },
      {
        type: 'scp',
        status: 'decision',
        text: t('terminateTask'),
        value: 'shutTask',
      },
    ],

    ignore: [
      {
        type: 'scp',
        status: 'ignore',
        text: t('executionDetails'),
        value: 'detail',
      },
      {
        type: 'scp',
        status: 'ignore',
        text: t('executionConfirmation'),
        value: 'confirm',
      },
    ],

    running: [
      {
        type: 'scp',
        status: 'running',
        text: t('executionDetails'),
        value: 'detail'
      }
    ],

    fail: [
      {
        type: 'scp',
        status: 'fail',
        text: t('executionDetails'),
        value: 'detail',
      },
      {
        type: 'scp',
        status: 'fail',
        text: t('nextStep'),
        value: 'next',
      },
      {
        type: 'scp',
        status: 'fail',
        text: t('executionConfirmation'),
        value: 'confirm',
      }],
  }
}

export const SUB_TASK_OPERATE_MESSAGE_GROUP: { [propName: string]: { title: string, message: string, type: string, btnConfirm?: string } } = {

  confirm: {
    title: t('executionConfirmation'),
    message: t('executionConfirmMessage'),
    btnConfirm: `${t('config_options_confirm')},${t('continueExecute')}`,
    type: 'warning'
  },
  running: {
    title: t('retry'),
    message: t('retryMessage'),
    type: 'warning'
  },
  ignore: {
    title: t('ignore'),
    message: t('ignoreMessage'),
    type: 'warning'
  },
  shutTask: {
    title: t('termination'),
    message: t('terminationMessage'),
    type: 'warning'
  },
}

// 判断uuid的 charCodeAt
export const showRollback: (uuid: string) => string = (uuid: string): string => {
  let newUuid = uuid
  newUuid = newUuid.slice(newUuid.length - 1)
  if (newUuid.charCodeAt(0) > 64 && newUuid.charCodeAt(0) < 91) {
    return t('yes')
  } else {
    return ''
  }
}
// 筛选version
export const filterVersion: (regexp: RegExp, value: string) => string = (regexp: RegExp, value: string): string => {
  let releaseStr = ''
  if (regexp.test(value)) {
    let regStr = regexp.exec(value)[0]
    releaseStr = regStr.split(':')[1]
  }
  return releaseStr
}

// 获取 projectId
export const cprojectId: (value: string) => string = (value: string): string => {
  if (value) {
    let str = value.split('_')
    if (str[1] === 'ci' && str[0] === '' && str[3] === '') {
      return str[2]
    } else {
      return ''
    }
  } else {
    return value
  }
}

// 操作状态

export const operateStatus: (row: any, rollbackShow: boolean, rversion: string) => object = (row: any, rollbackShow: boolean, rversion: string): object => {
  return {
    release: {
      //终止任务
      killJob: row?.status === 'running',
      //紧急回滚
      emRollback: rollbackShow && row?.status === 'running' && rversion && !rollbackexpire(row.starttimems),
      //回滚
      rollback: rollbackShow && (row?.status === 'running' || row?.status === 'fail') && rversion && !rollbackexpire(row.starttimems),
      // 不回滚
      noRollback: rollbackShow && (row?.status === 'running' || row?.status === 'fail') && rversion && !rollbackexpire(row.starttimems),
      // 已过期不可回滚
      exNoRollback: rollbackShow && (row?.status === 'running' || row?.status === 'fail') && rversion && rollbackexpire(row.starttimems),
    },
    rollback: {

    }
  }
}

export const chuuid2deploy: (value: string) => string = (value: string): string => {
  let lastValue = value.slice(value.length - 1)
  if (lastValue.charCodeAt(0) > 64 && lastValue.charCodeAt(0) < 91) {
    return changeUuid(value)
  } else {
    return value
  }
}

// 改变uuid
export const changeUuid: (value: string) => string = (value: string): string => {
  var endValue: string = value.slice(value.length - 1)
  value = value.slice(0, value.length - 1)
  if (endValue.charCodeAt(0) > 64 && endValue.charCodeAt(0) < 91) {
    endValue = endValue.toLowerCase()
  } else if (endValue.charCodeAt(0) > 96 && endValue.charCodeAt(0) < 123) {
    endValue = endValue.toUpperCase()
  }
  const newValue = value + endValue
  return newValue
}

// 计算时间差值
export const rollbackexpire: (starttime: string) => number = (starttime: string): number => {
  let newDate = new Date()
  let sec = (newDate.getTime() - Number(starttime) * 1000) / 1000;
  if (sec > 604800) {
    return 1
  }
  else {
    return 0
  }
}
