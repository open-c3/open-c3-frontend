import { t } from '@/utils/language'
export const THEAD_CONFIG = Object.freeze([
  { prop: 'name', label: 'imageName', align: 'center' },
  { prop: 'edit_time', label: 'creatorTime', align: 'center' },
  { prop: 'edit_user', label: 'lastEditor', align: 'center' },
  { prop: 'describe', label: 'remark', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
])

export const SEARCH_CONFIG = Object.freeze({
  labelWidth: 0,
  formConfig: [
    {
      label: '',
      prop: 'name',
      type: 'text',
      placeholder: 'imageName'
    },
    {
      label: '',
      prop: 'edit_time',
      type: 'text',
      placeholder: 'creatorTime'
    },
    {
      label: '',
      prop: 'edit_user',
      type: 'text',
      placeholder: 'lastEditor'
    },
    {
      label: '',
      prop: 'describe',
      type: 'text',
      placeholder: 'remark'
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

// 新建镜像
export const ADD_CONFIG = {
  width: '700px',
  title: 'newImage',
  noDefaultFooter: true,
  form: {
    position: 'right',
    gutter: 20,
    labelWidth: 100,
    config: [
      {
        label: 'serialNumber',
        prop: 'id',
        type: 'desc',
        hidden: true,
        span: 24
      },
      {
        label: 'name',
        prop: 'name',
        type: 'text',
        span: 24,
        class: 'w400',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'describe',
        prop: 'describe',
        type: 'text',
        span: 24,
        class: 'w400',
        rules: [
          { required: true, trigger: 'blur', message: t('requiredText') }
        ]
      },
      {
        label: 'Authorization',
        prop: 'share',
        type: 'radio',
        span: 24,
        class: 'w400',
        data: [
          { id: 'private', name: t('onlyIndividualsVisible')},
          { id: 'team', name: t('sharedWithOrganization')},
          { id: 'public', name: t('visiblePublic')}
        ],
        rules: [
          { required: true, trigger: 'change', message: t('requiredText') }
        ]
      }
    ]
  }
}
