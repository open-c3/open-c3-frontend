import { t } from '@/utils/language'
export const THEAD_CONFIG = Object.freeze([
  { prop: 'create_time', label: 'creatorTime', align: 'center' },
  { prop: 'finishtime', label: 'finishAt', align: 'center' },
  { prop: 'useTime', label: 'useTime', align: 'center' },
  { prop: 'submitter', label: 'submitter', align: 'center' },
  { prop: 'name', label: 'approvalName', align: 'center' },
  { prop: 'oauuid', label: 'OACaseID', align: 'center' },
  { prop: 'notifystatus', label: 'notifyStatus', align: 'center' },
  { prop: 'opinion', label: 'approvalStatus', align: 'center', type: 'slot' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])

export const SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'create_time',
      type: 'text',
      placeholder: 'creatorTime'
    },
    {
      label: '',
      prop: 'finishtime',
      type: 'text',
      placeholder: 'finishAt'
    },
    
    {
      label: '',
      prop: 'submitter',
      type: 'text',
      placeholder: 'submitter'
    },
    {
      label: '',
      prop: 'name',
      type: 'text',
      placeholder: 'approvalName'
    },
    {
      label: '',
      prop: 'oauuid',
      type: 'text',
      placeholder: 'OACaseID'
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

// 审批状态
export const NOTIFY_STATUS_CONFIG = Object.freeze({
  'null': t('notSentYet'),
  'sending': t('sending'),
  'done': t('done'),
  'skip': t('ignore'),
  'fail': t('Fail')
})

// 审批操作
export const EDIT_CONFIG = {
  width: '700px',
  title: 'editApprovalTitle',
  titleParams: {
    name: ''
  },
  noDefaultFooter: true,
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 100,
    config: [
      {
        label: 'approver',
        prop: 'user',
        type: 'desc',
        span: 12
      },
      {
        label: 'useTime',
        prop: 'useTime',
        type: 'desc',
        span: 12
      },
      {
        label: 'OACaseID',
        prop: 'oauuid',
        type: 'desc',
        span: 12
      },
      {
        label: 'notifyStatus',
        prop: 'notifystatus',
        type: 'desc',
        span: 12
      },
      {
        label: 'approvalStatus',
        prop: 'opinion',
        type: 'slot',
        span: 12
      },
      {
        label: 'creatorTime',
        prop: 'create_time',
        type: 'desc',
        span: 12
      },
      {
        label: 'submitter',
        prop: 'submitter',
        type: 'desc',
        span: 12
      },
      {
        label: 'approvalName',
        prop: 'name',
        type: 'desc',
        span: 24
      },
      {
        label: 'approvalContent',
        prop: 'cont',
        type: 'desc',
        span: 24
      }
    ]
  }
}
