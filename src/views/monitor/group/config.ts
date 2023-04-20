import { t } from '@/utils/language'
export const THEAD_CONFIG = Object.freeze([
  { prop: 'id', label: 'id', align: 'center' },
  { prop: 'name', label: 'name', align: 'center' },
  { prop: 'description', label: 'describe', align: 'center' },
  { prop: 'edit_user', label: 'editor', align: 'center' },
  { prop: 'edit_time', label: 'editTime', align: 'center' },
  { prop: 'operate', type: 'slot', label: 'operate', align: 'center', width: 220 }
])
// 增加告警接收组
export const ADD_GROUP_CONFIG = Object.freeze({
  width: '700px',
  title: 'addAlarmReceivingGroup',
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 100,
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
        type: 'textarea',
        placeholder: 'describe',
        span: 24,
        class: 'w450'
      }
    ]
  }
})

// 编辑监控报警组成员
export const ADD_USER_CONFIG = Object.freeze({
  width: '700px',
  title: 'editMonAlarmGroupMembers',
  noDefaultFooter: true
})
