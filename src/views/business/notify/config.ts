import { t } from '@/utils/language'
export const SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'name',
      type: 'slot',
      placeholder: 'charactersContainedInHostname'
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
  { prop: 'user', label: 'accName', align: 'center' },
  { prop: 'create_user', label: 'creator', align: 'center' },
  { prop: 'create_time', label: 'creatorTime', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])
