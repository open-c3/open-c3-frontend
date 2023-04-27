<template>
  <Drawer v-bind="$attrs" :title="title" :loading="loading" @close="cancel" width="850px">
    <template #content>
      <base-form class="mt30" ref="form" :config="config.form" :params="params">
        <template #btn>
          <el-button type="primary" @click="manualInputSearch">{{ $t('enterQueryManually') }}</el-button>
          <el-button @click="addressReset">{{ $t('reset') }}</el-button>
          <el-button type="primary" @click="onOpenTerminal">{{ $t('openHostTerminal') }}</el-button>
        </template>
      </base-form>
      <!-- 文件目录信息 -->
      <el-card class="mt30">
        <template #header> {{ $t('fileDirectoryInfo') }} </template>
        <div>
          <Table :thead="tableConfig.thead" :data="tableConfig.list" :highlight-current-row="false"
            :tableLoading="tableConfig.loading">
            <template #operate="scope">
              <div>
                <el-button v-if="(scope as any).row.type === 'parent'" type="primary" link @click="backdir()">
                  {{ $t('backPerviousLevel') }}
                </el-button>
                <el-button v-if="(scope as any).row.type === 'dir'" type="primary" link
                  @click="intodir((scope as any).row.path)">{{ $t('goTo') }}</el-button>
                <el-button v-if="(scope as any).row.type === 'file'" type="primary" link
                  @click="uploadOperate('download', (scope as any).row)">
                  {{ $t('download') }}
                </el-button>
                <el-button v-if="(scope as any).row.type === 'file'" type="primary" link
                  @click="deleteItems((scope as any).row)">
                  {{ $t('deleteFiles') }}
                </el-button>
              </div>
            </template>
          </Table>
        </div>
      </el-card>

      <!-- 上传文件管理 -->
      <el-card class="mt30">
        <template #header> {{ $t('fileManagement') }} </template>
        <div>
          <div class="df jc_fe">
            <el-upload :action="action" :headers="headers" :show-file-list="false" :before-upload="beforeUpload"
              :on-success="uploadSuccess">
              <el-button class="mb16" :loading="uploadLoading" type="primary" icon="upload">
              {{ $t('uploadFile')}}
              </el-button>
            </el-upload>
          </div>
          <Table :thead="uploadConfig.thead" :data="uploadConfig.list" :highlight-current-row="false"
            :tableLoading="uploadConfig.loading">
            <template #size="scope">
              <div>
                {{ bytesToSize((scope as any).row.size) || '-' }}
              </div>
            </template>
            <template #operate="{ row }">
              <el-button @click="uploadOperate('upload', row)" link type="primary">{{ $t('upload') }}</el-button>
              <el-button @click="download(row.name)" link type="primary">{{ $t('download') }}</el-button>
              <el-button @click="deleteFun(row.id)" link type="primary">{{ $t('delete') }}</el-button>
            </template>
          </Table>
        </div>
      </el-card>

      <!-- 今日任务信息 -->
      <el-card class="mt30">
        <template #header>{{ $t('nowDaysTask') }} </template>
        <div>
          <Table :thead="taskConfig.thead" :data="taskConfig.list" :highlight-current-row="false"
            :tableLoading="taskConfig.loading">
          </Table>
        </div>
      </el-card>
    </template>
    <template #footer>
      <!-- <el-button>12</el-button> -->
    </template>
  </Drawer>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, watch, getCurrentInstance, computed } from 'vue'
import moment from 'moment'
import store from '@/store'
import Drawer from '@/components/drawer/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import Table from '@/components/table/index.vue'
import { bytesToSize, g_url } from '@/utils'
import { ElMessageBox } from 'element-plus'
import {
  SEND_FILE_SEARCH_CONFIG,
  DRAWER_FILE_TABLE_THEAD,
  DRAWER_UPLOAD_TABLE_THEAD,
  DRAWER_TASK_TABLE_THEAD
} from '../config'
import {
  getJobSendFileList,
  getJobTaskList,
  deleteFileListItem,
} from '@/api/implement/sendfile'
import {
  districtbuttonFile
} from '@/api/implement/index'
import {
  getFileServer,
  getDownloadUrl,
  deleteFile,
} from '@/api/business/file'
import {
  DistrictGileInfo,
  FileListInfo
} from '@/api/interface/implement'

export default {
  components: { Drawer, baseForm, Table },
  emits: ['cancel', 'addSuccess'],
  props: {
    info: {
      type: Object,
      default: null
    },
    treeId: {
      type: String,
      default: '4000000000',
    },
  },
  setup(props, context) {
    const { proxy } = getCurrentInstance()
    const treeData = computed(() => { return store.getters.treeData })
    const state = reactive({
      title: 'newJob',
      params: {
        address: props.info.selectIp,
      },
      config: SEND_FILE_SEARCH_CONFIG,
      loading: false,
      uploadLoading: false,
      scriptStepFlag: true,
      tableConfig: {
        loading: false,
        list: [],
        thead: [...DRAWER_FILE_TABLE_THEAD],
      },
      uploadConfig: {
        loading: false,
        list: [],
        thead: [...DRAWER_UPLOAD_TABLE_THEAD],
      },
      taskConfig: {
        loading: false,
        list: [],
        thead: [...DRAWER_TASK_TABLE_THEAD],
      },
      action: `/api/job/uploadv2/fileserver/${store.getters.treeId}`,
      headers: { 'Content-Type': undefined },

    })

    const sendParams: FileListInfo = {
      treeId: props.treeId,
      filepath: state.params.address,
      selectUser: props.info.selectUser,
    }

    // 获取文件目录列表 
    const getFileListData = async () => {
      state.tableConfig.loading = true
      const dataRet = await getJobSendFileList(sendParams).catch(err => { state.tableConfig.loading = false, state.tableConfig.list = []})
      state.tableConfig.loading = false
      if (dataRet) {
        state.tableConfig.list = dataRet.reverse()
      }
    }

    // 获取今日任务列表
    const getTodayTaskData = async () => {
      const params = {
        name: 'sendfile',
        time_start: moment().format('YYYY-MM-DD')
      }
      const dataRet = await getJobTaskList(props.treeId, params).catch(err => { state.taskConfig.loading = false, state.taskConfig.list = []})
      if (dataRet) {
        state.taskConfig.list = dataRet.reverse()
      }
    }

    // 获取上传文件管理列表
    const getUploadData = async () => {
      state.uploadConfig.loading = true
      const dataRet = await (getFileServer(Number(props.treeId), {}) as any).catch(err => { state.uploadConfig.loading = false, state.uploadConfig.list = []})
      state.uploadConfig.loading = false
      if (dataRet) {
        state.uploadConfig.list = dataRet.reverse()
      }
    }

    // 文件分发上传
    const uploadOperate = (type: string, row: any) => {
      let temppath = state.params.address.split("/");
      let temphost = temppath.shift();
      let filepath = temppath.join("/");
      const uploadParams: DistrictGileInfo = {
        chmod: '644',
        chown: props.info.selectUser,
        dp: `/${filepath}/`,
        dst: temphost,
        dst_type: 'builtin',
        name: `sendfile_upload_${state.params.address}/${row.name}`,
        sp: row.name,
        src: '',
        src_type: 'fileserver',
        timeout: 300,
        user: props.info.selectUser
      }
      const downParams: DistrictGileInfo = {
        ...uploadParams,
        dp: '/tmp/abc/',
        dst_type: 'builtin',
        name: `sendfile_download_${state.params.address}/${row.path}`,
        sp: `/${filepath}/${state.params.address}`,
        src: temphost,
        src_type: 'builtin',
      }
      ElMessageBox.confirm(proxy.$t('distributionFileMessage'), proxy.$t('distributionFile'), {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel')
      }).then(async () => {
        const dataRet = await districtbuttonFile(props.treeId, type === 'upload' ? uploadParams : downParams)
        if (dataRet) {
          proxy.$notification(proxy.$t('operationSuccess'))
        }
      })
    }

    const download = (name: string) => {
      getDownloadUrl(Number(props.treeId), name).then(res => {
        window.open(`${g_url}/api/job/download/${res}`, '_blank')
      })
    }
    // 开始上传
    const beforeUpload = () => {
      state.uploadLoading = true
    }
    // 上传成功
    const uploadSuccess = () => {
      proxy.$notification('success')
      state.uploadLoading = false
      getUploadData()
    }

    const deleteFun = (id) => {
      ElMessageBox.confirm(proxy.$t('deleteFile'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel')
      }).then(() => {
        state.tableConfig.loading = true
        deleteFile(Number(props.treeId), id).then(res => {
          proxy.$notification('success')
          getUploadData()
        }).finally(() => {
          state.tableConfig.loading = false
        })
      })
    }

    //   进入文件目录下一层
    const intodir = (path: string) => {
      state.params.address = `${state.params.address}/${path}`
      defaultOnload()
    }
    // 返回文件目录上一层
    const backdir = () => {
      let temppath = state.params.address.split("/")
      temppath.pop();
      state.params.address = temppath.join("/")
      if (temppath.length === 0) {
        context.emit('cancel')
        return
      }
      defaultOnload()
    }

    //手动输入查询
    const manualInputSearch = () => {
      if (!state.params.address) {
        proxy.$notification(proxy.$t('inputAddressMessage'))
        return
      }
      defaultOnload()
    }

    // 重置
    const addressReset = () => {
      state.params.address = ''
      defaultOnload()
    }

    // 打开终端
    const onOpenTerminal = () => {
      let temppath = state.params.address.split("/");
      let name = temppath.shift();
      let terminalAddr = `${window.location.protocol}//${window.location.host}/api/job/cmd/`
      let str = `${props.treeId}?node=${name}&bash=1&sudo=${props.info.selectIp}${window.location.protocol}//${window.location.host}`
      window.open(terminalAddr + str, '_blank')
    }

    // 文件目录操作
    const deleteItems = (path: string) => {
      ElMessageBox.confirm(proxy.$t('deleteFile'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel')
      }).then(() => {
        state.tableConfig.loading = true
        deleteFileListItem(sendParams).then(res => {
          proxy.$notification('success')
          getUploadData()
        }).finally(() => {
          state.tableConfig.loading = false
        })
      })
    }

    const defaultOnload = () => {
      getFileListData()
      getUploadData()
      getTodayTaskData()
    }
    onMounted(() => {
      defaultOnload()
    })

    const cancel = () => { // 关闭弹框
      context.emit('cancel')
    }

    return {
      treeData,
      ...toRefs(state),
      cancel,
      confirm,
      download,
      deleteFun,
      bytesToSize,
      beforeUpload,
      uploadSuccess,
      uploadOperate,
      manualInputSearch,
      onOpenTerminal,
      addressReset,
      deleteItems,
      intodir,
      backdir,
    }
  }
}
</script>
<style lang="scss"></style>
