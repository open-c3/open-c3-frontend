import { t } from '@/utils/language'
export const THEAD_CONFIG = Object.freeze([
  { prop: 'id', label: 'id', align: 'center' },
  { prop: 'name', label: 'hostName', align: 'center' },
  { prop: 'inip', label: 'privateIP', align: 'center' },
  { prop: 'exip', label: 'internetIP', align: 'center' },
  { prop: 'type', label: 'resourceType', align: 'center' },
  { prop: 'status', label: 'status', align: 'center', type: 'slot' },
  { prop: 'lowcnt', label: 'lowUtilization14', align: 'center' },
  { prop: 'cpu', label: 'cpu', align: 'center' },
  { prop: 'mem', label: 'memory', align: 'center' },
  { prop: 'netin', label: 'downloadBandwidth', align: 'center', type: 'slot' },
  { prop: 'netout', label: 'uploadBandwidth', align: 'center', type: 'slot' },
  { prop: 'edit_time', label: 'lastStatisticalDate', align: 'center' },
  { prop: 'operate', type: 'slot', label: 'operate', align: 'center' }
])
// 搜索的config
export const SEARCH_CONFIG = {
  labelWidth: 0,
  formConfig: [
    {
      prop: 'name',
      type: 'text',
      placeholder: 'hostName'
    },
    {
      prop: 'inip',
      type: 'text',
      placeholder: 'privateIP'
    },
    {
      prop: 'exip',
      type: 'text',
      placeholder: 'internetIP'
    },
    {
      prop: 'status',
      type: 'select',
      name: 'name',
      data: [{
        name: t('lowUtilization'), id: 'low'
      }, {
        name: t('warn'), id: 'warn'
      }, {
        name: t('normal'), id: 'normal'
      }, {
        name: t('unknown'), id: 'unkown'
      }],
      clearable: true,
      // multiple: true,
      placeholder: 'status'
    }
  ],
  formBtnConfig: [
    {
      name: 'reset',
      emitName: 'reset',
      type: 'info'
    },
    {
      name: 'query',
      emitName: 'query',
      type: 'primary'
    }
  ]
}

// 详情
export const DETAIL_CONFIG = Object.freeze({
  width: '700px',
  title: 'loadDetail',
  noDefaultFooter: true,
})
// 详情表格
export const DETAIL_THEAD_CONFIG = Object.freeze([
  { prop: 'date', label: 'date', align: 'center' },
  { prop: 'status', label: 'status', align: 'center', type: 'slot' },
  { prop: 'cpu', label: 'cpu', align: 'center' },
  { prop: 'mem', label: 'memory', align: 'center' },
  { prop: 'netin', label: 'downloadBandwidth', align: 'center', type: 'slot' },
  { prop: 'netout', label: 'uploadBandwidth', align: 'center', type: 'slot' }
])
