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
            :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize"
            :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange">
            <template #operate="scope">
              <div>

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
              <el-button class="mb16" :loading="uploadLoading" type="primary" icon="upload">{{ $t('uploadFile')
              }}</el-button>
            </el-upload>
          </div>
          <Table :thead="uploadConfig.thead" :data="uploadConfig.list" :highlight-current-row="false"
            :tableLoading="uploadConfig.loading" :page="uploadConfig.page" :pageSize="uploadConfig.pageSize"
            :total="uploadConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange">
            <template #size="scope">
              <div>
                {{ bytesToSize((scope as any).row.size) || '-' }}
              </div>
            </template>
            <template #operate="{ row }">
              <el-button @click="uploadOperate(row)" link type="primary">{{ $t('upload') }}</el-button>
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
            :tableLoading="taskConfig.loading" :page="taskConfig.page" :pageSize="taskConfig.pageSize"
            :total="taskConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange">
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
        total: 0,
        loading: false,
        defaultList: [],
        list: [],
        page: 1,
        pageSize: 10,
        thead: [...DRAWER_FILE_TABLE_THEAD],
      },
      uploadConfig: {
        total: 0,
        loading: false,
        defaultList: [],
        list: [],
        page: 1,
        pageSize: 10,
        thead: [...DRAWER_UPLOAD_TABLE_THEAD],
      },
      taskConfig: {
        total: 0,
        loading: false,
        defaultList: [],
        list: [],
        page: 1,
        pageSize: 10,
        thead: [...DRAWER_TASK_TABLE_THEAD],
      },
      action: `/api/job/uploadv2/fileserver/${store.getters.treeId}`,
      headers: { 'Content-Type': undefined },

    })

    // 获取文件目录列表 
    const getFileListData = async () => {
      const params: FileListInfo = {
        treeId: props.treeId,
        filepath: state.params.address,
        selectUser: props.info.selectUser,
      }
      state.tableConfig.loading = true
      const dataRet = await getJobSendFileList(params).catch(err => { state.tableConfig.loading = false, state.tableConfig.list = [], state.tableConfig.total = 0 })
      state.tableConfig.loading = false
      if (dataRet) {
        state.tableConfig.list = dataRet.reverse()
        state.tableConfig.total = dataRet.length
      }
    }

    // 获取今日任务列表
    const getTodayTaskData = async () => {
      const params = {
        name: 'sendfile',
        time_start: moment().format('YYYY-MM-DD')
      }
      const dataRet = await getJobTaskList(props.treeId, params)
      if (dataRet) {
        state.taskConfig.list = dataRet.reverse()
        state.taskConfig.total = dataRet.length
      }
    }

    // 获取上传文件管理列表
    const getUploadData = async () => {
      state.uploadConfig.loading = true
      const dataRet = await getFileServer(Number(props.treeId), {}) as any
      state.uploadConfig.loading = false
      if (dataRet) {
        state.uploadConfig.list = dataRet.reverse()
        state.uploadConfig.total = dataRet.length
      }
    }

    // 文件分发上传
    const uploadOperate = (row: any) => {
      ElMessageBox.confirm(proxy.$t('distributionFileMessage'), proxy.$t('distributionFile'), {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel')
      }).then(async () => {
        let temppath = state.params.address.split("/");
        let temphost = temppath.shift();
        let filepath = temppath.join("/");
        const params: DistrictGileInfo = {
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
        const dataRet = await districtbuttonFile(props.treeId, params)
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

    const pageChange = () => {

    }

    const pageSizeChange = () => {

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

    // 弹框成功的回调
    const confirm = () => {
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          // addCollector(store.getters.treeId, {}).then(res => {
          //   context.emit('addSuccess')
          //   proxy.$notification('success')
          // }).finally(() => {
          //   state.loading = false
          // })
        }
      })
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
      pageChange,
      pageSizeChange,
      uploadOperate,
      manualInputSearch,
      onOpenTerminal,
      addressReset,
    }
  }
}
</script>
<style lang="scss"></style>
