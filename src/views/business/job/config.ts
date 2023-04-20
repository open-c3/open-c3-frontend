import { t } from '@/utils/language'
export const SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'jobname',
      type: 'text',
      placeholder: 'JobName'
    },
    {
      label: '',
      prop: 'create_user',
      type: 'text',
      placeholder: 'creator'
    },
    {
      label: 'lastModifiedUser',
      prop: 'edit_user',
      type: 'text',
      placeholder: 'editorFullName'
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
  { prop: 'startsAt', label: 'JobName', align: 'center' },
  { prop: 'alertname', label: 'associatedFlow', align: 'center' },
  { prop: 'instance', label: 'step', align: 'center' },
  { prop: 'status', label: 'variable', align: 'center' },
  { prop: 'summary', label: 'createUser', align: 'center' },
  { prop: 'value', label: 'creatorTime', align: 'center' },
  { prop: 'bindTT', label: 'editUser', align: 'center' },
  { prop: 'bindTT', label: 'lastModifiedTime', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])
// 全局变量参数
export const VARIABLE_THEAD_CONFIG = Object.freeze([
  { prop: 'name', label: 'variableName', align: 'center', type: 'slot' },
  { prop: 'value', label: 'variableDefaults', align: 'center', type: 'slot' },
  { prop: 'describe', label: 'variableDescription', align: 'center', type: 'slot' },
  { prop: 'option', label: 'option', align: 'center', type: 'slot' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])
// 新建作业
export const ADD_CONFIG = Object.freeze({
  form: {
    position: 'right',
    gutter: 20,
    // labelWidth: 80,
    config: [
      {
        label: 'JobName',
        prop: 'monitorObject',
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
// 新建脚本步骤
export const ADD_SCRIPT_STEP_CONFIG = Object.freeze({
  title: 'newScriptStep',
  width: '800px',
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 120,
    config: [
      {
        label: 'JobName',
        prop: 'monitorObject',
        type: 'text',
        class: 'w300',
        span: 24
      },
      {
        label: 'scriptSource',
        prop: 'btn',
        type: 'radio',
        data: [
          { name: t('manualEntry'), value: 'manual'},
          { name: t('scriptClone'), value: 'clone'},
          { name: t('localScript'), value: 'local'}
        ],
        span: 24
      },
      {
        label: 'scriptContent',
        prop: 'btn',
        type: 'radio',
        data: [
          { name: 'shell', value: 'shell'},
          { name: 'python', value: 'python'},
          { name: 'perl', value: 'perl'},
          { name: 'php', value: 'php'},
          { name: 'shell', value: 'manual'},
          { name: t('builtIn'), value: 'buildin'},
          { name: t('autoRecognition'), value: 'auto'}
          
        ],
        span: 24
      },
      {
        label: 'executionAccount',
        prop: 'btn',
        type: 'slot',
        span: 24
      },
      {
        label: 'targetMachine',
        prop: 'btn',
        type: 'slot',
        span: 24
      },
      {
        label: 'scriptParameters',
        prop: 'btn',
        type: 'slot',
        span: 24
      },
      {
        label: 'Timeout',
        prop: 'btn',
        type: 'slot',
        span: 24
      },
      {
        label: 'pauseEnd',
        prop: 'btn',
        type: 'slot',
        span: 24
      },
      {
        label: 'effectiveEnv',
        prop: 'btn',
        type: 'slot',
        span: 24
      },
      {
        label: 'effectiveAction',
        prop: 'btn',
        type: 'slot',
        span: 24
      },
      {
        label: 'Batch',
        prop: 'btn',
        type: 'slot',
        span: 24
      }
    ]
  }
})