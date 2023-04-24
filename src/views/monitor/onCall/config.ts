import { t } from '@/utils/language'
export const THEAD_CONFIG = Object.freeze([
  { prop: 'id', label: 'id', align: 'center' },
  { prop: 'name', label: 'name', align: 'center' },
  { prop: 'description', label: 'describe', align: 'center' },
  { prop: 'edit_user', label: 'editor', align: 'center' },
  { prop: 'edit_time', label: 'editTime', align: 'center' },
  { prop: 'operate', type: 'slot', label: 'operate', align: 'center', width: 220 }
])
// 增加值班告警组
export const ADD_GROUP_CONFIG = Object.freeze({
  width: '700px',
  title: 'addOnCall',
  form: {
    position: 'right',
    gutter: 24,
    labelWidth: 100,
    config: [
      {
        label: 'name',
        prop: 'name',
        type: 'text',
        placeholder: 'name',
        span: 24,
        disabled: false,
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('config.validate.required') }
        ]
      }, {
        label: 'describe',
        prop: 'description',
        type: 'text',
        placeholder: 'describe',
        span: 24,
        class: 'w450'
      }, {
        label: '',
        prop: 'config',
        type: 'slot',
        span: 24,
        class: 'w450'
      }
    ]
  }
})

// 增加值班日历
export const ADD_CALENDAR_CONFIG = {
  width: '950px',
  title: 'dutyDay',
  noDefaultFooter: true,
  form: {
    position: 'right',
    gutter: 24,
    width: 100,
    config: [
      {
        label: 'name',
        prop: 'name',
        type: 'text',
        disabled: true,
        placeholder: 'name',
        span: 24,
        class: 'w450'
      }, {
        label: 'describe',
        prop: 'description',
        type: 'text',
        disabled: true,
        placeholder: 'describe',
        span: 24,
        class: 'w450'
      }, {
        label: 'user',
        prop: 'username',
        type: 'select',
        data: [],
        span: 24,
        class: 'w450'
      }, {
        label: '',
        prop: 'config',
        type: 'slot',
        span: 24,
        class: 'w450'
      }
    ]
  }
}

// 值班表
export const DUTY_SCHEDULE_CONFIG = Object.freeze({
  width: '900px',
  title: 'onCallTable',
  noDefaultFooter: true,
  form: {
    position: 'right',
    gutter: 24,
    width: 80,
    config: [
      {
        label: 'name',
        prop: 'name',
        type: 'text',
        placeholder: 'name',
        span: 24,
        disabled: true,
        class: 'w450'
      }, {
        label: 'describe',
        prop: 'description',
        type: 'text',
        placeholder: 'describe',
        span: 24,
        disabled: true,
        class: 'w450'
      }, {
        label: '',
        prop: 'config',
        type: 'slot',
        span: 24,
        class: 'w450'
      }
    ]
  }
})
