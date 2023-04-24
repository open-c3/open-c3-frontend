import { t } from '@/utils/language'
export const THEAD_CONFIG = [
  { prop: 'name', label: 'imageName', align: 'center' },
  { prop: 'edit_time', label: 'creatorTime', align: 'center' },
  { prop: 'type', label: 'type', align: 'center' },
  { prop: 'edit_user', label: 'lastEditor', align: 'center' },
  { prop: 'describe', label: 'remark', align: 'center' },
  { prop: 'operate', label: 'operate', align: 'center', type: 'slot' }
]

export const IMPORT_CLUSTERMODAL_CONFIG = {
  width: '1000px',
  title: t('editRely'),
  noDefaultFooter: true,
}

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
      prop: 'type',
      type: 'text',
      placeholder: 'type'
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
