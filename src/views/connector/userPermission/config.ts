import { t } from '@/utils/language'
export const SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'name',
      type: 'text',
      placeholder: 'accountName'
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
  { prop: 'name', label: 'accName', align: 'center' },
  { prop: 'level', label: 'level', align: 'center', type: 'slot' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])

export const TREE_SEARCH_CONFIG = Object.freeze({
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
      prop: 'name',
      type: 'text',
      placeholder: 'accountName'
    },
    {
      label: '',
      prop: 'tree',
      type: 'text',
      placeholder: 'treeID'
    },
    {
      label: '',
      prop: 'treename',
      type: 'text',
      placeholder: 'TreeName'
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

export const TREE_THEAD_CONFIG = Object.freeze([
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'name', label: 'accName', align: 'center' },
  { prop: 'tree', label: 'treeID', align: 'center' },
  { prop: 'treename', label: 'TreeName', align: 'center' },
  { prop: 'level', label: 'level', align: 'center', type: 'slot' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])
