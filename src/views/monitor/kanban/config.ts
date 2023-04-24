export const THEAD_CONFIG = Object.freeze([
  { prop: 'name', label: 'name', align: 'center' },
  { prop: 'url', label: 'urlAddress', align: 'center', width: 180 },
  { prop: 'edit_user', label: 'creator', align: 'center' },
  { prop: 'edit_time', label: 'creatorTime', align: 'center' },
  { prop: 'id', label: 'openDefault', align: 'center', type: 'slot' },
  { prop: 'operate', type: 'slot', label: 'operate', align: 'center' }
])

export const ADD_CONFIG = Object.freeze({
  width: '800px',
  title: 'addDashBoardTitle',
  noFooter: true
})