import { t } from '@/utils/language'
export const SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'id',
      type: 'text',
      placeholder: 'id'
    },
    {
      label: '',
      prop: 'user',
      type: 'text',
      placeholder: 'user'
    },
    {
      label: '',
      prop: 'department',
      type: 'text',
      placeholder: 'departmentTitle'
    },
    {
      label: '',
      prop: 'edit_user',
      type: 'text',
      placeholder: 'lastEditor'
    },
    {
      label: '',
      prop: 'edit_time',
      type: 'text',
      placeholder: 'updateTime'
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
  { prop: 'department', label: 'departmentTitle', align: 'center' },
  { prop: 'edit_user', label: 'lastEditor', align: 'center' },
  { prop: 'edit_time', label: 'updateTime', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])
export const validateUser = (rule: any, value: any, callback: any) => {
  const reg = /^[a-zA-Z0-9\.\@_\-]+$/
  if (!value) {
    callback(new Error(t('requiredText')))
  } else if (reg.test(value)) {
    callback()
  } else {
    callback(new Error(t('validErrorFormat')))
  }
}
export const ADD_CONFIG = Object.freeze({
  width: '700px',
  title: 'bindUserDepartment',
  noDefaultFooter: false,
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 100,
    config: [
      {
        label: 'user',
        prop: 'user',
        type: 'text',
        span: 24,
        class: 'w400',
        placeholder: 'userDepartmentPlaceholder',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'departmentTitle',
        prop: 'department',
        type: 'text',
        span: 24,
        class: 'w400',
        placeholder: 'departmentPlaceholder',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') },
          { validator: validateUser}
        ]
      }
    ]
  }
})