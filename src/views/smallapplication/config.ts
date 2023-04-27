import { t } from '@/utils/language'

export const LIGHT_APPLICATION_TABLE_THEAD = Object.freeze([
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'type', label: 'type', align: 'center' },
  { prop: 'title', label: 'title', align: 'center' },
  { prop: 'describe', label: 'describe', align: 'center' },
  { prop: 'create_user', label: 'creator', align: 'center' },
  { prop: 'edit_user', label: 'lastEditor', align: 'center' },
  { prop: 'create_time', label: 'creatorTime', align: 'center' },
  { prop: 'edit_time', label: 'lastUpdateTime', align: 'center' },
  { type: 'slot', prop: 'operate', label: 'operate', align: 'center' },
])

export const LIGHT_APPLICATION_SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'id',
      type: 'text',
      placeholder: 'ID'
    },
    {
      label: '',
      prop: 'type',
      type: 'text',
      placeholder: 'type'
    },
    {
      label: '',
      prop: 'title',
      type: 'text',
      placeholder: 'title'
    },
    {
      label: '',
      prop: 'describe',
      type: 'text',
      placeholder: 'describe'
    },
    {
      label: '',
      prop: 'create_user',
      type: 'text',
      placeholder: 'creator'
    },
    {
      label: '',
      prop: 'edit_user',
      type: 'text',
      placeholder: 'editor'
    },
    {
      label: '',
      prop: 'create_time',
      type: 'text',
      placeholder: 'creatorTime'
    },
    {
      label: '',
      prop: 'edit_time',
      type: 'text',
      placeholder: 'lastUpdateTime'
    },
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