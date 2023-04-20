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
      prop: 'user',
      type: 'text',
      placeholder: 'user'
    },
    {
      label: '',
      prop: 'edit_user',
      type: 'text',
      placeholder: 'operator'
    },
    {
      label: '',
      prop: 'edit_time',
      type: 'text',
      placeholder: 'time'
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
  { prop: 'user', label: 'user', align: 'center' },
  { prop: 'edit_user', label: 'operator', align: 'center' },
  { prop: 'edit_time', label: 'time', align: 'center' },
  { prop: 'operate', type: 'slot', label: 'operate', align: 'center' }
])

// 添加用户
export const ADD_USER_CONFIG = Object.freeze({
  width: '700px',
  title: 'addUser',
  noDefaultFooter: false,
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 120,
    config: [
      {
        label: 'user',
        prop: 'user',
        type: 'text',
        span: 24,
        class: 'w300',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }
    ]
  }
})