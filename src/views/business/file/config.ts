import { t } from '@/utils/language'
export const SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: 'fileName',
      prop: 'name',
      type: 'text',
      placeholder: 'fileKeyword'
    },
    {
      label: 'creator',
      prop: 'create_user',
      type: 'slot',
      placeholder: 'creatorFullName'
    },
    {
      label: '',
      prop: 'create_time_start',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
      placeholder: 'createStartAt'
    },
    {
      label: '',
      prop: 'create_time_end',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
      placeholder: 'createFinishAt'
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
  { prop: 'name', label: 'fileName', align: 'center' },
  { prop: 'create_user', label: 'creator', align: 'center' },
  { prop: 'create_time', label: 'creatorTime', align: 'center' },
  { prop: 'size', label: 'size', align: 'center', type: 'slot' },
  { prop: 'edit_user', label: 'editUser', align: 'center' },
  { prop: 'edit_time', label: 'modifiedTime', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])

// 大支持10个字符，只支持汉字、英文、数字
export const checkToken = (rule, value, callback) => {
  const reg = /^[a-zA-Z0-9]{32}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error(t('checkToken')))
  }
}

// token管理
export const TOKEN_CONFIG = {
  width: '1000px',
  title: 'tokenManage',
  noDefaultFooter: true,
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 150,
    config: [
      {
        label: 'token',
        prop: 'token',
        type: 'text',
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') },
          { validator: checkToken }
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
}

export const TOKEN_THEAD_CONFIG = Object.freeze([
  { prop: 'token', label: 'token', align: 'center' },
  { prop: 'create_user', label: 'creator', align: 'center' },
  { prop: 'create_time', label: 'creatorTime', align: 'center' },
  { prop: 'describe', label: 'describe', align: 'center' },
  { prop: 'jobname', label: 'callJobAfterSuccess', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])
