import { t } from '@/utils/language'
import { validateEmail } from '@/utils/validate'
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
      placeholder: 'name'
    },
    {
      label: '',
      prop: 'voicemail',
      type: 'text',
      placeholder: 'type'
    },
    {
      label: '',
      prop: 'email',
      type: 'text',
      placeholder: 'describe'
    },
    {
      label: '',
      prop: 'phone',
      type: 'text',
      placeholder: 'editTime'
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
  { prop: 'id', label: 'ID', align: 'center', width: 75 },
  { prop: 'name', label: 'name' },
  { prop: 'type', label: 'type' },
  { prop: 'describe', label: 'describe' },
  { prop: 'edit_time', label: 'editTime', align: 'center', width: 160 },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot', width: 100 }
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
// 添加云监控
export const ADD_CONFIG = {
  width: '700px',
  title: 'addUserAddress',
  noDefaultFooter: false,
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 100,
    config: [
      {
        label: 'name',
        prop: 'name',
        type: 'text',
        span: 24,
        class: 'w400',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
          // { validator: validateUser}
        ]
      },
      {
        label: 'type',
        prop: 'type',
        type: 'select',
        span: 24,
        class: 'w400',
        data: [],
        value: 'value', // value 对应的参数值 默认为 id
        name: 'name',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
          // { validator: validateEmail }
        ]
      },
      {
        label: 'describe',
        prop: 'describe',
        type: 'text',
        span: 24,
        class: 'w400',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'config',
        prop: 'config',
        type: 'textarea',
        span: 24,
        class: 'w400',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      }
    ]
  }
}
