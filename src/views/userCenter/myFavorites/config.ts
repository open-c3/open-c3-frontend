import { t } from '@/utils/language'
import { LastBuildColorProps } from '@/api/interface/quickentry';
export const SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'id',
      type: 'text',
      placeholder: `${t('configFormInput')}ID`,
    },
    {
      label: '',
      prop: 'name',
      type: 'text',
      placeholder: `${t('configFormInput')}name`
    },
    {
      label: '',
      prop: 'alias',
      type: 'text',
      placeholder: `${t('configFormInput')}alias`
    },
    {
      label: '',
      prop: 'edit_user',
      type: 'text',
      placeholder: `${t('configFormInput')}editorOwner`
    },
    {
      label: '',
      prop: 'treename',
      type: 'text',
      placeholder: `${t('configFormInput')}treename`
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

export const COLLECT_DIALOG_CONFIG = {
  width: '500px',
  title: t('addToFavorites'),
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
// 表头
export const THEAD_CONFIG = [
  { prop: 'id', label: 'ID', align: 'left', type:'slot' },
  { prop: 'name', label: 'name', align: 'center' },
  { prop: 'alias', label: 'alias', align: 'center' },
  { prop: 'treename', label: 'treename', align: 'center', type: 'slot', width:100 },
  { prop: 'lastbuild', label: 'buildStatus', align: 'center', type: 'slot' },
  { prop: 'taskInfoTest', label: 'testEnvStat', align: 'center', type: 'slot' },
  { prop: 'taskInfoOnline', label: 'onlineEnvStat', align: 'center', type: 'slot' },
  { prop: 'edit_user', label: 'editor', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' },
]

export const TAG_VERSION_MODAL_CONFIG = {
  width: '1000px',
  title: t('tagVersion'),
  noDefaultFooter: true,
  form: {}
}

export const PANEL_COLOR: LastBuildColorProps = {
  success: 'var(--color_text_success)',
  fail: 'var(--color_text_danger)',
  refuse: 'var(--color_text_warning)',
  running: 'var(--color-chart-14)',
  decision: 'var(--color_text_primary)',
  ignore: 'var(--el-text-color-primary)',
}

export const SEARCH_LINE_DIALOG_CONFIG = {
  width: '80%',
  title: t('flowVisibleOwner'),
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

const delApace = (text: string): string => {
  return (text && text.trim())
}

export const getciId = (text: string): string => {
  const textArr = text.split('_').filter(delApace)
  if (textArr[0] === 'ci') {
    return textArr[1]
  }
  return ''
}

export const cversion = (text: string): string => {
  let w = '';
  let re = /\bversion:.*/;
  if (re.test(text)) {
    let reStr = re.exec(text)[0];
    w = reStr.split(" ")[1]
    let xx = /'/;
    if (xx.test(w)) {
      w = w.split("'")[1]
    }
  }
  return w
}

export const cjobtype = (text: string): string => {
  let w = '';
  let re = /\b_jobtype_:.*/;
  if (re.test(text)) {
    let reStr = re.exec(text)[0];
    w = reStr.split(" ")[1]
    let xx = /'/;
    if (xx.test(w)) {
      w = w.split("'")[1]
    }
  }
  return w
}