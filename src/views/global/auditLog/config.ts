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
      prop: 'user',
      type: 'text',
      placeholder: 'user'
    },
    {
      label: '',
      prop: 'title',
      type: 'text',
      placeholder: 'title'
    },
    {
      label: '',
      prop: 'content',
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
  { prop: 'time', label: 'time', align: 'center', width: 150 },
  { prop: 'user', label: 'user', align: 'center', width: 100 },
  { prop: 'title', label: 'title', align: 'center', width: 150 },
  { prop: 'content', label: 'content' }
])
