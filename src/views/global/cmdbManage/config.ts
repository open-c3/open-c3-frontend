import { t } from '@/utils/language'
export const SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'name',
      type: 'text',
      placeholder: 'name'
    },
    {
      label: '',
      prop: 'type',
      type: 'text',
      placeholder: 'type'
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
  { prop: 'name', label: 'name' },
  { prop: 'type', label: 'type' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' },
])

export const EDIT_CONFIG = {
  width: '700px',
  title: 'CMDB',
  noDefaultFooter: false,
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 100,
    config: [
      {
        label: 'name',
        prop: 'name',
        type: 'text',
        span: 24,
        class: 'w400',
        disabled: true
      },
      {
        label: 'config',
        prop: 'config',
        type: 'textarea',
        span: 24,
        class: 'w400'
      }
    ]
  }
}