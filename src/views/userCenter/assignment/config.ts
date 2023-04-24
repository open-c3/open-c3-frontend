import { t } from '@/utils/language'


export const THEAD_BY_ME_CONFIG = [
  { prop: 'create_time', label: 'creatorTime', align: 'center' },
  { prop: 'finish_time', label: 'finishAt', align: 'center' },
  { prop: 'seftime', label: 'useTime', align: 'center', type: 'slot' },
  { prop: 'handler', label: 'handler', align: 'center' },
  { prop: 'name', label: 'approvalName', align: 'center' },
  { prop: 'status', label: 'status', align: 'center', type: 'slot' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
]

export const THEAD_TO_ME_CONFIG = [
  { prop: 'create_time', label: 'creatorTime', align: 'center' },
  { prop: 'finish_time', label: 'finishAt', align: 'center' },
  { prop: 'seftime', label: 'useTime', align: 'center', type: 'slot' },
  { prop: 'submitter', label: 'submitter', align: 'center' },
  { prop: 'name', label: 'approvalName', align: 'center' },
  { prop: 'status', label: 'status', align: 'center', type: 'slot' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
]

export const SEARCH_BY_ME_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'create_time',
      type: 'text',
      placeholder: `${t('configFormInput')}${t('creatorTime')}`
    },
    {
      label: '',
      prop: 'finish_time',
      type: 'text',
      placeholder: `${t('configFormInput')}${t('finishAt')}`
    },
    {
      label: '',
      prop: 'handler',
      type: 'text',
      placeholder: `${t('configFormInput')}${t('handler')}`
    },
    {
      label: '',
      prop: 'name',
      type: 'text',
      placeholder: `${t('configFormInput')}${t('approvalName')}`
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
})

export const SEARCH_TO_ME_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'create_time',
      type: 'text',
      placeholder: `${t('configFormInput')}${t('creatorTime')}`
    },
    {
      label: '',
      prop: 'finish_time',
      type: 'text',
      placeholder: `${t('configFormInput')}${t('finishAt')}`
    },
    {
      label: '',
      prop: 'submitter',
      type: 'text',
      placeholder: `${t('configFormInput')}${t('submitter')}`
    },
    {
      label: '',
      prop: 'name',
      type: 'text',
      placeholder: `${t('configFormInput')}${t('approvalName')}`
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
})

export const TABS_CONFIG: { label: string, name: string }[] = [
  {
    label: 'myselfRequestHelp',
    name: 'byme'
  },
  {
    label: 'needMyselfHelp',
    name: 'tome'
  }
]

// 状态
export const ASSIGNMENT_STATUS_MAP = {
  todo: {
    text: t('upcoming'),
    color: 'var(--el-color-gray)',
  },
  fail: {
    text: t('operationFailed'),
    color: 'var(--el-color-danger)',
  },
  success: {
    text: t('completed'),
    color: 'var(--el-color-success)',
  },
  refuse: {
    text: t('rejected'),
    color: 'var(--el-color-danger)',
  },
  cancel: {
    text: t('cancelled'),
    color: 'var(--el-color-warning)',
  },
  close: {
    text: t('close'),
    color: 'var(--el-color-gery)',
  }
}

export const ASSIGNMENT_DIALOG_CONFIG = {
  width: '700px',
  title: t('detail'),
  noDefaultFooter: true,
  form: {}
}

export const ASSIGNMENT_OPERATE_DIALOG = {
  submit: {
    title: t('submitAssistance'),
    description: t('submitAssistanceMessage')
  },
  retry: {
    title: t('retry'),
    description: t('retryAssistanceMessage')
  },
  refuse: {
    title: t('refuseAssistance'),
    description: t('refuseAssistanceMessage')
  },
  close: {
    title: t('closeAssistance'),
    description: t('closeAssistanceMessage')
  },
  cancel: {
    title: t('cancelAssistance'),
    description: t('cancelAssistanceMessage')
  },
}

export const ASSIGNMENT_DETAIL_OPERATE_DIALOG = {
  submit: {
    title: t('submitAnswer'),
    description: t('submitAnswerMessage')
  },
  refuse: {
    title: t('refuseAnswer'),
    description: t('refuseAnswerMessage')
  }
}