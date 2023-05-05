<template>
  <div class="body-layout1">
    <saas-tabs :label="treeData?.parent" class="mt-20" />
    <div class="layout-content">
      <el-form v-model="sendFileForm" ref="form">
        <el-form-item :label="$t('executionAccount')" prop="name">
          <el-select class="w450" v-model="sendFileForm.name">
            <el-option v-for="(item, index) in allProUsers" :key="index" :label="item.username" :value="item.username" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-card class="mt30 layout-content-card">
        <template #header>
          <div>{{ $t('selectNode') }}</div>
        </template>
        <search-from :params="searchParams.params" :config="searchParams.config" @reset="reset" @query="onSearch" />
        <Table class="mt30" :thead="tableConfig.thead" :data="tableConfig.list" :highlight-current-row="false"
          :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize"
          :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange">
          <template #inip="scope">
            <div>
              <el-button v-if="(scope as any).row.inip" type="primary" link
                @click="operate((scope as any).row, (scope as any).row.inip)">
                {{ (scope as any).row.inip }}
              </el-button>
              <div v-else>-</div>
            </div>
          </template>
          <template #exip="scope">
            <div>
              <el-button v-if="(scope as any).row.exip" type="primary" link
                @click="operate((scope as any).row, (scope as any).row.exip)">
                {{ (scope as any).row.exip }}
              </el-button>
            </div>
          </template>
        </Table>
      </el-card>
    </div>
  </div>
  <FileManageDrawer v-if="drawerFlag" v-model="drawerFlag" :info="drawerInfo" :treeId="String(treeId)"/>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Table from '@/components/table/index.vue'
import searchFrom from '@/components/search/index.vue'
import FileManageDrawer from './components/FileManageDrawer.vue'
import store from '@/store'
import {
  getJobUserList
} from '@/api/implement/index'
import {
  SEND_FILETHEAD,
  NODE_SEARCH_PARAMS,
} from './config'
import { getNodeInfo } from '@/api/monitor/config'
import { TreeIdInfo } from '@/api/interface'

export default defineComponent({
  components: { Table, searchFrom, FileManageDrawer },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeId = computed(() => { return store.getters.treeId })
    const treeData = computed(() => { return store.getters.treeData })
    const state = reactive({
      allProUsers: [],
      sendFileForm: {
        name: 'root'
      },
      tableConfig: {
        total: 0,
        loading: false,
        defaultList: [],
        list: [],
        page: 1,
        pageSize: 10,
        thead: [...SEND_FILETHEAD],
      },
      drawerFlag: false,
      drawerInfo: {},
      searchParams: {
        config: NODE_SEARCH_PARAMS,
        params: {
          name: '',
          type: '',
          inip: '',
          exip: '',
        },
      },
      terminalAddr: `${window.location.protocol}//${window.location.host}/api/job/cmd/`
    })

    // 获取用户信息列表
    const getUserData: () => Promise<void> = async () => {
      const params: TreeIdInfo = { treeId: treeId.value }
      const dataRet = await getJobUserList(params)
      if (dataRet) {
        state.allProUsers = dataRet
      }
    }

    // 获取节点信息列表
    const getNoderData: () => Promise<void> = async () => {
      state.tableConfig.loading = true
      const dataRet = await (getNodeInfo(treeId.value) as any).catch(err => { state.tableConfig.loading = false })
      if (dataRet) {
        state.tableConfig.loading = false
        state.tableConfig.list = dataRet
        state.tableConfig.defaultList = dataRet
        state.tableConfig.total = dataRet.length
      }
    }

    const pageChange = (page: number) => {
      state.tableConfig.page = page
    }

    const pageSizeChange = (size: number) => {
      state.tableConfig.pageSize = size
    }

    const reset = () => {
      state.searchParams.params = {
        name: '',
        type: '',
        inip: '',
        exip: '',
      }
      getNoderData()
    }

    const onSearch = () => {
      const middleList = JSON.parse(JSON.stringify(state.tableConfig.defaultList))
      const filterList = middleList.filter(item => {
        return ((item.name ? item.name : '').includes(state.searchParams.params.name)) &&
          ((item.type ? item.type : '').includes(state.searchParams.params.type)) &&
          ((item.inip ? item.inip : '').includes(state.searchParams.params.inip)) &&
          ((item.exip ? item.exip : '')?.includes(state.searchParams.params.exip))
      })
      state.tableConfig.list = filterList
      state.tableConfig.total = filterList.length
    }

    const operate = (row: any, selectIp:string) => {
      state.drawerFlag = true
      state.drawerInfo = {...row, selectIp,selectUser: state.sendFileForm.name}
    }

    onMounted(() => {
      getUserData()
      getNoderData()
    })

    return {
      SEND_FILETHEAD,
      ...toRefs(state),
      treeId,
      treeData,
      pageChange,
      pageSizeChange,
      operate,
      reset,
      onSearch,
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-content {
  width: 100%;
  margin: 30px auto;

  &-confirm {
    margin-top: 30px;
  }

  &-card {
    width: 100%;
  }
}

.layout-address-table {
  width: 450px;
}

.w450 {
  width: 450px
}
</style>