
<template>
  <div class="body-layout1">
    <span>{{ treeData?.parent }}</span>
    <el-divider class="costv-divider mt16 mb16"/>
    <search-from :params="params" :config="config" @reset="reset" @query="getList">
      <template #create_user>
        <span class="df">
          <el-input v-model="params.create_user" :placeholder="$t('creatorFullName')"/>
          <el-button @click="setCreateUser" class="ml2">{{ $t('Me') }}</el-button>
        </span>
      </template>
    </search-from>
    <el-divider class="costv-divider mt16 mb16"/>
    <div class="df jc_fe">
      <el-upload :action="action" :headers="headers" :show-file-list="false" :before-upload="beforeUpload" :on-success="uploadSuccess">
        <el-button :loading="uploadLoading" type="primary" icon="upload">{{ $t('uploadFile') }}</el-button>
      </el-upload>
      <el-button @click="tokenFlag = true" type="primary" icon="key" class="ml10">{{ $t('tokenManage') }}</el-button>
    </div>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange" class="mt20">
      <template #size="{row}">
        {{ bytesToSize(row.size) }}
      </template>
      <template #operate="{ row }">
        <el-button  @click="download(row.name)" link type="primary">{{ $t('download') }}</el-button>
        <el-button  @click="deleteFun(row.id)" link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
  </div>
  <Token v-if="tokenFlag" v-model="tokenFlag" @close="tokenFlag = false"/>
</template>
<script lang="ts">
import { reactive, toRefs, computed, watch, getCurrentInstance } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import Token from '@/views/business/file/components/token.vue'
import store from '@/store'
import { g_url } from '@/utils/index'
import { getFileServer, getDownloadUrl, deleteFile } from '@/api/business/file'
import { SEARCH_CONFIG, THEAD_CONFIG } from './config'
import { ElMessageBox } from 'element-plus'
export default {
  components: { searchFrom, Table, Token },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      action: `/api/job/uploadv2/fileserver/${store.getters.treeId}`,
      headers: {'Content-Type': undefined},
      uploadLoading: false,
      params: {
        name: '',
        create_user: '',
        create_time_start: '',
        create_time_end: '',
      },
      config: SEARCH_CONFIG,
      tableConfig: {
        loading: false,
        thead: THEAD_CONFIG,
        total: 0,
        list: [],
        allList: [],
        filterList: [],
        page: 1,
        pageSize: 10
      },
      tokenFlag: false
    })
    const treeId = computed(() => {
      return store.getters.treeId
    })
    const treeData = computed(() => {
      return store.getters.treeData
    })
    const setCreateUser = () => {
      state.params.create_user = store.getters.userInfo?.email
    }
    const getFilterList = () => {
      const list = []
      const name = (state.params.name === null || typeof state.params.name === 'undefined') ? '' : state.params.name
      const create_user = (state.params.create_user === null || typeof state.params.create_user === 'undefined') ? '' : state.params.create_user
      const create_time_start = (state.params.create_time_start === null || typeof state.params.create_time_start === 'undefined') ? '' : state.params.create_time_start
      const create_time_end = (state.params.create_time_end === null || typeof state.params.create_time_end === 'undefined') ? '' : state.params.create_time_end
      state.tableConfig.allList.forEach(item => {
        if (item.name.includes(name) && item.create_user.includes(create_user)) {
          if (create_time_start === '' && create_time_end === '') {
            list.push(item)
          } else {
            const time = new Date(item.create_time).getTime()
            if (create_time_start === '' && time <= new Date(`${create_time_end} 23:59:59`).getTime()) {
              list.push(item)
            } else if (create_time_end === '' && time >= new Date(create_time_start).getTime()) {
              list.push(item)
            } else if (time >= new Date(create_time_start).getTime() && time <= new Date(`${create_time_end} 23:59:59`).getTime()) {
              list.push(item)
            }
          }
        }
      })
      state.tableConfig.filterList = list
      state.tableConfig.total = list.length
      pageChange(1)
    }
    const pageChange = (page: number) => {
      state.tableConfig.page = page
      state.tableConfig.list = state.tableConfig.filterList.slice((state.tableConfig.page - 1) * state.tableConfig.pageSize, state.tableConfig.page * state.tableConfig.pageSize)
    }
    const pageSizeChange = (pageSize: number) => {
      state.tableConfig.pageSize = pageSize
      pageChange(1)
    }
    // 获取列表
    const getList = () => {
      if (state.params.create_user === '') {
        delete state.params.create_user
      }
      if (state.params.name === '') {
        delete state.params.name
      }
      if (state.params.create_time_start === '' || state.params.create_time_start === null) {
        delete state.params.create_time_start
      }
      if (state.params.create_time_end === '' || state.params.create_time_end === null) {
        delete state.params.create_time_end
      }
      getFileServer(treeId.value, state.params).then((res: any) => {
        state.tableConfig.allList = res.reverse()
        // state.tableConfig.total = state.tableConfig.allList.length
        getFilterList()
      })
    }
    const reset = () => { // 重置
      state.params = {
        name: '',
        create_user: '',
        create_time_start: '',
        create_time_end: ''
      }
      getList()
    }
    // 删除文件
    const deleteFun = (id) => {
      ElMessageBox.confirm(proxy.$t('deleteFile'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel')
      }).then(() => {
        state.tableConfig.loading = true
        deleteFile(treeId.value, id).then(res => {
          proxy.$notification('success')
          getList()
        }).finally(() => {
          state.tableConfig.loading = false
        })
      })
    }
    const bytesToSize = (bytes: number) => {
      if (bytes === 0) return '0 B';
      const  k = 1000 // or 1024
      const  sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const  i = Math.floor(Math.log(bytes) / Math.log(k))
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
    }
    const download = (name: string) => {
      getDownloadUrl(treeId.value, name).then(res => {
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
      getList()
    }
    watch(() => treeId.value, val => {
      getList()
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      getList,
      treeId,
      treeData,
      reset,
      pageChange,
      pageSizeChange,
      setCreateUser,
      deleteFun,
      bytesToSize,
      download,
      beforeUpload,
      uploadSuccess
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
