import { t } from '@/utils/language'
export const SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'name',
      type: 'text',
      placeholder: 'groupName'
    },
    {
      label: '',
      prop: 'plugin',
      type: 'text',
      placeholder: 'pluginName'
    },
    {
      label: '',
      prop: 'jobname',
      type: 'text',
      placeholder: 'JobName'
    },
    {
      label: '',
      prop: 'create_user',
      type: 'slot',
      placeholder: 'creatorFullName'
    },
    {
      label: '',
      prop: 'edit_user',
      type: 'slot',
      placeholder: 'editorFullName'
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
    },
    {
      label: '',
      prop: 'edit_time_start',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
      placeholder: 'editorStartAt'
    },
    {
      label: '',
      prop: 'edit_time_end',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
      placeholder: 'editorFinishAt'
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
  { prop: 'name', label: 'groupName', align: 'center' },
  { prop: 'create_user', label: 'creator', align: 'center' },
  { prop: 'plugin', label: 'plugin', align: 'center' },
  { prop: 'create_time', label: 'creatorTime', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])

// 新建分组
export const ADD_GROUP_CONFIG = {
  width: '800px',
  title: 'newGroup',
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 150,
    config: [
      {
        label: 'groupName',
        prop: 'name',
        type: 'text',
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') },
          { min: 2, message: t('characters2') }
        ],
        span: 24
      },
      {
        label: 'groupType',
        prop: 'plugin',
        type: 'slot',
        // class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: 'content',
        prop: 'params',
        type: 'slot',
        rules: [
          { required: true, trigger: 'change', message: t('requiredText') }
        ],
        // class: 'w560',
        span: 24
      }
    ]
  }
}

export const NAME_THEAD_CONFIG = Object.freeze([
  { type: 'slotTable', prop: 'multiple' },
  { prop: 'name', label: 'hostname', align: 'center' },
  { prop: 'type', label: 'type', align: 'center' },
  { prop: 'inip', label: 'privateIP', align: 'center' },
  { prop: 'exip', label: 'internetIP', align: 'center' }
])

export const TYPE_THEAD_CONFIG = Object.freeze([
  { type: 'slotTable', prop: 'multiple' },
  { prop: 'type', label: 'type', align: 'center' }
])

export const PARAMS_THEAD_CONFIG = Object.freeze([
  { prop: 'id', label: '#', align: 'center', type: 'slot' },
  { prop: 'ip', label: 'Name', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])

export const TABS_CONFIG = Object.freeze([
  {
    label: 'groupByMachineName',
    name: 'node'
  },
  {
    label: 'groupByMachineType',
    name: 'type'
  }
])