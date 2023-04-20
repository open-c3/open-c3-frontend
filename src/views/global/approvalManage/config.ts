import { t } from '@/utils/language'
export const SEARCH_CONFIG = Object.freeze({
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
      prop: 'create_time',
      type: 'text',
      placeholder: 'creatorTime'
    },
    {
      label: '',
      prop: 'submitter',
      type: 'text',
      placeholder: 'submitter'
    },
    {
      label: '',
      prop: 'user',
      type: 'text',
      placeholder: 'approver'
    },
    {
      label: '',
      prop: 'assist',
      type: 'text',
      placeholder: 'assistantOperator'
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
// 表头
export const THEAD_CONFIG = Object.freeze([
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'create_time', label: 'creatorTime', align: 'center' },
  { prop: 'submitter', label: 'submitter', align: 'center' },
  { prop: 'user', label: 'approver', align: 'center' },
  { prop: 'assist', label: 'assistantOperator', align: 'center' },
  { prop: 'name', label: 'approvalName', align: 'center' },
  { prop: 'oauuid', label: 'OACaseID', type: 'slot', width: 190 },
  { prop: 'opinion', label: 'notifyStatus', type: 'slot', width: 130 },
  { prop: 'approvalStatus', label: 'approvalStatus', type: 'slot', align: 'center' },
  { prop: 'operate', label: 'operate', type: 'slot', align: 'center' }
])

// 日志
export const OA_LOG_CONFIG = {
  width: '700px',
  title: 'oaLogTitle',
  noDefaultFooter: true,
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 100,
    config: [
      {
        label: 'createLogTime',
        prop: 'createLogTime',
        type: 'desc',
        span: 24,
        class: 'w400'
      },
      {
        label: 'createLog',
        prop: 'createLog',
        type: 'desc',
        span: 24,
        class: 'w400'
      },
      {
        label: 'queryLogTime',
        prop: 'queryLogTime',
        type: 'desc',
        span: 24,
        class: 'w400'
      },
      {
        label: 'queryLog',
        prop: 'queryLog',
        type: 'desc',
        span: 24,
        class: 'w400'
      },
      {
        label: 'syncLogTime',
        prop: 'syncLogTime',
        type: 'desc',
        span: 24,
        class: 'w400'
      },
      {
        label: 'syncLog',
        prop: 'syncLog',
        type: 'desc',
        span: 24,
        class: 'w400'
      }
    ]
  }
}

// 审批操作表头
export const EDIT_THEAD_CONFIG = Object.freeze([
  { prop: 'user', label: 'approver', align: 'center' },
  { prop: 'create_time', label: 'useTime', align: 'center', type: 'slot' },
  { prop: 'oauuid', label: 'OACaseID', align: 'center'  },
  { prop: 'opinion', label: 'notifyStatus', type: 'slot', align: 'center'  },
  { prop: 'approvalStatus', label: 'approvalStatus', type: 'slot', align: 'center'  }
])

export const EDIT_CONFIG = Object.freeze({
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 100,
    config: [
      {
        label: 'creatorTime',
        prop: 'create_time',
        type: 'desc',
        span: 24
      },
      {
        label: 'approvalName',
        prop: 'name',
        type: 'desc',
        span: 24
      },
      {
        label: 'submitter',
        prop: 'submitter',
        type: 'desc',
        span: 24
      },
      {
        label: 'approvalContent',
        prop: 'cont',
        type: 'textarea',
        span: 24,
        disabled: true,
        class: 'w650'
      }
    ]
  }
})