import { t } from "@/utils/language";

export const SEND_FILETHEAD = Object.freeze([
  { type: 'slotTable', prop: 'multiple' },
  { prop: 'name', label: 'hostname', align: 'center' },
  { prop: 'type', label: 'type', align: 'center' },
  { type: 'slot', prop: 'inip', label: 'privateIP', align: 'center' },
  { type: 'slot', prop: 'exip', label: 'internetIP', align: 'center' },
  { prop: 'clientVersion', label: 'clientVersion', align: 'center' },
  { prop: 'clientLastDetectionTime', label: 'clientLastDetectionTime', align: 'center' },
  { prop: 'clientErrorReason', label: 'clientErrorReason', align: 'center' }
])

export const NODE_SEARCH_PARAMS = Object.freeze({
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
    },
    {
      label: '',
      prop: 'inip',
      type: 'text',
      placeholder: 'privateIP'
    },
    {
      label: '',
      prop: 'exip',
      type: 'text',
      placeholder: 'internetIP'
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

export const SEND_FILE_SEARCH_CONFIG = Object.freeze({
  form: {
    position: 'right',
    gutter: 20,
    // labelWidth: 80,
    config: [
      {
        label: 'address',
        prop: 'address',
        type: 'text',
        class: 'w300',
        span: 14
      },
      {
        label: '',
        prop: 'btn',
        type: 'slot',
        span: 10
      }
    ]
  }
})

export const DRAWER_FILE_TABLE_THEAD = Object.freeze([
  { prop: 'name', label: 'host', align: 'center' },
  { prop: 'info', label: 'information', align: 'center' },
  { prop: 'type', label: 'type', align: 'center' },
  { prop: 'path', label: 'path', align: 'center' },
  { type: 'slot', prop: 'operate', label: 'operate', align: 'center', width:200 },
])

export const DRAWER_UPLOAD_TABLE_THEAD = Object.freeze([
  { prop: 'id', label: 'ID', align: 'center' },
  { prop: 'name', label: 'fileName', align: 'center' },
  { type: 'slot', prop: 'size', label: 'size', align: 'center' },
  { type: 'slot', prop: 'operate', label: 'operate', align: 'center' },
])

export const DRAWER_TASK_TABLE_THEAD = Object.freeze([
  { prop: 'tadk', label: 'nowDaysTask', align: 'center' },
  { prop: 'operator', label: 'operator', align: 'center' },
  { type: 'slot', prop: 'size', label: `${t('useTime')}(${t('seconds')})`, align: 'center' },
  { type: 'slot', prop: 'status', label: 'status', align: 'center' },
])