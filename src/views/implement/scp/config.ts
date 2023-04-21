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
        label: 'targetPath',
        prop: 'dp',
        type: 'slot',
        class: 'w450',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') },
        ],
        span: 24
      },
      {
        label: 'syncDelete',
        prop: 'scp_delete',
        type: 'slot',
        class: 'w450',
        span: 24
      },
      {
        label: 'executionAccount',
        prop: 'dstUser',
        type: 'slot',
        rules: [
          { required: true, trigger: 'change', message: t('requiredText') }
        ],
        span: 24
      },
      {
        label: 'targetMachine',
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
        label: 'fileOwner',
        prop: 'fileChown',
        type: 'slot',
        class: 'w450',
        data: [],
        span: 24

      },
      {
        label: 'filePermissions',
        prop: 'chmod',
        type: 'slot',
        class: 'w450',
        data: [],
        span: 24

      },
      {
        label: 'Timeout',
        prop: 'timeout',
        type: 'slot',
        class: 'w450',
        data: [],
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') },
        ],
        span: 24
      },
      {
        label: 'effectiveEnv',
        prop: 'unClickDeployenv',
        type: 'slot',
        class: 'w450',
        data: [],
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') },
        ],
        span: 24
      },
      {
        label: 'effectiveAction',
        prop: 'unClickAction',
        type: 'slot',
        class: 'w450',
        data: [],
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') },
        ],
        span: 24
      },
      {
        label: 'Batch',
        prop: 'unClickBatches',
        type: 'slot',
        class: 'w450',
        data: [],
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') },
        ],
        span: 24
      },
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