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

export const JOBX_LIST_SEARCH_CONFIG = {
  labelWidth: 0,
  formConfig: [
    {
      label: 'taskName',
      prop: 'name',
      type: 'text',
      placeholder: 'jobxTaskName'
    },
    {
      label: 'creator',
      prop: 'user',
      type: 'slot',
      placeholder: 'creatorFullName'
    },
    {
      label: 'jobxTaskStatus',
      prop: 'status',
      type: 'select',
      data: TASK_STATUS_OPTION,
      placeholder: 'jobxTaskStatusPlaceholder'
    },
    {
      label: '创建时间',
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
    {
      label: 'taskUUId',
      prop: 'taskuuid',
      type: 'text',
      placeholder: 'taskUUId'
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

export const JOBX_LIST_TABLE_CONFIG: Array<any> = [
  // 任务名称
  { prop: 'name', label: 'taskName', align: 'center' },
  // 关联流水线   ciinfo
  { prop: 'ciinfo', label: 'associatedFlow', align: 'center', type: 'slot' },
  // 是回滚流程
  { prop: 'showRollback', label: 'isARollback', align: 'center' },
  // 创建人
  { prop: 'user', label: 'creator', align: 'center' },
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
  // uuid
  { prop: 'uuid', label: 'uuid', align: 'center' },
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

// 子任务状态 
export const SUB_TASK_GROUP_STATUS: { [propName: string]: string } = {
  null: 'var(--el-color-gray)',
  success: 'var(--el-color-success)',
  fail: 'var(--el-color-danger)',
  refuse: 'var(--el-color-danger)',
  running: 'var(--el-color-warning)',
  decision: 'var(--el-color-warning)',
  ignore: 'var(--el-color-danger)',
}

// 子任务操作 
export const SUB_TASK_OPERATE_GROUP: Array<{ value: string, text: string }> = [
  // {
  //   value: 'refresh',
  //   text: 'refresh',
  // },
  {
    text: t('executionConfirmation'),
    value: 'confirm',
  },
  {
    value: 'retry',
    text: t('retry')
  },
  {
    value: 'ignore',
    text: t('ignore'),
  },
  {
    text: t('termination'),
    value: 'termination'
  }
]

// 子任务消息提示 
export const SUB_TASK_OPERATE_MESSAGE_GROUP: { [propName: string]: { title: string, message: string, type: string, btnConfirm?: string } } = {
  // refresh: {
  //   title: '',
  //   message: '',
  //   type: 'warning'
  // },
  confirm: {
    title: t('executionConfirmation'),
    message: t('executionConfirmMessage'),
    btnConfirm: `${t('config_options_confirm')},${t('continueExecute')}`,
    type: 'warning'
  },
  retry: {
    title: t('retry'),
    message: t('retryMessage'),
    type: 'warning'
  },
  ignore: {
    title: t('ignore'),
    message: t('ignoreMessage'),
    type: 'warning'
  },
  termination: {
    title: t('termination'),
    message: t('terminationMessage'),
    type: 'warning'
  },
}

// 子任务 分组信息
export const SUB_TASK_OPERATE_SPAN_INFO_GROUP: { text: string, value: string, type: string }[] = [
  {
    text: t('firstBatchOnly'),
    value: 'firsttime',
    type: 'batches',
  },
  {
    text: t('lastBatchOnly'),
    value: 'thelasttime',
    type: 'batches',
  },
  {
    text: t('notFirstBatch'),
    value: 'notfirsttime',
    type: 'batches',
  },
  {
    text: t('notLastBatch'),
    value: 'notthelasttime',
    type: 'batches',
  },
  {
    text: t('testEnvOnly'),
    value: 'test',
    type: 'deployenv',
  },
  {
    text: t('onlineEnvOnly'),
    value: 'online',
    type: 'deployenv',
  },
  {
    text: t('deployOnly'),
    value: 'deploy',
    type: 'action',
  },
  {
    text: t('rollbackOnly'),
    value: 'rollback',
    type: 'action',
  }, {
    text: t('viewEcsStatus'),
    value: 'views',
    type: 'click-button'
  }
]

export const SUB_TASK_TYPE_MAP = {
  approval: t('approval'),
  cmd: t('remoteCommand'),
  scp: t('syncFiles')
}
export const ECS_DESCRIBE_THEAD = [
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'status', label: 'status', align: 'center' },
  { prop: 'desiredCount', label: 'DesiredCount', width:120, align: 'center' },
  { prop: 'pendingCount', label: 'PendingCount', width:120, align: 'center' },
  { prop: 'runningCount', label: 'RunningCount', width:120, align: 'center' },
  { prop: 'createdAt', label: 'CreatedAt', width:120, align: 'center' },
  { prop: 'updatedAt', label: 'UpdatedAt',width:120, align: 'center' },
  { prop: 'taskDefinition', label: 'TaskDefinition',width:120, align: 'center' },
]

export const TASK_JOB_DETAIL_MODAL_CONFIG = {
  width: '800px',
  title: t('taskExecutionLog'),
  noDefaultFooter: true,
}

export const TASK_AWS_ECS_MODAL_CONFIG = {
  width: '1100px',
  title: 'AWS ECS',
  noDefaultFooter: true,
}

export const DESCRIBE_MODAL_CONFIG = {
  width: '1100px',
  title: t('information'),
  form: {}
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
