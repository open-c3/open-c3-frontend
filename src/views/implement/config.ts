import { t } from '@/utils/language';
export const SELECT_SERVER_RADIO_OPTION: { id: string | number, name: string | number }[] = [
  {
    id: 'ip',
    name: t('selectServerViaIP')
  },
  {
    id: 'group',
    name: t('groupSelection')
  },
  {
    id: 'custom',
    name: t('handwrittenIP')
  }
]

export const ADD_ENV_GROUPS_CONFIG = {
  width: '1000px',
  title: t('selectServer'),
}

// 脚本执行 目标机器 表头
export const RUN_THEAD_CONFIG = Object.freeze([
  { prop: 'id', label: 'id', align: 'center', type: 'slot' },
  { prop: 'name', label: 'name', align: 'center' },
  { prop: 'type', label: 'type', align: 'center', type: 'slot' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])

export const CHOICE_NODE_TYPE: { [propName: string]: string } = {
  node: t('nodeType'),
  type: t('groupType'),
}

// 执行脚本 脚本内容 目标机器显示正则
export const LEAVE_CHOICE_NODE_TYPE_REGEXP: Array<RegExp> = [
  /^#!kubectl\b/, /^#!terraform\b/, /^#!terraformv2\b/, /^#!kubestar\b/, /^#!awsecs\b/, /^#!awsecsv2\b/,
  /^#!awsecsv3\b/, /^#!awsEcsService\b/, /^#!sendemail\b/, /^#!sendmesg\b/, /^#!flowcaller\b/, /^#!cdnrefresh\b/,
  /^#!cdnrefreshv2\b/, /^#!kubernetes\b/, /^#!tsunamiudp\b/, /^#!calltestenv\b/, /^#!localbash\b/, /^#!qaCallback\b/,
  /^#!k8snscp\b/, /^#!flownscp\b/, /^#![a-z0-9]+debug\b/, /^#!bpmtask\b/, /^#!null\b/, /^#!sleep\b/
]
