import { t } from '@/utils/language'

export const LIGHT_APPLICATION_TABLE_THEAD = Object.freeze([
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'projectid', label: `${t('tree')}ID`, align: 'center', hidden: true },
  { type: 'slot', prop: 'treeid', label: 'visibility', align: 'center', hidden: true },
  { prop: 'type', label: 'type', align: 'center' },
  { prop: 'title', label: 'name', align: 'center', hidden: true },
  { prop: 'jobname', label: 'JobName', align: 'center', hidden: true },
  { prop: 'describe', label: 'describe', align: 'center' },
  { prop: 'create_user', label: 'creator', align: 'center' },
  { prop: 'edit_user', label: 'lastEditor', align: 'center' },
  { prop: 'create_time', label: 'creatorTime', align: 'center' },
  { prop: 'edit_time', label: 'lastUpdateTime', align: 'center' },
  { type: 'slot', prop: 'operate', label: 'operate', align: 'center' },
])

export const LIGHT_APPLICATION_SEARCH_CONFIG = Object.freeze({
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
      prop: 'type',
      type: 'text',
      placeholder: 'type'
    },
    {
      label: '',
      prop: 'title',
      type: 'text',
      placeholder: 'title'
    },
    {
      label: '',
      prop: 'describe',
      type: 'text',
      placeholder: 'describe'
    },
    {
      label: '',
      prop: 'create_user',
      type: 'text',
      placeholder: 'creator'
    },
    {
      label: '',
      prop: 'edit_user',
      type: 'text',
      placeholder: 'editor'
    },
    {
      label: '',
      prop: 'create_time',
      type: 'text',
      placeholder: 'creatorTime'
    },
    {
      label: '',
      prop: 'edit_time',
      type: 'text',
      placeholder: 'lastUpdateTime'
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

export const GLOBAL_LIGHT_APPLICATION_SEARCH_CONFIG = Object.freeze({
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
      prop: 'type',
      type: 'text',
      placeholder: 'type'
    },
    {
      label: '',
      type: 'text',
      placeholder: `${t('tree')}ID`,
      prop: 'projectid',
    },
    {
      label: '',
      type: 'text',
      placeholder: 'JobName',
      prop: 'jobname',
    },
    {
      label: '',
      prop: 'title',
      type: 'text',
      placeholder: 'title'
    },
    {
      label: '',
      prop: 'describe',
      type: 'text',
      placeholder: 'describe'
    },
    {
      label: '',
      prop: 'create_user',
      type: 'text',
      placeholder: 'creator'
    },
    {
      label: '',
      prop: 'edit_user',
      type: 'text',
      placeholder: 'editor'
    },
    {
      label: '',
      prop: 'create_time',
      type: 'text',
      placeholder: 'creatorTime'
    },
    {
      label: '',
      prop: 'edit_time',
      type: 'text',
      placeholder: 'lastUpdateTime'
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


export const LIGHT_APPLICATION_MODAL_CONFIG = Object.freeze({
  title: 'selectServer',
  width: '700px',
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 150,
    config: [
      {
        label: 'task',
        prop: 'token',
        type: 'text',
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') },
        ],
        span: 24
      },
      {
        label: 'describe',
        prop: 'describe',
        type: 'text',
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: 'uploadCallJob',
        prop: 'isjob',
        type: 'switch',
        span: 24
      },
      {
        label: 'commonJobName',
        prop: 'jobname',
        type: 'select',
        class: 'w450',
        hidden: true,
        data: [],
        rules: [
          { required: true, trigger: 'change', message: t('requiredText') }
        ],
        span: 24
      }
    ]
  }
})