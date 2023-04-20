import { t } from '@/utils/language';
import { DetailTableStatusInfo } from '@/api/interface/quickentry'


export const DETAIL_TABLE_PIPLINE_THEAD: Array<any> = [
  { type: 'slotTable', prop: 'id', width: 100, label: 'ID', align: 'center' },
  { type: 'slotTable', prop: 'name', label: t('version'), width: 200, align: 'center' },
  { prop: 'create_time', width: 150, label: t('findTagTime'), align: 'center' },
  { prop: 'tagger', label: t('tagger'), width: 200, align: 'center' },
  { type: 'slot', prop: 'taginfo', width: 200, label: t('versionInfo'), align: 'center' },
  { prop: 'user', label: t('tagUser'), width: 200, align: 'center' },
  { type: 'slot', prop: 'status', label: t('buildStatus'), width: 200, align: 'center' },
  { type: 'slot', prop: 'taskInfoTest', width: 200, label: t('deployTestEnv'), align: 'center' },
  { type: 'slot', prop: 'taskInfoOnline', width: 200, label: t('deployingOnline'), align: 'center' },
  { type: 'slot', prop: 'taskOnlineEnv', label: t('deployOnlineEnv'), width: 200, align: 'center' },
  // { type: 'expand', prop: 'taskOnlineEnv', label: t('deployOnlineEnv'), width: 200, align: 'center' },
]

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
// echarts 图表颜色
export const CHART_COLORS = ['#757FFF', '#E96464', '#FFDD75', '#38C6C0', ' #8879F0', ' #F39C96', ' #939BFF', '#FFF3C7', '#88D6C8', '#A18DFB', '#E96579', '#F8B96C', '#FAC7AA', '#92DCA1']

export const TAG_VERSION_MODAL_CONFIG = {
  width: '1000px',
  title: t('tagVersion'),
  noDefaultFooter: true,
  form: {}
}

export const ROLLBACK_RELEASE_OPERATE_CONFIG = {
  width: '700px',
  title: t('Deploy'),
  noDefaultFooter: true,
  form: {
    labelWidth: '100',
    gutter: 20,
    width: 120,
    config: [
      {
        label: 'flowAlias',
        class: 'w450',
        prop: 'name',
        type: 'text',
        rules: [
          { required: true, message: t('flowAliasPlaceholder'), trigger: 'blur' }
        ]
      }
    ]
  }
}

export const VERSION_DEPLOY_FORM_CONFIG = {
  labelWidth: '120',
  gutter: 20,
  width: 120,
  config: [
    {
      label: 'deployVersion',
      class: 'w450',
      prop: 'versionName',
      type: 'text',
      rules: [
        { required: true, message: t('versionNamePlaceholder'), trigger: 'blur' }
      ]
    },
    {
      label: 'versionDesc',
      class: 'w450',
      prop: 'versionDesc',
      type: 'text',
      rules: [
        { required: false, message: t('versionDescPlaceholder'), trigger: 'blur' }
      ]
    }
  ]
}

export const FLOWLINE_DETAIL_SEARCH = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'id',
      type: 'text',
      placeholder: 'ID'
    },
    {
      label: '',
      prop: 'name',
      type: 'text',
      placeholder: 'version'
    },
    {
      label: '',
      prop: 'create_time',
      type: 'text',
      placeholder: 'findTagTime'
    },
    {
      label: '',
      prop: 'tagger',
      type: 'text',
      placeholder: 'tagger'
    },
    {
      label: '',
      prop: 'taginfo',
      type: 'text',
      placeholder: 'versionInfo'
    },
    {
      label: '',
      prop: 'user',
      type: 'text',
      placeholder: 'tagUser'
    },
    {
      label: '',
      prop: 'status',
      type: 'text',
      placeholder: 'buildStatus'
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