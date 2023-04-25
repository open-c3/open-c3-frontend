import { t } from "@/utils/language";

export const TERMINAL_ADDRESS_THEAD = [
  { prop: 'address', label: 'address', align: 'center' },
  { type: 'slot', prop: 'operate', label: 'operate', align: 'center' },
]

// 选择服务器
export const CHOICE_SERVER_CONFIG = Object.freeze({
  title: 'selectServer',
  width: '960px',
  ip: [
    { type: 'slotTable', prop: 'multiple' },
    { prop: 'name', label: 'hostname', align: 'center' },
    { prop: 'type', label: 'type', align: 'center' },
    { type:'slot', prop: 'inip', label: 'privateIP', align: 'center' },
    { type:'slot', prop: 'exip', label: 'internetIP', align: 'center' },
    { prop: 'clientVersion', label: 'clientVersion', align: 'center' },
    { prop: 'clientLastDetectionTime', label: 'clientLastDetectionTime', align: 'center' },
    { prop: 'clientErrorReason', label: 'clientErrorReason', align: 'center' }
  ],
})