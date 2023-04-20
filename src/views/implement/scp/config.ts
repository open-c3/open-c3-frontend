import { t } from "@/utils/language";

export const SCP_SOURCE_FILE_SELECT_TYPE_HEAD = {
  share: {
    type: 'share',
    text: t('selectSharedFile'),
    data: [],
    thead: [
      { prop: 'name', align: 'center', label: t('fileList') },
      { type: 'slot', prop: 'serverAddress', align: 'center', label: t('serverAddress') }
    ]
  },
  server: {
    type: 'server',
    text: t('selectSourceServerFile'),
    data: [],
    thead: [
      { type: 'slot', prop: 'name', align: 'center', label: t('fileList') },
      { type: 'slot', prop: 'serverAddress', align: 'center', label: t('serverAddress') }
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

export const SERVER_DIALOG_CONFIG = {
  title: t('serverFile'),
  width: '1000px',
}

export const BUILD_DIALOG_CONFIG = {
  title: t('serverFile'),
  width: '1000px',
}

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

export const bytesToSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1000 // or 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}