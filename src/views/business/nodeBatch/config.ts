import { t } from '@/utils/language'
// 表头
export const THEAD_CONFIG = Object.freeze([
  { prop: 'name', label: 'groupName', align: 'center' },
  { prop: 'ciInfo', label: 'associatedFlow', align: 'center', type: 'slot' },
  { prop: 'edit_time', label: 'creatorTime', align: 'center' },
  { prop: 'group_type', label: 'groupType', align: 'center' },
  { prop: 'note', label: 'remark', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])

// 新建分组
export const ADD_NODE_BATCH_CONFIG = {
  position: 'right',
  gutter: 20,
  labelWidth: 140,
  config: [
    {
      label: 'groupName',
      prop: 'name',
      type: 'text',
      rules: [
        { required: true, trigger: 'blur', message: t('requiredText') },
        { min: 2, message: t('characters2') }
      ],
      class: 'w500',
      span: 24
    },
    {
      label: 'remark',
      prop: 'note',
      type: 'textarea',
      class: 'w500',
      rules: [
        { required: true, trigger: 'blur', message: t('requiredText') }
      ],
      span: 24
    },
    {
      label: 'groupType',
      prop: 'group_type',
      type: 'radio',
      data: [
        { name: t('nodeList'), id: 'list'},
        { name: t('percent'), id: 'percent'},
      ],
      span: 24
    },
    {
      label: 'SelectiveMachine',
      prop: 'btn',
      type: 'slot',
      class: 'w500',
      hidden: true,
      span: 24
    },
    {
      label: 'matchineIP',
      prop: 'node',
      type: 'slot',
      rules: [
        { required: true, trigger: 'blur', message: t('requiredText') }
      ],
      class: 'w500',
      hidden: true,
      span: 24
    },
    {
      label: 'ProportionalInput',
      prop: 'percent',
      type: 'slot',
      rules: [
        { required: true, trigger: 'blur', message: t('requiredText') }
      ],
      class: 'w500',
      hidden: true,
      span: 24
    },
    {
      label: 'serverInformation',
      prop: 'list',
      type: 'slot',
      class: 'w500',
      hidden: true,
      span: 24
    },
  ]
}

export const PERCENT_THEAD_CONFIG = Object.freeze([
  { prop: 'name', label: 'hostname', align: 'center' },
  { prop: 'type', label: 'type', align: 'center' }
])

// 选择服务器
export const CHOICE_SERVER_CONFIG = Object.freeze({
  title: 'selectServer',
  width: '960px',
  ip: [
    { type: 'slotTable', prop: 'multiple' },
    { prop: 'name', label: 'hostname', align: 'center' },
    { prop: 'type', label: 'type', align: 'center' },
    { prop: 'inip', label: 'privateIP', align: 'center' },
    { prop: 'exip', label: 'internetIP', align: 'center' },
    { prop: 'clientVersion', label: 'clientVersion', align: 'center' },
    { prop: 'clientLastDetectionTime', label: 'clientLastDetectionTime', align: 'center' },
    { prop: 'clientErrorReason', label: 'clientErrorReason', align: 'center' }
  ],
  group: [
    { prop: 'id', label: '', align: 'center'},
    { prop: 'name', label: 'hostname', align: 'center' },
    { prop: 'plugin', label: 'plugIn', align: 'center' },
  ]
})

// 机器列表配置
export const MACHINE_LIST_CONFIG = Object.freeze({
  width: '800px',
  title: 'groupMachineList'
})
