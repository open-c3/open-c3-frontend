export const THEAD = Object.freeze([
  { prop: 'time', label: 'time', align: 'center', width: 160 },
  { prop: 'instance', label: 'instance' },
  { prop: 'title', label: 'title' },
  { prop: 'caseuuid', label: 'alarming', align: 'center', type: 'slot', width: 120 },
  { prop: 'bindTT', label: 'bindTT', align: 'center', type: 'slot' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot', width: 120 }
])

// 屏蔽配置
export const SHIELD_CONFIG = Object.freeze({
  width: '1000px',
  title: 'monitorACK',
  noDefaultFooter: true
})

// 屏蔽表格配置
export const SHIELD_THEAD = Object.freeze([
  { prop: 'name', label: 'NAME', width: 200 },
  { prop: 'value', label: 'VALUE' }
])

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
      prop: 'instance',
      type: 'text',
      placeholder: 'instance'
    },
    {
      label: '',
      prop: 'title',
      type: 'text',
      placeholder: 'title'
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