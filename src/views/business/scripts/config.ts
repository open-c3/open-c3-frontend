import { t } from '@/utils/language'
export const SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: 'fileName',
      prop: 'name',
      type: 'text',
      placeholder: 'fileKeyword'
    },
    {
      label: 'creator',
      prop: 'create_user',
      type: 'slot',
      placeholder: 'creatorFullName'
    },
    {
      label: 'creator',
      prop: 'edit_user',
      type: 'slot',
      placeholder: 'creatorFullName'
    },
    {
      label: '',
      prop: 'create_time_start',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
      placeholder: 'createStartAt'
    },
    {
      label: '',
      prop: 'create_time_end',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
      placeholder: 'createFinishAt'
    },
    {
      label: '',
      prop: 'edit_time_start',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
      placeholder: 'editorStartAt'
    },
    {
      label: '',
      prop: 'edit_time_end',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
      placeholder: 'editorFinishAt'
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
  { prop: 'name', label: 'scriptName', align: 'center' },
  { prop: 'type', label: 'type', align: 'center' },
  { prop: 'create_user', label: 'createUser', align: 'center' },
  { prop: 'create_time', label: 'creatorTime', align: 'center' },
  { prop: 'edit_user', label: 'editUser', align: 'center' },
  { prop: 'edit_time', label: 'lastModifiedTime', align: 'center' },
  { prop: 'jobname', label: 'associatedJob', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])

// 新建脚本
export const ADD_CONFIG = {
  width: '800px',
  title: 'executeScripts',
  form: {
    position: 'right',
    gutter: 24,
    labelWidth: 120,
    config: [
      {
        label: 'scriptName',
        prop: 'name',
        type: 'text',
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') },
          { min: 2,  message: t('characters2')}
        ],
        span: 24
      },
      {
        label: 'scriptSource',
        prop: 'from',
        type: 'radio',
        data: [
          { name: t('manualEntry'), id: 'manual'},
          { name: t('scriptClone'), id: 'clone'}
          // { name: t('localScript'), id: 'local'}
        ],
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ],
        hidden: true,
        span: 24
      },
      {
        label: 'scriptSource',
        prop: 'from',
        type: 'radio',
        data: [
          { name: t('manualEntry'), id: 'manual'},
          { name: t('scriptClone'), id: 'clone'}
          // { name: t('localScript'), id: 'local'}
        ],
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ],
        hidden: true,
        span: 24
      },
      {
        label: '',
        prop: 'select',
        type: 'select',
        name: 'name',
        data: [],
        hidden: true,
        class: 'w450',
        span: 24
      },
      {
        label: 'scriptContent',
        prop: 'type',
        type: 'radio',
        data: [
          { name: 'shell', id: 'shell'},
          { name: 'python', id: 'python'},
          { name: 'perl', id: 'perl'},
          { name: 'php', id: 'php'},
          { name: t('builtIn'), id: 'buildin'},
          { name: t('autoRecognition'), id: 'auto'}
        ],
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: '',
        prop: 'cont',
        type: 'slot',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ],
        span: 24
      }
    ]
  }
}

// 新建脚本
export const RUN_CONFIG = {
  width: '800px',
  title: 'execute',
  form: {
    position: 'right',
    gutter: 24,
    labelWidth: 120,
    config: [
      {
        label: 'scriptName',
        prop: 'name',
        type: 'text',
        class: 'w450',
        disabled: true,
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') },
          { min: 2,  message: t('characters2')}
        ],
        span: 24
      },
      {
        label: 'scriptSource',
        prop: 'from',
        type: 'radio',
        data: [
          { name: t('manualEntry'), id: 'manual'},
          { name: t('scriptClone'), id: 'clone'},
          { name: t('localScript'), id: 'local'}
        ],
        disabled: true,
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: '',
        prop: 'selectedScript',
        type: 'select',
        name: 'name',
        data: [],
        hidden: true,
        class: 'w450',
        span: 24
      },
      {
        label: 'scriptContent',
        prop: 'scriptType',
        type: 'radio',
        data: [
          { name: 'shell', id: 'shell'},
          { name: 'python', id: 'python'},
          { name: 'perl', id: 'perl'},
          { name: 'php', id: 'php'},
          { name: t('builtIn'), id: 'buildin'},
          { name: t('autoRecognition'), id: 'auto'}
        ],
        disabled: true,
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: '',
        prop: 'scripts_cont',
        type: 'slot',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: 'executionAccount', // 执行账户
        prop: 'selectedUser',
        type: 'slot',
        rules: [
          { required: true, trigger: 'change', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: 'targetMachine', // 目标机器
        prop: 'choiceResult',
        type: 'slot',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: 'scriptParameters', // 脚本参数
        prop: 's_argv',
        type: 'text',
        class: 'w450',
        span: 24
      },
      {
        label: 'Timeout', // 超时时间
        prop: 's_timeout',
        type: 'text',
        class: 'w450',
        placeholder: 'timeoutPlaceholder',
        span: 24
      },
      {
        label: 'effectiveEnv', // 生效环境
        prop: 'deployenv',
        type: 'radio',
        data: [
          { name: t('alwaysExecute'), id: 'always'},
          { name: t('testEnv'), id: 'test'},
          { name: t('onlineEnv'), id: 'online'}
        ],
        rules: [
          { required: true, trigger: 'change', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: 'effectiveAction', // 生效动作
        prop: 'action',
        type: 'radio',
        data: [
          { name: t('alwaysExecute'), id: 'always'},
          { name: t('executeDeploy'), id: 'deploy'},
          { name: t('executeRollback'), id: 'rollback'}
        ],
        rules: [
          { required: true, trigger: 'change', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: 'Batch', // 分批
        prop: 'batches',
        type: 'radio',
        data: [
          { name: t('alwaysExecute'), id: 'always'},
          { name: t('firstGroupOnly'), id: 'firsttime'},
          { name: t('lastGroupOnly'), id: 'thelasttime'},
          { name: t('notFirstGroup'), id: 'notfirsttime'},
          { name: t('notLastGroup'), id: 'notthelasttime'}
        ],
        rules: [
          { required: true, trigger: 'change', message: t('requiredText') }
        ],
        span: 24
      }
    ]
  }
}

// 执行账户 
export const BUILT_IN_PLUGIN:string[] = ['kubectl', 'terraform', 'terraformv2', 'kubestar', 'awsecs', 'awsecsv2', 'awsecsv3', 'awsEcsService', 'sendemail', 'sendmesg', 'flowcaller', 'cdnrefresh', 'cdnrefreshv2', 'kubernetes', 'tsunamiudp', 'calltestenv', 'localbash', 'qaCallback', 'k8snscp', 'flownscp', 'elbShowv2', 'elbOfflinev2', 'elbOnlinev2', 'awsTargetGroup', 'null', 'sleep']

// 表头
export const RUN_THEAD_CONFIG = Object.freeze([
  { prop: 'id', label: 'id', align: 'center', type: 'slot' },
  { prop: 'type', label: 'name', align: 'center' },
  { prop: 'create_user', label: 'type', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])

// 执行脚本页面添加账户
export const ADD_USER_CONFIG = Object.freeze({
  width: '500px',
  title: 'add',
  form: {
    config: [
      {
        label: 'accName',
        prop: 'username',
        type: 'text',
        placeholder: 'accountName',
        rules: [
          { required: true, trigger: 'change', message: t('requiredText') }
        ],
        span: 24
      }
    ]
  }
})

// 选择服务器
export const SELECT_SERVER_CONFIG = Object.freeze({
  width: '800px',
  title: 'selectServer'
})
