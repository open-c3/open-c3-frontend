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
      placeholder: 'user'
    },
    {
      label: '',
      prop: 'email',
      type: 'text',
      placeholder: 'emailAddress'
    },
    {
      label: '',
      prop: 'phone',
      type: 'text',
      placeholder: 'phoneNumber'
    },
    {
      label: '',
      prop: 'voicemail',
      type: 'text',
      placeholder: 'voiceMailbox'
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
  { prop: 'email', label: 'emailAddress', align: 'center' },
  { prop: 'phone', label: 'phoneNumber', align: 'center' },
  { prop: 'voicemail', label: 'voiceMailbox', align: 'center' },
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
// 添加通信地址
export const ADD_CONFIG = Object.freeze({
  width: '700px',
  title: 'addUserAddress',
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
          { required: true, trigger: 'blur', message: t('requiredText') },
          { validator: validateUser}
        ]
      },
      {
        label: 'emailAddress',
        prop: 'email',
        type: 'text',
        span: 24,
        class: 'w300',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') },
          { validator: validateEmail }
        ]
      },
      {
        label: 'phoneNumber',
        prop: 'phone',
        type: 'text',
        span: 24,
        class: 'w300',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'voiceMailbox',
        prop: 'voicemail',
        type: 'text',
        span: 24,
        class: 'w300'
      }
    ]
  }
})
