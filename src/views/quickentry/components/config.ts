import { t } from '@/utils/language';
import {
  Plus,
  Delete,
} from '@element-plus/icons-vue'

import { markRaw } from 'vue'

export const BUILD_MODAL_CONFIG = {
  width: '500px',
  title: t('tagVersion'),
  noDefaultFooter: true,
}

export const CREATE_DOCKER_CONFIG = {
  width: '800px',
  title: t('tagVersion'),
  noDefaultFooter: true,
  form: {
    labelWidth: '80',
    gutter: 20,
    width: 120,
    config: [
      {
        label: 'credential',
        class: 'w450',
        prop: 'selectedTicketId',
        type: 'slot',
        hidden: true,
        rules: [
          { required: false, message: t('credentialSelectPlaceholder'), trigger: 'change' }
        ]
      },
      {
        label: 'namespace',
        class: 'w450',
        prop: 'namespace',
        type: 'slot',
        rules: [
          { required: true, message: `${t('configFormInput')}${t('namespace')}`, trigger: 'blur' }
        ]
      },
      {
        label: 'name',
        class: 'w450',
        prop: 'name',
        placeholder: 'createDockerJsonNamePlaceholder',
        type: 'text',
        rules: [
          { required: true, message: `${t('configFormInput')}${t('name')}`, trigger: 'blur' }
        ]
      },
      {
        label: 'domain',
        class: 'w450',
        prop: 'server',
        type: 'text',
        placeholder: 'createDockerJsonServerPlaceholder',
        rules: [
          { required: true, message: `${t('configFormInput')}${t('domain')}`, trigger: 'blur' }
        ]
      },
      {
        label: 'userName',
        class: 'w450',
        prop: 'username',
        type: 'text',
        rules: [
          { required: true, message: `${t('configFormInput')}${t('userName')}`, trigger: 'blur' }
        ]
      },
      {
        label: 'password',
        class: 'w450',
        prop: 'password',
        type: 'text',
        rules: [
          { required: true, message: `${t('configFormInput')}${t('password')}`, trigger: 'blur' }
        ]
      },
      {
        label: 'mailbox',
        class: 'w450',
        prop: 'email',
        type: 'text',
        rules: [
          { required: false, message: `${t('configFormInput')}${t('mailbox')}`, trigger: 'blur' }
        ]
      },
    ],
  }
}

export const MIRROR_WAREHOUSE_SELECTION_FORM_CONFIG = {
  width: '1200px',
  title: `Harbor${t('ImageWarehouseSelection')}`,
  form: {
    labelWidth: '80',
    gutter: 20,
    width: 120,
    config: [
      {
        label: 'credential',
        class: 'w450',
        prop: 'ticketid',
        type: 'select',
        rules: [
          { required: true, message: t('credentialSelectPlaceholder'), trigger: 'change' }
        ]
      }
    ]
  }
}

export const MIRROR_WAREHOUSE_SELECTION_THEAD: Array<any> = [
  { type: 'slotTable', prop: 'repo', width: 200, label: t('name'), sortable: true, align: 'center' },
  { type: 'slotTable', prop: 'type', width: 200, label: t('type'), sortable: true, align: 'center' },
  { type: 'slotTable', prop: 'artifact_count', width: 200, label: 'artifact_count', sortable: true, align: 'center' },
  { type: 'slotTable', prop: 'pull_count', width: 200, label: 'pull_count', sortable: true, align: 'center' },
  { type: 'slotTable', prop: 'operate', width: 200, label: t('oldContainer'), align: 'center' },
]

export const ADD_ENV_GROUPS_CONFIG = {
  width: '1000px',
  title: t('selectServer'),
  // noFooter: true,
  noDefaultFooter: true,
}

export const PERCENT_TABLE_THEAD: Array<any> = [
  { prop: 'name', width: 300, label: t('name'), align: 'center' },
  { prop: 'type', width: 300, label: t('type'), align: 'center' },
]

export const SELECT_SERVER_FORM_CONFIG = {
  width: '1270px',
  title: t('SelectiveMachine'),
}

export const RADIO_OPTION: { id: string | number, name: string | number }[] = [
  {
    id: 'ip',
    name: t('selectServerViaIP')
  },
  {
    id: 'group',
    name: t('groupSelection')
  },
  {
    id: 'variable',
    name: t('selectVariable')
  },
  {
    id: 'custom',
    name: t('handwrittenIP')
  }
]

export const NOTICE_THEAD: Array<any> = [
  // { type: 'slotTable', prop: 'multiple' },
  { prop: 'name', width: 150, label: 'hostname', align: 'center' },
  { prop: 'type', width: 150, label: 'type', align: 'center' },
  { type: 'slotTable', prop: 'inip', width: 150, label: 'privateIP', align: 'center' },
  { type: 'slotTable', prop: 'exip', width: 150, label: 'internetIP', align: 'center' },
  { type: 'slotTable', prop: 'clientVersion', width: 100, label: 'clientVersion', align: 'center' },
  { type: 'slotTable', prop: 'clientLastDetectionTime', width: 120, label: 'clientLastDetectionTime', align: 'center' },
  { type: 'slotTable', prop: 'clientErrorReason', width: 120, label: 'clientErrorReason', align: 'center' }
]

export const GROUPS_THEAD: Array<any> = [
  { prop: 'name', label: 'name', align: 'center' },
  { prop: 'plugin', label: 'plugIn', align: 'center' },
]

export const VARIABLE_THEAD: Array<any> = [
  { type: 'slot', prop: 'name', label: 'name', align: 'center' },
]

export const HOST_RESOURCE_SEARCH = Object.freeze({
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

export const METADATA_THEAD: Array<any> = [
  { prop: 'key', label: 'Key', width: 300, align: 'center', type: 'slot' },
  { prop: 'symbol', label: '', align: 'center', type: 'slot' },
  { prop: 'value', label: 'Value', width: 300, align: 'center', type: 'slot' },
  { prop: 'operate', label: 'operate', align: 'center', width: 100, type: 'slot' },
]


export const DATA_VOLUME_GROUP: Array<any> = [
  {
    text: 'empty',
    tooltip: `${t('add')}emptyDir`,
    type: 'primary',
    subType: 'emptyDir',
    icon: markRaw(Plus),
  },
  {
    text: 'hostpath',
    tooltip: `${t('add')}hostpath`,
    type: 'primary',
    subType: 'hostPath',
    icon: markRaw(Plus),
  },
  {
    text: 'nfs',
    tooltip: `${t('add')}nfs`,
    type: 'primary',
    subType: 'nfs',
    icon: markRaw(Plus),
  },
  {
    text: 'secret',
    tooltip: `${t('add')}secret`,
    type: 'primary',
    subType: 'secret',
    icon: markRaw(Plus),
  },
  {
    text: 'configMap',
    tooltip: `${t('add')}configMap`,
    type: 'primary',
    subType: 'configMap',
    icon: markRaw(Plus),
  },
  {
    text: 'persistentVolumeClaim',
    tooltip: `${t('add')}persistentVolumeClaim`,
    type: 'primary',
    subType: 'persistentVolumeClaim',
    icon: markRaw(Plus),
  },
  {
    text: t('clearUp'),
    tooltip: t('clearUp'),
    type: '',
    subType: '',
    icon: markRaw(Delete),
  },
]

export const PULL_PRIVATE_IMAGE_GROUP_ARR: Array<any> = [
  {
    text: t('addExistingVoucher'),
    tooltip: t('addCredential'),
    type: 'primary',
    subType: 'addCredential',
    icon: markRaw(Plus),
  },
  {
    text: t('create'),
    tooltip: t('create'),
    type: 'primary',
    subType: 'create',
    icon: markRaw(Plus),
  },
  {
    text: t('import'),
    tooltip: t('importnamespaceTooltip'),
    type: 'primary',
    subType: 'import',
    icon: markRaw(Plus),
  },
  {
    text: t('clearUp'),
    tooltip: t('clearUp'),
    type: '',
    subType: '',
    icon: markRaw(Delete),
  },
]

export const OPERATION_ASSISTANCE_FORM_CONFIG = {
  width: '750px',
  title: t('operationAssistance'),
  noDefaultFooter: true,
  form: {
    labelWidth: '150',
    gutter: 20,
    width: 120,
    config: [
      {
        label: 'assistancer',
        class: 'w450',
        prop: 'handler',
        type: 'text',
        rules: [
          { required: true, message: `${t('configFormInput')}${t('name')}`, trigger: 'blur' }
        ]
      },
      {
        label: 'reasonForOperation',
        class: 'w450',
        prop: 'submit_reason',
        type: 'slot',
        rules: [
          { required: true, message: `${t('configFormInput')}${t('reasonForOperation')}`, trigger: 'blur' }
        ]
      }
    ]
  }
}

export const HOST_PATH_SELECT: string[] = ['DirectoryOrCreate', 'Directory', 'FileOrCreate', 'File', 'Socket', 'CharDevice', 'BlockDevice']

// 节点亲和调度
export const FIRST_AFFINITY_SECHDUE: Array<any> = [
  {
    typeName: 'requiredDuringSchedulingIgnoredDuringExecution',
    sechdue: [
      { label: t('nodeAffinitySechdue'), type: 'nodeAffinity', msgFlag: true, select: 'nodeSelectorTerms' },
      { label: t('podAffinitySechdue'), type: 'podAffinity', msgFlag: false, select: 'labelSelector' },
      { label: t('podAntiAffinitySechdue'), type: 'podAntiAffinity', msgFlag: false, select: 'labelSelector' },
    ]
  },
  {
    typeName: 'requiredDuringSchedulingRequiredDuringExecution',
    sechdue: [
      { label: t('nodeAffinitySechdue'), type: 'nodeAffinity', msgFlag: true, select: 'nodeSelectorTerms' },
      { label: t('podAffinitySechdue'), type: 'podAffinity', msgFlag: false, select: 'labelSelector' },
      { label: t('podAntiAffinitySechdue'), type: 'podAntiAffinity', msgFlag: false, select: 'labelSelector' },
    ]
  },
]
// POD亲和性调度
export const SECOND_AFFINITY_SECHDUE: Array<any> = [
  {
    typeName: 'preferredDuringSchedulingIgnoredDuringExecution',
    sechdue: [
      { label: t('nodeAffinitySechdue'), type: 'nodeAffinity', msgFlag: true, select: 'preference' },
      { label: t('podAffinitySechdue'), type: 'podAffinity', msgFlag: false, select: 'podAffinityTerm' },
      { label: t('podAntiAffinitySechdue'), type: 'podAntiAffinity', msgFlag: false, select: 'podAffinityTerm' },
    ]
  },
  {
    typeName: 'preferredDuringSchedulingRequiredDuringExecution',
    sechdue: [
      { label: t('nodeAffinitySechdue'), type: 'nodeAffinity', msgFlag: true, select: 'preference' },
      { label: t('podAffinitySechdue'), type: 'podAffinity', msgFlag: false, select: 'podAffinityTerm' },
      { label: t('podAntiAffinitySechdue'), type: 'podAntiAffinity', msgFlag: false, select: 'podAffinityTerm' },
    ]
  },
]

export const FIRST_AFFINITY_SECHDUE_MESSAGE_MAP = {
  requiredDuringSchedulingIgnoredDuringExecution: t('requiredDuringSchedulingIgnoredDuringExecution'),
  requiredDuringSchedulingRequiredDuringExecution: t('requiredDuringSchedulingRequiredDuringExecution'),
  preferredDuringSchedulingIgnoredDuringExecution: t('preferredDuringSchedulingIgnoredDuringExecution'),
  preferredDuringSchedulingRequiredDuringExecution: t('preferredDuringSchedulingRequiredDuringExecution')
}

export const AFFINITY_OPERATOR_OPTION = [
  { value: 'In', label: 'In' },
  { value: 'NotIn', label: 'NotIn' },
  { value: 'Exists', label: 'Exists' },
  { value: 'DoesNotExist', label: 'DoesNotExist' },
  { value: 'Gt', label: 'Gt' },
  { value: 'Lt', label: 'Lt' },
]
// tolerate
export const TOLERATE_TABLE_GROUP_ARR: Array<any> = [
  {
    text: t('add'),
    tooltip: '',
    type: 'primary',
    subType: 'add',
    icon: markRaw(Plus),
  },
  {
    text: t('clearUp'),
    tooltip: t('clearUp'),
    type: '',
    subType: '',
    icon: markRaw(Delete),
  },
]

// hostAliasesArr
export const HOST_ALIASES_GROUP_ARR: Array<any> = [
  {
    text: t('add'),
    tooltip: t('add'),
    type: 'primary',
    subType: 'add',
    icon: markRaw(Plus),
  },
  {
    text: t('clearUp'),
    tooltip: t('clearUp'),
    type: '',
    subType: '',
    icon: markRaw(Delete),
  },
]

export const CONTAINER_GROUP_ARR: Array<any> = [
  {
    text: t('add'),
    tooltip: t('add'),
    type: 'primary',
    subType: 'add',
    icon: markRaw(Plus),
  },
]

export const HOST_ALIASES_GROUP_THEAD: Array<any> = [
  { prop: 'ip', label: 'Key', width: 250, align: 'center', type: 'slot' },
  { prop: 'symbol', label: '', align: 'center', type: 'slot' },
  { prop: 'hostnames', label: 'Value', width: 250, align: 'center', type: 'slot' },
  { prop: 'operate', label: 'operate', align: 'center', width: 100, type: 'slot' },
]

export const APPLY_PROBE_BUTTON_GROUP: Array<any> = [
  {
    text: t('commandLineMode'),
    value: 'command',
  },
  {
    text: t('httpRequestMode'),
    value: 'http',
  },
  {
    text: t('tcpRequestMode'),
    value: 'tcp',
  },
  {
    text: t('clearUp'),
    value: '',
  },
]

export const PULL_POLICY_BUTTON_GROUP: Array<any> = [
  {
    text: 'Always',
    value: 'Always',
  },
  {
    text: 'IfNotPresent',
    value: 'IfNotPresent',
  },
  {
    text: 'Never',
    value: 'Never',
  },
  {
    text: t('clearUp'),
    value: '',
  },
]

export const REQUEST_MESSAGE_ARRAY: string[] = [
  t('limitMessageFirst'),
  t('limitMessageSecond'),
  t('limitMessageThird'),
  t('limitMessageSixth'),
  t('limitMessageSeventh'),
  t('limitMessageEighth'),
  t('limitMessageNinth'),
]

// envVariableArr
export const ENV_VARIABLE_GROUP_ARR: Array<any> = [
  {
    text: `${t('ordinary')}${t('variable')}`,
    tooltip: `${t('ordinary')}${t('variable')}`,
    type: 'primary',
    subType: 'ordinary',
    icon: markRaw(Plus),
  },
  {
    text: `ConfigMap${t('variable')}`,
    tooltip: `ConfigMap${t('variable')}`,
    type: 'primary',
    subType: 'ConfigMap',
    icon: markRaw(Plus),
  },
  {
    text: `Secret${t('variable')}`,
    tooltip: `Secret${t('variable')}`,
    type: 'primary',
    subType: 'Secret',
    icon: markRaw(Plus),
  },
  {
    text: `Field${t('variable')}`,
    tooltip: `Field${t('variable')}`,
    type: 'primary',
    subType: 'Field',
    icon: markRaw(Plus),
  },
  {
    text: t('clearUp'),
    tooltip: t('clearUp'),
    type: '',
    subType: '',
    icon: markRaw(Delete),
  },
]
export const ENV_VARIABLE_GROUP_MAP = {
  volume: {
    emptyDir: 'emptyDir',
    hostPath: 'hostPath',
    nfs: 'nfs',
    secret: 'secret',
    configMap: 'configMap',
    persistentVolumeClaim: 'persistentVolumeClaim',
  },
  variable: {
    '': `${t('ordinary')}${t('variable')}`,
    ConfigMap: `ConfigMap${t('variable')}`,
    Secret: `Secret${t('variable')}`,
    Field: `Field${t('variable')}`
  },
  portset: {
    TCP: 'TCP',
    UDP: 'UDP'
  },
  volumeMount: {
    directory: t('directory'),
    singleDirectory: t('singleDirectory')
  }
}

export const PORT_SETTING_GROUP_ARR:Array<any> = [
  {
    text: 'TCP',
    tooltip: t('addTcpPort'),
    type: 'primary',
    subType: 'TCP',
    icon: markRaw(Plus),
  },
  {
    text: 'UDP',
    tooltip: t('addUdpPort'),
    type: 'primary',
    subType: 'UDP',
    icon: markRaw(Plus),
  },
  {
    text: t('clearUp'),
    tooltip: t('clearUp'),
    type: '',
    subType: '',
    icon: markRaw(Delete),
  },
]
// 目录
export const VOLUME_MOUNT_GROUP_ARR:Array<any>= [
  {
    text: t('directory'),
    tooltip: t('directory'),
    type: 'primary',
    subType: 'directory',
    icon: markRaw(Plus),
  },
  
  {
    text: t('singleDirectory'),
    tooltip: t('singleDirectory'),
    type: 'primary',
    subType: 'singleDirectory',
    icon: markRaw(Plus),
  },
  {
    text: t('clearUp'),
    tooltip: t('clearUp'),
    type: '',
    subType: '',
    icon: markRaw(Delete),
  },
]