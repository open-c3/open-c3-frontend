export const SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'edit_time',
      type: 'text',
      placeholder: 'creatorTime'
    },
    {
      label: '',
      prop: 'expirem',
      type: 'text',
      placeholder: 'expirationTime'
    },
    {
      label: '',
      prop: 'to',
      type: 'text',
      placeholder: 'target'
    },
    {
      label: '',
      prop: 'mt',
      type: 'text',
      placeholder: 'type'
    },
    {
      label: '',
      prop: 'edit_user',
      type: 'text',
      placeholder: 'editorOwner'
    },
    {
      label: '',
      prop: 'labels',
      type: 'text',
      placeholder: 'labels'
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
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot', width: 80 },
  { prop: 'edit_time', label: 'creatorTime', align: 'center', width: 150 },
  { prop: 'expirem', label: 'expirationTime', align: 'center', width: 100, type: 'slot' },
  { prop: 'to', label: 'target', align: 'center', width: 100 },
  { prop: 'mt', label: 'type', align: 'center', width: 80 },
  { prop: 'edit_user', label: 'editorOwner', align: 'center', width: 100 },
  { prop: 'labels', label: 'labels', align: 'center' }
])
