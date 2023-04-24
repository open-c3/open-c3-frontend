import { t } from '@/utils/language'
export const SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'time',
      type: 'text',
      placeholder: 'time'
    },
    {
      label: '',
      prop: 'host',
      type: 'text',
      placeholder: 'monitorObject'
    },
    {
      label: '',
      prop: 'stat',
      type: 'text',
      placeholder: 'status'
    },
    {
      label: '',
      prop: 'key',
      type: 'text',
      placeholder: 'monitoringMetric'
    },
    {
      label: '',
      prop: 'val',
      type: 'text',
      placeholder: 'value'
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
  { prop: 'time', label: 'time', align: 'center' },
  { prop: 'host', label: 'monitorObject', align: 'center' },
  { prop: 'stat', label: 'status', align: 'center', type: 'slot' },
  { prop: 'type', label: 'type', align: 'center' },
  { prop: 'key', label: 'monitoringMetric', align: 'center' },
  { prop: 'val', label: 'value', align: 'center' }
])