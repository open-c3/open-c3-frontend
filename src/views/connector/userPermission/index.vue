
<template>
  <div class="body-layout1">
    <!-- 全局 -->
    <search-from :params="global.params" :config="global.search" @reset="reset('global')" @query="getGlobalList"/>
    <el-divider class="costv-divider mt16 mb16"/>
    <div class="df jc_sb">
      <span>{{ $t('userPermission') }}:【{{ $t('global') }}】</span>
      <span>
        <el-input v-model.trim="global.user" :placeholder="$t('accountLoginName')" class="w360">
          <template #append>
            <el-select v-model="global.level" class="w160">
              <el-option v-for="item in levelAry" :key="item.value" :value="item.value" :label="$t(item.label)"/>
            </el-select>
          </template>
        </el-input>
        <el-button :disabled="global.user === ''" :loading="loading" @click="create('global')" type="primary" icon="plus">{{ $t('addPermission') }}</el-button>
      </span>
    </div>
    <Table :thead="global.thead" :data="global.list" :tableLoading="global.loading" :page="global.page" :pageSize="global.pageSize" :total="global.total" :pageChange="(val) => pageChange(val, 'global')" :pageSizeChange="(val) => pageSizeChange(val, 'global')" class="mt20">
      <template #level="{ row }">
        <span v-if="row.level === '1'">{{ $t('RD') }}</span>
        <span v-if="row.level === '2'" class="c-error">{{ $t('OM') }}</span>
        <span v-if="row.level === '3'" class="c-error">{{ $t('Admin') }}</span>
      </template>
      <template #operate="{ row }">
        <el-button @click="deleteFun(row.name)" link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
    <el-divider class="costv-divider mt16 mb16"/>
    <!-- 服务树相关 -->
    <!-- TREE_SEARCH_CONFIG -->
    <search-from :params="tree.params" :config="tree.search" @reset="reset('tree')" @query="getTreeList"/>
    <el-divider class="costv-divider mt16 mb16"/>
    <div class="df jc_sb">
      <span>{{ $t('userPermission') }}:【{{ $t('treeCorrelation') }}】</span>
      <span>
        <el-input v-model.trim="tree.user" :placeholder="$t('accountLoginName')" class="w360">
          <template #append>
            <el-select v-model="tree.level" class="w160">
              <el-option v-for="item in levelAry" :key="item.value" :value="item.value" :label="$t(item.label)"/>
            </el-select>
          </template>
        </el-input>
        <el-button :disabled="tree.user === ''" :loading="loading" @click="create('tree')" type="primary" icon="plus">{{ $t('addPermission') }}</el-button>
      </span>
    </div>
    <Table :thead="tree.thead" :data="tree.list" :tableLoading="tree.loading" :page="tree.page" :pageSize="tree.pageSize" :total="tree.total" :pageChange="(val) => pageChange(val, 'tree')" :pageSizeChange="(val) => pageSizeChange(val, 'tree')" class="mt20">
      <template #level="{ row }">
        <span v-if="row.level === '1'">{{ $t('RD') }}</span>
        <span v-if="row.level === '2'" class="c-error">{{ $t('OM') }}</span>
        <span v-if="row.level === '3'" class="c-error">{{ $t('Admin') }}</span>
      </template>
      <template #operate="{ row }">
        <el-button @click="deleteUserTree(row.id)" link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import { getUserAuthList, addUserAuth, deleteUserAuth, getUserTreeAuthList, addUserTreeAuth, deleteUserTreeAuth } from '@/api/connector/userPermission'
import { SEARCH_CONFIG, THEAD_CONFIG, TREE_THEAD_CONFIG, TREE_SEARCH_CONFIG } from './config'
import { ElMessageBox } from 'element-plus'
import store from '@/store'
export default {
  components: { searchFrom, Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      levelAry: [
        { label: 'RDrole', value: '1'},
        { label: 'OMrole', value: '2'},
        { label: 'Admin', value: '3'}
      ],
      treeParams: {

      },
      global: {
        search: SEARCH_CONFIG,
        params: {
          name: ''
        },
        level: '1',
        user: '',
        loading: false,
        thead: THEAD_CONFIG,
        total: 0,
        list: [],
        filterList: [],
        allList: [],
        page: 1,
        pageSize: 10
      },
      tree: {
        search: TREE_SEARCH_CONFIG,
        params: {
          id: '',
          name: '',
          tree: '',
          treename: ''
        },
        level: '1',
        user: '',
        loading: false,
        thead: TREE_THEAD_CONFIG,
        total: 0,
        list: [],
        filterList: [],
        allList: [],
        page: 1,
        pageSize: 10
      },
      loading: false
    })
    const pageChange = (page: number, type: string) => {
      state[type].page = page
      state[type].list = state[type].filterList.slice((state[type].page - 1) * state[type].pageSize, state[type].page * state[type].pageSize)
    }
    const pageSizeChange = (pageSize: number, type: string) => {
      state[type].pageSize = pageSize
      pageChange(1, type)
    }
    const getGlobalList = () => {
      getUserAuthList().then((res: any) => {
        state.global.allList = res.reverse()
        state.global.filterList = state.global.allList.filter(item => item.name.includes(state.global.params.name))
        state.global.total = state.global.filterList.length
        pageChange(1, 'global')
      })
    }
    const getTreeList = () => {
      getUserTreeAuthList().then((res: any) => {
        state.tree.allList = res.reverse()
        state.tree.filterList = res.reverse()
        state.tree.total = state.global.filterList.length
        pageChange(1, 'tree')
      })
    }
    const reset = (type) => { // 重置
      if (type === 'tree') {
        state.tree.params = {
          id: '',
          name: '',
          tree: '',
          treename: ''
        }
        getTreeList()
      } else {
        state.global.params = {
          name: ''
        }
        getGlobalList()
      }
    }
    // 添加
    const create = (type: string) => {
      const params = {
        global: {user: state.global.user, level: state.global.level},
        tree: {user: state.tree.user, level: state.tree.level, tree: store.getters.treeId}
      }
      const apiFun = {
        global: addUserAuth,
        tree: addUserTreeAuth
      }
      const success = {
        global: getGlobalList,
        tree: getTreeList
      }
      state[type].loading = true
      apiFun[type](params[type]).then(res => {
        proxy.$notification('success')
        success[type]()
        state[type].user = ''
      }).finally(() => {
        state[type].loading = false
      })
    }
    // 删除用户权限
    const deleteFun = (name: string) => {
      ElMessageBox.confirm(proxy.$t('deleteUserAuth'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        deleteUserAuth(name).then(res => {
          proxy.$notification('success')
          getGlobalList()
        })
      })
    }
    // 删除用户权限
    const deleteUserTree = (id: number) => {
      ElMessageBox.confirm(proxy.$t('deleteUserAuth'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        deleteUserTreeAuth(id).then(res => {
          proxy.$notification('success')
          getTreeList()
        })
      })
    }
    onMounted(() => {
      getGlobalList()
      getTreeList()
    })
    return {
      ...toRefs(state),
      getGlobalList,
      reset,
      pageChange,
      pageSizeChange,
      create,
      deleteFun,
      getTreeList,
      deleteUserTree
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
