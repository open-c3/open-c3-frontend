// CI 队列
export const SEARCH_CONFIG = Object.freeze({
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
      prop: 'treeid',
      type: 'text',
      placeholder: 'treeID'
    },
    {
      label: '',
      prop: 'treename',
      type: 'text',
      placeholder: 'TreeName'
    },
    {
      label: '',
      prop: 'edit_user',
      type: 'text',
      placeholder: 'lastEditor'
    },
    {
      label: '',
      prop: 'edit_time',
      type: 'text',
      placeholder: 'updateTime'
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
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'treeid', label: 'treeID', align: 'center' },
  { prop: 'treename', label: 'TreeName', align: 'center' },
  { prop: 'edit_user', label: 'lastEditor', align: 'center'  },
  { prop: 'edit_time', label: 'updateTime', align: 'center'  },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot'  }
])
