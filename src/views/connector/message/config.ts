import { t } from '@/utils/language'
export const SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      prop: 'time',
      type: 'text',
      placeholder: 'time'
    },
    {
      prop: 'mesg',
      type: 'text',
      placeholder: 'content'
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
  { prop: 'mesg', label: 'content', align: 'center' }
])
