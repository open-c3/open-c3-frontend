import { t } from '@/utils/language'
export const SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      prop: 'name',
      type: 'text',
      placeholder: 'hostName'
    },
    {
      prop: 'inip',
      type: 'text',
      placeholder: 'privateIP'
    },
    {
      prop: 'exip',
      type: 'text',
      placeholder: 'internetIP'
    },
    {
      prop: 'create_user',
      type: 'text',
      placeholder: 'creator'
    },
    {
      prop: 'create_time',
      type: 'text',
      placeholder: 'creatorTime'
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
  { prop: 'name', label: 'hostName', align: 'center' },
  { prop: 'inip', label: 'privateIP', align: 'center' },
  { prop: 'exip', label: 'internetIP', align: 'center' },
  { prop: 'create_user', label: 'creator', align: 'center' },
  { prop: 'create_time', label: 'creatorTime', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])
