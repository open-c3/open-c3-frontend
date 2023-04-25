<template>
  <Drawer v-bind="$attrs" :loading="loading"  width="800px">
    <template #drawerHeader>
      <div class="el-drawer__header">
        <span class="el-drawer__title">
          {{ treeData?.parent }} {{ $t('region') }}: {{ info.region }}
        </span>
        <el-icon @click="cancel" class="el-drawer__close-btn"><Close /></el-icon>
      </div>
    </template>
    <template #content>
      <p class="df jc_sb">
        <el-input v-model.trim="install.ip" :placeholder="$t('multipleIP')" class="w400">
          <template #append>
            <el-button @click="addProxy" :disabled="install.ip === ''" type="primary">{{ $t('importProxy') }}</el-button>
          </template>
        </el-input>
        <el-button @click="treeHostFlag = true" type="primary">{{ $t('tree') }}</el-button>
      </p>
      <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange" class="mt20">
        <template #version="{ row }">
          {{ row.version || $t('unknown') }}
        </template>
        <template #status="{ row }">
          {{ row.status === 'success' ? $t('Success') : $t('Fail') }}
        </template>
        <template #operate="{ row }">
          <el-button @click="deleteProxy(row.id)" type="primary" link>{{ $t('delete') }}</el-button>
        </template>
      </Table>
    </template>
    <template #footer>
      <el-button @click="cancel">{{ $t('cancel')}}</el-button>
    </template>
  </Drawer>
  <tree-host v-if="treeHostFlag" v-model="treeHostFlag" :tree-id="treeId" :info="info" :tree-data="treeData" @close="treeHostFlag = false" @confirm="treeHostConfirm"/>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, watch, getCurrentInstance, computed } from 'vue'
import Drawer from '@/components/drawer/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import Table from '@/components/table/index.vue'
import treeHost from '@/views/business/agent/components/treeHost.vue'
import { getAgentProxyList, deleteAgentProxy, addAgentProxy } from '@/api/business/agent'
import { ElMessageBox } from 'element-plus'
import { PROXY_THEAD_CONFIG } from '@/views/business/agent/config'
export default {
  components: { Drawer, baseForm, Table, treeHost },
  emits: ['cancel', 'update'],
  props: {
    info: {
      type: Object,
      default: null
    },
    treeId: {
      type: Number,
      default: ''
    },
    treeData: {
      type: Object,
      default: () => null
    }
  },
  setup (props, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      loading: false,
      tableConfig: {
        loading: false,
        thead: PROXY_THEAD_CONFIG,
        total: 0,
        list: [],
        allList: [],
        page: 1,
        pageSize: 10
      },
      install: {
        username: 'root',
        ip: ''
      },
      treeHostFlag: false
    })
    const pageChange = (page: number) => {
      state.tableConfig.page = page
      state.tableConfig.list = state.tableConfig.allList.slice((state.tableConfig.page - 1) * state.tableConfig.pageSize, state.tableConfig.page * state.tableConfig.pageSize)
    }
    const pageSizeChange = (pageSize: number) => {
      state.tableConfig.pageSize = pageSize
      pageChange(1)
    }
    const cancel = () => { // 关闭弹框
      context.emit('cancel')
    }
    const treeHostConfirm = (ip: Array<string>) => {
      if (ip.length) {
        state.install.ip = ip.toString()
      }
      state.treeHostFlag = false
    }
    
    // 删除代理
    const deleteProxy = (id: number) => {
      ElMessageBox.confirm(proxy.$t('deleteProxyDesc'), proxy.$t('deleteProxyTitle'), {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        state.tableConfig.loading = true
        deleteAgentProxy(props.treeId, id).then(res => {
          proxy.$notification('operationSuccess')
          state.tableConfig.loading = false
          getData()
          context.emit('update')
        })
      })
    }
    // 添加代理
    const addProxy = () => {
      state.loading = true
      addAgentProxy(props.treeId, props.info.id, state.install).then(res => {
        state.install.ip = ''
        proxy.$notification('operationSuccess')
        getData()
        state.loading = false
        context.emit('update')
      })
    }
    const getData = () => {
      state.tableConfig.loading = true
      getAgentProxyList(props.treeId, props.info.id).then((res: any) => {
        state.tableConfig.allList = res
        state.tableConfig.total = res.length
        state.tableConfig.loading = false
        pageChange(1)
      })
    }
    watch(() => props.info, val => {
      if (val) {
        getData()
      }
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      cancel,
      confirm,
      deleteProxy,
      pageChange,
      pageSizeChange,
      addProxy,
      treeHostConfirm
    }
  }
}
</script>
<style lang="scss">
</style>
