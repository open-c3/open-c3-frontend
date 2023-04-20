<template>
  <Dialog v-bind="$attrs" :config="config" @close="close" @success="searchSuccess">
    <template #content>
      <div>
        <search-from :params="searchParams.params" :config="searchParams.config" @reset="reset" @query="onSearch" />
      </div>
      <!-- <div class="refresh-button">
        <el-button type="primary" :icon="Refresh" @click="getData" link />
      </div> -->
      <Table :thead="SEARCH_PIPLINE_THEAD" :data="searchParams.list" :highlight-current-row="false"
        :tableLoading="loading" :page="searchParams.page" :pageSize="searchParams.pageSize"
        :pageChange="page =>pageChange(page)" :pageSizeChange="size => pageSizeChange(size)" :total="searchParams.total">
        <template #id="{ row }">
          <div class="table-name">
            <svg-icon class="table-name-icon mr10" v-if="!row.favorites" icon-class="collect-empty"
              @click="collectOperate('collect', row)" />
            <svg-icon class="table-name-icon mr10" v-if="row.favorites" icon-class="collect-fill"
              @click="collectOperate('unCollect', row)" />
            {{ row.id || '-' }}
          </div>
        </template>
        <template #name="{ row }">
          <div>
            <el-tooltip effect="dark" :content="`${$t('goTo')}${$t('assembly_line')}${row.name}`" placement="top">
              <div class="box-item" @click="onDetailData(row)">
                {{ row.name || '-' }}
              </div>
              <el-button class="table-name-text hand ellipsis" link type="primary">

              </el-button>
            </el-tooltip>
          </div>
        </template>
        <template #audit_level="{ row }">
          <div :style="`color:var(--color_text_success)`" v-if="row.audit_level === '1'">{{ $t('yes') }}</div>
          <div :style="`color:var(--color_text_danger)`" v-else>{{ $t('no') }}</div>
        </template>
        <template #alias="{ row }">
          <div>{{ row.alias || '-' }}</div>
        </template>
        <template #treename="{ row }">
          <div>{{ row.treename || '-' }}</div>
        </template>
        <template #addr="{ row }">
          <div>{{ row.addr || '-' }}</div>
        </template>
        <template #edit_user="{ row }">
          <div>{{ row.edit_user || '-' }}</div>
        </template>
      </Table>
    </template>
    <template #footer>
      <div>
        <el-button type="primary" @click="close">{{ $t('close') }}</el-button>
      </div>
    </template>
  </Dialog>
  <component :is="opType" :types="opType" :conTypes="configTypes" :treeId="treeId" :treeData="treeData"
    :config="COLLECT_DIALOG_CONFIG" :editItem="editItem" @close="addFavorites = false" @success="searchSuccess"
    v-if="addFavorites" v-model="addFavorites" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import router from '@/router'
import { ElMessageBox } from 'element-plus'
import Dialog from '@/components/dialog/index.vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import Collect from './Collect.vue'
import { Refresh } from '@element-plus/icons-vue'
import { SEARCH_LINE_DIALOG_CONFIG, SEARCH_PIPLINE_THEAD, COLLECT_DIALOG_CONFIG, FLOWLINE_FAVORITE_SEARCH } from '../config'
import { FavoritesInfo } from '@/api/interface/quickentry'
import { getAllFlowLineList, delToFavoriteOperate } from '@/api/quickentry/index'
interface StateInfo {
  detailFrom: {
    name: string;
  };
  lineList: Array<any>;
  loading: boolean;
  editItem: object;
  opType: 'Collect' | 'unCollect';
  configTypes: string;
  addFavorites: boolean;
  searchParams: {
    config?: any,
    pageSize: number,
    page: number
    total: number;
    list: Array<any>,
    params: {
      id: string;
      name: string;
      alias: string;
      treename: string;
      addr: string;
      edit_user: string;
    };
  }
}


export default defineComponent({
  components: {
    Dialog,
    Table,
    Collect,
    searchFrom
  },
  props: {
    config: {
      type: Object,
      default: SEARCH_LINE_DIALOG_CONFIG
    },
    editItem: {
      type: Object,
      default: {}
    },
    treeId: {
      type: String,
      default: '4000000000',
    },
    treeData: {
      type: Object,
      default: {}
    },
  },
  emits: ['success', 'close'],
  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance

    const state: StateInfo = reactive({
      detailFrom: {
        name: ''
      },
      lineList: [],
      loading: false,
      editItem: {},
      opType: 'Collect',
      configTypes: 'Collect',
      addFavorites: false,
      searchParams: {
        config: FLOWLINE_FAVORITE_SEARCH,
        page: 1,
        pageSize: 10,
        total: 0,
        list: [],
        params: {
          id: '',
          name: '',
          alias: '',
          treename: '',
          addr: '',
          edit_user: '',
        }
      }
    })

    const getData = async () => {
      state.loading = true
      const params: FavoritesInfo = { treeId: props.treeId }
      const dataRet = await getAllFlowLineList(params)
      if (dataRet) {
        state.loading = false
        state.lineList = dataRet.reverse()
        state.searchParams.total = dataRet.length
        state.searchParams.list = dataRet.reverse()
      }
    }

    // 流水线操作
    const collectOperate = (type: string, row: any) => {
      state.editItem = row ? JSON.parse(JSON.stringify(row)) : null
      switch (type) {
        case 'collect':
          state.opType = 'Collect'
          state.configTypes = 'Collect'
          state.addFavorites = true
          break
        case 'unCollect':
          ElMessageBox.confirm(proxy?.$t('favoriteDesc'), proxy?.$t('favoriteTitle'), {
            confirmButtonText: proxy?.$t('config_options_confirm'),
            cancelButtonText: proxy?.$t('config_options_cancel'),
            type: 'warning'
          }).then(() => {
            state.loading = true
            delToFavoriteOperate({ ciid: row.id, treeId: props.treeId }).then(data => {
              proxy?.$notification('cancelFavoritesSuccess')
              getData()
            })
          }).catch(() => { })
          break
      }
    }

    const searchSuccess = () => {
      state.addFavorites = false
      getData()
    }

    const close = () => {
      // proxy.$emit('success')
      proxy.$emit('close')
    }
    const pageChange: (page: number) => void = (page: number): void => {
      state.searchParams.page = page
      const list = JSON.parse(JSON.stringify(state.lineList))
      state.searchParams.list = list.slice((state.searchParams.page - 1) * state.searchParams.pageSize, state.searchParams.page * state.searchParams.pageSize)
    }

    const pageSizeChange: (size: number) => void = (size: number): void => {
      state.searchParams.pageSize = size
      pageChange(1)
    }

    const reset: () => void = (): void => {
      state.searchParams.params = {
        id: '',
        name: '',
        alias: '',
        treename: '',
        addr: '',
        edit_user: '',
      }
      pageChange(1)
      state.searchParams.total = state.searchParams.list.length
    }

    const onSearch: () => void = (): void => {
      const newlist = JSON.parse(JSON.stringify(state.lineList))
      const list = newlist.filter(item => {
        return (item.id ? item.id : '')?.includes(state.searchParams.params.id) &&
          (item.name ? item.name : '')?.includes(state.searchParams.params.name) &&
          (item.alias ? item.alias : '')?.includes(state.searchParams.params.alias) &&
          (item.treename ? item.treename : '')?.includes(state.searchParams.params.treename) &&
          (item.edit_user ? item.edit_user : '')?.includes(state.searchParams.params.edit_user) &&
          (item.addr ? item.addr : '')?.includes(state.searchParams.params.addr)
      })
      state.searchParams.list = list
      state.searchParams.total = list.length
    }

    const onDetailData = (row) => {
      router.push(`/quickentry/flowlinedetail/${props.treeId}/${row.id}`)
    }

    onMounted(() => {
      state.detailFrom.name = props.editItem.name
      getData()
    })

    return {
      ...toRefs(state),
      Refresh,
      SEARCH_PIPLINE_THEAD,
      COLLECT_DIALOG_CONFIG,
      SEARCH_LINE_DIALOG_CONFIG,
      close,
      getData,
      onDetailData,
      searchSuccess,
      collectOperate,
      reset,
      onSearch,
      pageChange,
      pageSizeChange,
    }
  }
})
</script>

<style scoped lang="scss">
.refresh-button {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.table-name {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &-icon {
    cursor: pointer;
  }

  &-text {
    margin-left: 10px;
  }
}

.box-item {
  cursor: pointer;
  width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: var(--el-color-primary)
}
</style>