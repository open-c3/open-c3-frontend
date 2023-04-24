import { t } from "@/utils/language";

export const SCP_SOURCE_FILE_SELECT_TYPE_HEAD = {
  share: {
    type: 'share',
    text: t('selectSharedFile'),
    data: [],
    thead: [
      { prop: 'name', align: 'center', label: t('fileList') },
      { type: 'slot', prop: 'address', align: 'center', label: t('serverAddress') }
    ]
  },
  server: {
    type: 'server',
    text: t('selectSourceServerFile'),
    data: [],
    thead: [
      { type: 'slot', prop: 'name', align: 'center', label: t('fileList') },
      { type: 'slot', prop: 'address', align: 'center', label: t('serverAddress') }
    ]
  },
  build: {
    type: 'build',
    text: t('selectBuildFile'),
    data: [],
    thead: [
      { prop: 'ci', align: 'center', label: t('environment') },
      { prop: 'version', align: 'center', label: t('version') }
    ]
  },
}

export const SHARE_DIALOG_CONFIG = {
  title: t('serverFile'),
  width: '1000px',
}

export const BUILD_DIALOG_CONFIG = {
  title: t('buildFile'),
  width: '1000px',
}

export const BUILD_THEAD_CONFIG = [
  { type: 'slot', prop: 'ci', align: 'center', label: t('ciThead') },
  { type: 'slot', prop: 'version', align: 'center', label: t('version') }
]

export const TABS_CONFIG: { label: string, name: string }[] = [
  {
    label: 'selectFile',
    name: 'select'
  },
  {
    label: 'manualInput',
    name: 'input'
  }
]

export const TARGET_SOURCE_CONFIG = {
  width: '1000px',
  title: 'targetFile',
  noDefaultFooter: true,
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 150,
    config: [
      {
        label: 'targetPath',  // 目标路径
        prop: 'dp',
        type: 'slot',
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') },
        ],
        span: 24
      },
      {
        label: 'syncDelete',  // 同步Delete
        prop: 'scp_delete',
        type: 'slot',
        class: 'w450',
        span: 24
      },
      {
        label: 'executionAccount', //执行账户
        prop: 'dstUser',
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
        class: 'w450',
        data: [],
        rules: [
          { required: true, trigger: 'change', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: 'fileOwner', //文件归属者
        prop: 'fileChown',
        type: 'slot',
        class: 'w450',
        data: [],
        span: 24

      },
      {
        label: 'filePermissions', //文件权限
        prop: 'chmod',
        type: 'slot',
        class: 'w450',
        data: [],
        span: 24

      },
      {
        label: 'Timeout', // 超时时间
        prop: 'timeout',
        type: 'text',
        class: 'w450',
        placeholder: 'timeoutPlaceholder',
        span: 24
      },
      {
        label: 'effectiveEnv', // 生效环境
        prop: 'unClickDeployenv',
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
        prop: 'unClickAction',
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
        prop: 'unClickBatches',
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

export const bytesToSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1000 // or 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}