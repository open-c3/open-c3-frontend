import { t } from '@/utils/language'
export const SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'name',
      type: 'slot',
      placeholder: 'charactersContainedInHostname'
    },
    {
      label: '',
      prop: 'create_user',
      type: 'slot',
      placeholder: 'creatorFullName'
    },
    {
      label: '',
      prop: 'inip',
      type: 'text',
      placeholder: 'privateIP'
    },
    {
      label: '',
      prop: 'exip',
      type: 'text',
      placeholder: 'internetIP'
    },
    {
      label: '',
      prop: 'create_time_start',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
      placeholder: 'startAt'
    },
    {
      label: '',
      prop: 'create_time_end',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
      placeholder: 'createFinishAt'
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
  { prop: 'name', label: 'hostname', align: 'center' },
  { prop: 'create_user', label: 'creator', align: 'center' },
  { prop: 'inip', label: 'privateIP', align: 'center' },
  { prop: 'exip', label: 'internetIP', align: 'center' },
  { prop: 'create_time', label: 'creatorTime', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])
