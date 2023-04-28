<template>
  <div class="body-layout1">
    <saas-tabs :label="treeData?.parent" class="mt-20" />
    <div class="layout-content">
      <el-card class="mt20">
        <template #header>
          <div>{{ tabsLabel }}</div>
        </template>
        <div>
          <search-from :params="searchParams.params" :config="searchParams.config" @reset="reset" @query="onSearch"/>
        </div>
        <p class="tr">
          <el-button @click="refresh" icon="refresh" type="primary" />
          <el-button v-if="tabsFlag" @click="handleOperate(null)" type="primary">
            {{ $t('add') }}{{ $t('lightApplication') }}
          </el-button>
        </p>
        <Table :thead="tableConfig.thead" :data="tableConfig.list" :loading="tableConfig.loading" :page="tableConfig.page"
          :pageSize="tableConfig.pageSize" :pageChange="page => pageChange(page)" :total="tableConfig.total"
          :pageSizeChange="size => pageSizeChange(size)">
          <template #treeid="scope">
            <div>
              <div v-if="(scope as any).row.treeid === 0">{{$t('tree')}}</div>
              <div v-else>{{$t('global')}}</div>
            </div>
          </template>
          <template #operate="scope">
            <div>
              <el-button v-if="!tabsFlag" type="primary" link @click="handleOpen((scope as any).row)">
                {{ $t('goTo') }}
              </el-button>
              <el-button v-if="tabsFlag" type="primary" link @click="handleOperate((scope as any).row)">
                {{ $t('edit') }}
              </el-button>
              <el-button v-if="tabsFlag" type="primary" link @click="handleDelete((scope as any).row)">
                {{ $t('delete') }}
              </el-button>
            </div>
          </template>
        </Table>
      </el-card>
    </div>
  </div>
  <LightAppModal v-if="modalFlag" v-model="modalFlag" :treeId="String(treeId)" :info="info" @close="modalFlag = false"
    @confirm="handleConfirm" />
</template>


<script lang="ts">
import { defineComponent, reactive, toRefs, getCurrentInstance, onMounted, computed, ComponentInternalInstance, watch, onBeforeUpdate } from 'vue'
import store from '@/store'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import LightAppModal from './components/LightAppModal.vue'
import {
  LIGHT_APPLICATION_TABLE_THEAD,
  LIGHT_APPLICATION_SEARCH_CONFIG,
  GLOBAL_LIGHT_APPLICATION_SEARCH_CONFIG,
} from './config'
import {
  getSmallApplication,
  deleteVariableById,
  deleteLightApp
} from '@/api/smallapplication/index'
import router from '@/router'
import { ElMessageBox } from 'element-plus'

export default defineComponent({
  components: { Table, searchFrom, LightAppModal },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeId = computed(() => { return store.getters.treeId })
    const treeData = computed(() => { return store.getters.treeData })

    const state = reactive({
      tabsLabel: '',
      tableConfig: {
        thead: [...LIGHT_APPLICATION_TABLE_THEAD],
        list: [],
        defaultList: [],
        total: 0,
        page: 1,
        pageSize: 10,
        loading: false,
      },
      searchParams: {
        params: {
          id: '',
          type: '',
          title: '',
          describe: '',
          create_user: '',
          edit_user: '',
          create_time: '',
          edit_time: '',
          jobname: '',
          projectid: '',
        },
        config: LIGHT_APPLICATION_SEARCH_CONFIG,
      },
      tabsFlag: window.location.hash.includes('global'),
      jobid: '',
      selectTreeId: treeId.value,
      info: null,
      modalFlag: false,
    })

    // 获取轻应用列表
    const getData = async () => {
      const params = {
        treeId: treeId.value
      }
      state.tableConfig.loading = true
      const dataRet = await getSmallApplication(params).catch(err => state.tableConfig.loading = false)
      state.tableConfig.loading = false
      if (dataRet) {
        state.tableConfig.list = dataRet
        state.tableConfig.defaultList = dataRet
        state.tableConfig.total = dataRet.length
      }
    }

    // 添加轻应用 
    const handleOperate = (row: any) => {
      state.modalFlag = true
      state.info = row
    }

    // 刷新 
    const refresh = () => {
      getData()
    }

    const reset = () => {
      state.searchParams.params = {
        id: '',
        type: '',
        title: '',
        describe: '',
        create_user: '',
        edit_user: '',
        create_time: '',
        edit_time: '',
        jobname: '',
        projectid: '',
      }
      getData()
    }

    const onSearch = () => {
      const newlist = JSON.parse(JSON.stringify(state.tableConfig.defaultList))
      const list = newlist.filter(item => {
        return ((item.id ? String(item.id) : '').includes(state.searchParams.params.id)) &&
          ((item.type ? item.type : '').includes(state.searchParams.params.type)) &&
          ((item.title ? item.title : '').includes(state.searchParams.params.title)) &&
          ((item.describe ? item.describe : '')?.includes(state.searchParams.params.describe)) &&
          ((item.create_user ? item.create_user : '').includes(state.searchParams.params.create_user)) &&
          ((item.edit_user ? item.edit_user : '').includes(state.searchParams.params.edit_user)) &&
          ((item.create_time ? item.create_time : '').includes(state.searchParams.params.create_time)) &&
          ((item.edit_time ? item.edit_time : '').includes(state.searchParams.params.edit_time)) && 
          ((item.jobname ? item.jobname : '').includes(state.searchParams.params.jobname)) &&
          ((item.projectid ? item.projectid : '').includes(state.searchParams.params.projectid))
      })
      state.tableConfig.list = list
      state.tableConfig.total = list.length
    }

    const pageChange = (page: number) => {
      state.tableConfig.page = page
      reset()
      const list = JSON.parse(JSON.stringify(state.tableConfig.defaultList))
      state.tableConfig.list = list.slice((state.tableConfig.page - 1) * state.tableConfig.pageSize, state.tableConfig.page * state.tableConfig.pageSize)
    }

    const pageSizeChange = (size: number) => {
      state.tableConfig.pageSize = size
    }

    const handleOpen = (row: any) => {
      state.jobid = row.jobid
      state.selectTreeId = row.projectid
      router.push(`/implement/runtask?jobid=${row.jobid}&projectid=${row.projectid}`)
    }

    const handleDelete = (row: any) => {
      return ElMessageBox.confirm(proxy.$t('lightAppMessage'), `${proxy.$t('delete')}${proxy.$t('lightApplication')}`, {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(async () => {
        await deleteVariableById(row.jobid)
        const dataRet = await deleteLightApp(row.id)
        if (dataRet) {
          proxy.$notification('operationSuccess')
          getData()
        }
      })
    }

    const handleConfirm = () => {
      state.modalFlag = false
      getData()
    }

    const defaultOperate = () => {
      if (state.tabsFlag) {
        state.tabsLabel = `${proxy.$t('edit')}/${proxy.$t('lightApplication')}`
        state.tableConfig.thead.filter(item => ['treeid','projectid', 'title','jobname'].includes(item.prop)).forEach(item => item.hidden = false)
        state.searchParams.config = GLOBAL_LIGHT_APPLICATION_SEARCH_CONFIG
      } else {
        state.tabsLabel = proxy.$t('lightApplication')
        state.tableConfig.thead.filter(item => ['treeid','projectid', 'title','jobname'].includes(item.prop)).forEach(item => item.hidden = true)
        state.searchParams.config = LIGHT_APPLICATION_SEARCH_CONFIG
      }
    }
    onBeforeUpdate(() => {
      state.tabsFlag = window.location.hash.includes('global')
      defaultOperate()
      getData()
    })

    onMounted(() => {
      defaultOperate()
      getData()
    })

    watch(() => treeId.value, (acc, cur) => {
      if (acc !== cur) {
        reset()
      }
    })

    return {
      treeId,
      treeData,
      ...toRefs(state),
      handleOperate,
      refresh,
      pageChange,
      pageSizeChange,
      reset,
      onSearch,
      handleOpen,
      handleDelete,
      handleConfirm,
    }
  }
})
</script>

<style lang="scss">
.layout-content {
  &-operation {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-find {
      font-size: 14px;
    }

    &-create {
      font-size: 14px;
    }
  }

  &-table {
    margin: 20px auto;
  }
}
</style>