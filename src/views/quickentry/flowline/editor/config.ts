import { t } from '@/utils/language';
import { DetailTableStatusInfo } from '@/api/interface/quickentry'

export const DETAIL_TABLE_STATUS_COLOR: DetailTableStatusInfo = {
  fail: 'var(--color_text_danger)',
  running: 'var(--color-chart-14)',
  success: 'var(--color_text_success)',
  init: 'transparent'
}

export const DETAIL_TABLE_STATUS_TYPE: DetailTableStatusInfo = {
  success: 'inverse-success',
  running: 'inverse-running',
  fail: 'inverse-fail',
  init: 'inverse-running',
}

export const panelcolor = {
  success: 'var(--color_text_success)',
  fail: 'var(--color_text_danger)',
  refuse: 'var(--el-color-warning)',
  running: 'var(--color-chart-14)',
  decision: 'var(--el-color-primary)',
  ignore: 'var(--el-text-color-primary)',
  ready: 'var(--el-text-color-primary)'
}

export const CHART_COLORS = ['#757FFF', '#E96464', '#FFDD75', '#38C6C0', ' #8879F0', ' #F39C96', ' #939BFF', '#FFF3C7', '#88D6C8', '#A18DFB', '#E96579', '#F8B96C', '#FAC7AA', '#92DCA1']

export const EDIT_RELY_DIALOG_CONFIG = {
  width: '1000px',
  title: t('editRely'),
  form: {
    labelWidth: '100',
    gutter: 20,
    width: 120,
    config: [
      {
        label: 'codeAddress',
        class: 'w450',
        prop: 'addr',
        type: 'slot',
        rules: [
          { required: true, message: t('codeAddressPlaceholder'), trigger: 'blur' }
        ]
      },
      {
        label: 'subdir',
        class: 'w450',
        prop: 'path',
        type: 'text',
        rules: [
          { required: false, message: t('flowAliasPlaceholder'), trigger: 'blur' }
        ]
      },
      {
        label: 'tags',
        class: 'w450',
        prop: 'tags',
        type: 'text',
        rules: [
          { required: false, message: t('flowAliasPlaceholder'), trigger: 'blur' }
        ]
      },
      {
        label: 'credential',
        class: 'w450',
        prop: 'ticketid',
        type: 'select',
        rules: [
          { required: false, message: t('flowAliasPlaceholder'), trigger: 'blur' }
        ]
      },
    ]
  }
}

export const IMPORT_CLUSTERMODAL_CONFIG = {
  width: '1000px',
  title: t('editRely'),
  // noFooter: true,
  noDefaultFooter: true,
}

export const EDIT_FROM_FORM_CONFIG = {
  labelWidth: '200',
  gutter: 20,
  width: 120,
  config: [
    // {
    //   label: 'Switch',
    //   prop: 'status',
    //   type: 'slot',
    //   rules: [
    //     { required: true, message: t('versionNamePlaceholder'), trigger: 'change' }
    //   ]
    // },
    // {
    //   label: 'withinAudit',
    //   prop: 'audit_level',
    //   type: 'slot',
    //   rules: [
    //     { required: true, message: t('versionNamePlaceholder'), trigger: 'change' }
    //   ]
    // },
    // {
    //   label: 'autoFindTags',
    //   prop: 'autofindtags',
    //   type: 'slot',
    //   rules: [
    //     { required: true, message: t('versionNamePlaceholder'), trigger: 'change' }
    //   ]
    // },
    // {
    //   label: 'autoBuild',
    //   prop: 'autobuild',
    //   type: 'slot',
    //   rules: [
    //     { required: true, message: t('versionNamePlaceholder'), trigger: 'change' }
    //   ]
    // },
    {
      label: 'codeAddress',
      prop: 'addr',
      type: 'slot',
      rules: [
        { required: false, message: t('codeAddressPlaceholder'), trigger: 'blur' }
      ]
    },
    {
      label: 'tagRegularExp',
      class: 'w450',
      prop: 'tag_regex',
      type: 'text',
      rules: [
        { required: false, message: t('versionNamePlaceholder'), trigger: 'blur' }
      ]
    },
    {
      label: 'codeCredentials',
      class: 'w450',
      prop: 'ticketid',
      type: 'select',
      rules: [
        { required: false, message: t('versionNamePlaceholder'), trigger: 'blur' }
      ]
    },
    {
      label: 'relyOn',
      prop: 'rely',
      type: 'slot',
      rules: [
        { required: false, message: t('relyPlaceholder'), trigger: 'blur' }
      ]
    },
    {
      label: 'webhook',
      prop: 'webhook',
      type: 'slot',
      rules: [
        { required: false, message: t('relyPlaceholder'), trigger: 'blur' }
      ]
    },
    {
      label: 'buildImage',
      prop: 'buildimage',
      type: 'slot',
      data: [{ id: 'centos:5', name: 'centos:5' }, { id: 'centos:6', name: 'centos:6' }, { id: 'centos:7', name: 'centos:7' }],
      rules: [
        { required: false, message: t('buildImageMessage'), trigger: 'blur' }
      ]
    },
    // {
    //   label: 'deployConfig',
    //   prop: 'ci_type_open',
    //   type: 'slot',
    //   data: [],
    //   rules: [
    //     { required: false, message: t('buildImageMessage'), trigger: 'blur' }
    //   ]
    // },
    // 发布类型配置

  ]
}

export const NAME_SPACE_FORM_CONFIG = {
  width: '750px',
  title: t('createNameSpace'),
  // noFooter: true,
  noDefaultFooter: true,
  form: {
    labelWidth: '100',
    gutter: 20,
    width: 120,
    config: [
      {
        label: 'name',
        class: 'w450',
        prop: 'nameSpace',
        type: 'text',
        rules: [
          { required: true, message: `${t('configFormInput')}${t('name')}`, trigger: 'blur' }
        ]
      }
    ]
  }
}

export const EDIT_RELY_MODEL_THEAD: Array<any> = [
  { prop: 'addr', width: 200, label: t('codeRepoAddress'), align: 'center' },
  { prop: 'path', label: 'subdir', align: 'center' },
  { prop: 'tags', label: 'tags', align: 'center' },
  { prop: 'ticketname', label: t('credential'), align: 'center' },
  { prop: 'edit_user', label: t('editorOwner'), align: 'center' },
  { prop: 'edit_time', label: t('editorTime'), align: 'center' },
  { type: 'slot', prop: 'operation', label: t('operate'), align: 'center' },
]

export const tempdata0 = {
  plugin_type: 'approval',
  name: "发布审批",
  cont: "发布审批：${stepname}\n\n提交人：${submitter};\n\n流水线名: ${flowname};\n服务树名称: ${treename};\n\n发布版本: ${version};\n${rollback}\n\n发布环境: ${deploy_env}\n\n发现tag的时间: ${tagtime}\n打tag的人: ${tagger}\n发布版本tag信息: ${taginfo}\n",
  everyone: "on",
  timeout: "86400",
  deployenv: "always",
  action: "deploy",
  batches: "always",
  relaxed: 'off',
  approver: '',
}

export const tempdata1 = {
  plugin_type: 'cmd',
  name: "kubernetes发布",
  user: "0",
  node_type: "builtin",
  node_cont: "openc3skipnode",
  scripts_type: "buildin",
  scripts_cont: "#!kubernetes",
  scripts_argv: "deploy $version",
  timeout: "1800",
  pause: "",
  deployenv: "always",
  action: "always",
  batches: "always",
}

export const tempdata2 = {
  plugin_type: 'cmd',
  name: "检查kubernetes发布状态",
  user: "0",
  node_type: "builtin",
  node_cont: "openc3skipnode",
  scripts_type: "buildin",
  scripts_cont: "#!kubernetes",
  scripts_argv: "check $version",
  timeout: "300",
  pause: "",
  deployenv: "always",
  action: "always",
  batches: "always",
}
