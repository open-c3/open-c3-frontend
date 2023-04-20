import { t } from '@/utils/language';
import { LastBuildColorProps } from '@/api/interface/quickentry';

export const PANEL_COLOR: LastBuildColorProps = {
  success: 'var(--color_text_success)',
  fail: 'var(--color_text_danger)',
  refuse: 'var(--color_text_warning)',
  running: 'var(--color-chart-14)',
  decision: 'var(--color_text_primary)',
  ignore: 'var(--el-text-color-primary)',
};

export const FLOW_LINE_LIST_TABLE_HEADER: Array<any> = [
  { type: 'slot', prop: 'name', width: 200, label: t('name'), align: 'center' },
  { type: 'slot', prop: 'audit_level', label: t('audit'), align: 'center' },
  { type: 'slot', prop: 'alias', label: t('alias'), align: 'center' },
  {
    type: 'slot',
    prop: 'ci_type_namespace',
    label: t('namespace'),
    align: 'center',
  },
  {
    type: 'slot',
    prop: 'ci_type',
    label: t('application'),
    width: 160,
    align: 'center',
  },
  {
    type: 'slot',
    prop: 'lastbuild',
    label: t('ciStatus'),
    width: 160,
    align: 'center',
  },
  {
    type: 'slot',
    prop: 'taskInfoTest',
    label: t('testEnvStat'),
    width: 300,
    align: 'center',
  },
  {
    type: 'slot',
    prop: 'taskInfoOnline',
    label: t('onlineEnvStat'),
    width: 300,
    align: 'center',
  },
  { prop: 'edit_user', label: t('editor'), align: 'center' },
  { prop: 'id', label: t('serialNumber'), align: 'center' },
  { type: 'slotTable', prop: 'operation', label: t('operate'), width: 200, align: 'center' },
];

export const SEARCH_PIPLINE_THEAD: Array<any> = [
  { type: 'slot', prop: 'id', label: 'ID', align: 'left' },
  { type: 'slot', prop: 'name', label: t('name'), align: 'left' },
  { type: 'slot', prop: 'audit_level', label: t('audit'), align: 'center' },
  { type: 'slot', prop: 'alias', label: t('alias'), align: 'center' },
  { type: 'slot', prop: 'treename', label: t('treename'), align: 'center' },
  { type: 'slot', prop: 'addr', label: t('codeRepoAddress'), align: 'center' },
  { type: 'slot', prop: 'edit_user',label: t('editor'), align: 'center' },
]


export const TEMPLATE_PIPLINE_THEAD: Array<any> = [
  { prop: 'id', width: 200, label: 'ID', align: 'left' },
  { prop: 'name', width: 200, label: t('name'), align: 'center' },
  { type: 'slot', prop: 'edit_user', width: 200, label: t('editor'), align: 'center' },
  { type: 'slot', prop: 'operation', label: t('operate'), width: 200, align: 'center' },
]

export const DEPLOYMENT_DESCRIBE_NEWPOD_THEAD: Array<any> = [
  { prop: 'NAME', width: 200, label: t('newContainer'), align: 'center' },
  { prop: 'READY', label: 'READY', align: 'center' },
  { type: 'slot', prop: 'STATUS', label: 'STATUS', align: 'center' },
  { prop: 'RESTARTS', width: 200, label: 'RESTARTS', align: 'center' },
  { prop: 'AGE', label: 'AGE', align: 'center' },
  { type: 'slot', prop: 'operation', width: 200, label: t('operate'), align: 'center' },
]

export const DEPLOYMENT_DESCRIBE_OLDPOD_THEAD: Array<any> = [
  { type: 'slotTable', prop: 'NAME', width: 200, label: t('oldContainer'), sortable: true, align: 'center' },
  { type: 'slotTable', prop: 'READY', label: 'READY', sortable: true, align: 'center' },
  { type: 'slotTable', prop: 'STATUS', label: 'STATUS', sortable: true, align: 'center' },
  { type: 'slotTable', prop: 'RESTARTS', label: 'RESTARTS', sortable: true, align: 'center' },
  { type: 'slotTable', prop: 'AGE', label: 'AGE', sortable: true, align: 'center' },
  { type: 'slot', prop: 'operation', width: 200, label: t('operate'), align: 'center' },
]

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

export const SEARCH_LINE_DIALOG_CONFIG = {
  width: '1000px',
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

export const CREATE_BLANK_LINE_CONFIG = {
  width: '500px',
  title: t('createNewLine'),
  form: {
    labelWidth: '100',
    gutter: 20,
    width: 120,
    config: [
      {
        label: 'flowLineName',
        class: 'w450',
        prop: 'name',
        type: 'text',
        rules: [
          { required: true, message: t('flowLineNamePlaceholder'), trigger: 'blur' }
        ]
      }
    ]
  }
}

export const TEMPLATE_BUILD_LINE_CONFIG = {
  width: '50%',
  title: t('createTemplateLine'),
  form: {
    labelWidth: '100',
    gutter: 20,
    width: 120,
    config: [
      {
        label: 'flowLineName',
        class: 'w450',
        prop: 'name',
        type: 'text',
        rules: [
          { required: true, message: t('flowLineNamePlaceholder'), trigger: 'blur' }
        ]
      }
    ]
  }
}

export const SAVE_TEMPLATE_CONFIG = {
  width: '500px',
  title: t('saveTemplate'),
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

export const SAVE_COPYAS_CONFIG = {
  width: '800px',
  title: t('copyLine'),
  form: {
    labelWidth: '200',
    gutter: 20,
    width: 150,
    config: [
      {
        label: 'flowLineName',
        class: 'w450',
        prop: 'name',
        type: 'text',
        rules: [
          { required: true, message: t('flowLineNamePlaceholder'), trigger: 'blur' }
        ]
      },
      {
        label: 'Switch',
        class: 'w450',
        prop: 'switch',
        type: 'slot',
        rules: [
          { required: true, message: t('switchPlaceholder'), trigger: 'change' }
        ]
      },
      {
        label: 'cloneOtherTree',
        class: 'w450',
        prop: 'selectTree',
        type: 'slot',
        rules: [
          { required: true, message: t('switchPlaceholder'), trigger: 'change' }
        ]
      }
    ]
  }
}

export const TEMPLATE_CREATE_DIALOG_CONFIG = {
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
      },
      {
        label: 'Switch',
        class: 'w450',
        prop: 'switch',
        type: 'slot',
        rules: [
          { required: true, message: t('switchPlaceholder'), trigger: 'change' }
        ]
      }
    ]
  }
}

export const EDIT_NAME_CONFIG = {
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
      },
    ]
  }
}

export const DESCRIBE_MODAL_CONFIG = {
  width: '1100px',
  title: t('information'),
  form: {}
}
export const DESCRIBE_MODAL_DETAIL_CONFIG = {
  width: '1200px',
  title: t('information'),
  form: {},
  noDefaultFooter: true,
}


// id: '',
// name: '',
// alias: '',
// treename: '',
// addr: '',
// edit_user: '',
export const FLOWLINE_FAVORITE_SEARCH = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'id',
      type: 'text',
      placeholder: `${t('configFormInput')}ID`
    },
    {
      label: '',
      prop: 'name',
      type: 'text',
      placeholder: `${t('configFormInput')}${t('name')}`
    },
    {
      label: '',
      prop: 'alias',
      type: 'text',
      placeholder:  `${t('configFormInput')}${t('alias')}`
    },
    {
      label: '',
      prop: 'treename',
      type: 'text',
      placeholder: `${t('configFormInput')}${t('treename')}`
    },
    {
      label: '',
      prop: 'addr',
      type: 'text',
      placeholder:`${t('configFormInput')}${t('codeRepoAddress')}`
    },
    {
      label: '',
      prop: 'edit_user',
      type: 'text',
      placeholder:  `${t('configFormInput')}${t('editor')}`
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

export const FLOWLINE_INDEX_SEARCH = Object.freeze({
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
      prop: 'audit_level',
      type: 'text',
      placeholder: 'audit'
    },
    {
      label: '',
      prop: 'alias',
      type: 'text',
      placeholder: 'alias'
    },
    {
      label: '',
      prop: 'ci_type_namespace',
      type: 'text',
      placeholder: 'namespace'
    },
    {
      label: '',
      prop: 'ci_type',
      type: 'text',
      placeholder: 'application'
    },
    {
      label: '',
      prop: 'edit_user',
      type: 'text',
      placeholder: 'editor'
    },
    {
      label: '',
      prop: 'id',
      type: 'text',
      placeholder: 'serialNumber'
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

export const crollbackversion = (text: string): string => {
  var w = '';
  var re = /\b_rollbackVersion_:.*/;
  if (re.test(text)) {
    var reStr = re.exec(text)[0];
    w = reStr.split(" ")[1]
    var xx = /'/;
    if (xx.test(w)) {
      w = w.split("'")[1]
    }
  }
  return w
}

export const isRollbackTask = (uuid: string): 0 | 1 => {
  uuid = uuid.slice(uuid.length - 1);
  if (64 < uuid.charCodeAt(0) && uuid.charCodeAt(0) < 91) {
    return 1
  } else {
    return 0
  }
};

export const shownum = (num: number): number => {
  if (!num) {
    return 0
  }
  return num
}

export const getNodeValue: (tree: Array<any>, targetKey:any) => any = (tree: Array<any>, targetKey:any): any => {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.id === targetKey) {
      return node
    } else if (node.children && node.children.length > 0) {
      const value = getNodeValue(node.children, targetKey);
      if (value !== null) {
        return value;
      }
    }
  }
  return null;
}