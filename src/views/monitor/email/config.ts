import { t } from '@/utils/language'
export const EMAIL_THEAD = Object.freeze([
  { prop: 'id', label: 'id', align: 'center' },
  { prop: 'name', label: 'name', align: 'center' },
  { prop: 'description', label: 'describe', align: 'center' },
  { prop: 'edit_user', label: 'editor', align: 'center' },
  { prop: 'edit_time', label: 'editTime', align: 'center' },
  { prop: 'operate', type: 'slot', label: 'operate', align: 'center', width: 220 }
])
// 邮件历史
export const HISTORY_THEAD = [
  { prop: 'id', label: 'id', align: 'center' },
  { prop: 'account', label: 'account', align: 'center' },
  { prop: 'date', label: 'date', align: 'center' },
  { prop: 'from', label: 'from', align: 'center' },
  { prop: 'to', label: 'to', align: 'center' },
  { prop: 'severity', label: 'level', align: 'center' },
  { prop: 'subject', label: 'title', align: 'center' },
  { prop: 'content', label: 'content', align: 'center' },
  { prop: 'create_time', label: 'C3TTime', align: 'center' }
]
// 增加值班告警组
export const ADD_CONFIG = Object.freeze({
  width: '700px',
  title: 'addTitle',
  form: {
    position: 'right',
    gutter: 20,
    width: 100,
    config: [
      {
        label: 'name',
        prop: 'name',
        type: 'text',
        placeholder: 'name',
        span: 24,
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
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
