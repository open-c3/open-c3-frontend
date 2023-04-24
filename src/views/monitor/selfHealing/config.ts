import { t } from '@/utils/language'
// 已执行的自愈任务
export const TASK_THEAD_CONFIG = Object.freeze([
  { prop: 'time', label: 'startAt', align: 'center', width: 160 },
  { prop: 'instance', label: 'instance' },
  { prop: 'alertname', label: 'alarmName' },
  { prop: 'jobname', label: 'JobName' },
  { prop: 'taskstat', label: 'taskStatus', align: 'center', type: 'slot' },
  { prop: 'healingstat', label: 'selfHealingState', align: 'center', type: 'slot', width: 100},
  { prop: 'operate', type: 'slot', label: 'operate', align: 'center', width: 140 }
])
// 自愈套餐配置
export const THEAD_CONFIG = Object.freeze([
  { prop: 'id', label: 'id', align: 'center', width: 100 },
  { prop: 'name', label: 'selfHealingName'},
  { prop: 'altername', label: 'alarmName'},
  { prop: 'jobname', label: 'JobName' },
  { prop: 'eips', label: 'affectIP', align: 'center' },
  { prop: 'edit_user', label: 'editor', align: 'center' },
  { prop: 'edit_time', label: 'editTime', align: 'center', width: 160 },
  { prop: 'operate', type: 'slot', label: 'operate', align: 'center', width: 140 }
])
// 添加自愈套餐
export const ADD_CONFIG = {
  width: '700px',
  title: 'addSelfHealing',
  form: {
    position: 'right',
    gutter: 24,
    labelWidth: 130,
    config: [
      {
        label: 'selfHealingName',
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
        label: 'alarmName',
        prop: 'altername',
        type: 'slot',
        placeholder: 'alarmName',
        span: 24,
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('config.validate.required') }
        ]
      }, {
        label: 'JobName',
        prop: 'jobname',
        type: 'select',
        span: 18,
        class: 'w450',
        data: [],
        name: 'name',
        value: 'uuid',
        filterable: true,
        rules: [
          { required: true, trigger: 'blur', message: t('config.validate.required') }
        ]
      }, {
        label: '',
        prop: 'btn',
        type: 'slot',
        span: 6
      }, {
        label: 'affectIP',
        prop: 'eips',
        type: 'text',
        placeholder: 'affectIPPlaceholder',
        span: 24,
        class: 'w450'
      }
    ]
  }
}

