
<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('Image')" class="mt-20"/>
    <search-from :params="params" :config="config" @reset="reset" @query="getList"/>
    <el-divider class="costv-divider mt16 mb16"/>
    <p class="tr">
      <el-button @click="info = null; addFlag = true;" type="primary">{{ $t('newImage') }}</el-button>
    </p>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :page="tableConfig.page" :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange" :pageSizeChange="pageSizeChange"  row-id="id" class="mt20">
      <template #operate="{ row }">
        <el-button @click="info = row; addFlag = true;" link type="primary">{{ $t('edit') }}</el-button>
        <el-button @click="deleteFun(row.id)" link type="primary">{{ $t('delete') }}</el-button>
      </template>
    </Table>
    <add-images v-if="addFlag" v-model="addFlag" :info="info" @success="getList" @close="addFlag = false"/>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import addImages from '@/views/userCenter/images/components/add.vue'
import { THEAD_CONFIG, SEARCH_CONFIG } from '@/views/userCenter/images/config'
import { ElMessageBox } from 'element-plus'
import { getImagesList, deleteImages } from '@/api/userCenter/images'
import { filterAry } from '@/utils/index'
export default {
  components: { searchFrom, Table, addImages },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      params: {
        name: '',
        edit_time: '',
        edit_user: '',
        describe: ''
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
      loading: false,
      addFlag: false,
      info: null
    })
    const getFilterList = () => {
      state.tableConfig.filterList =filterAry(state.tableConfig.allList, state.params)
      state.tableConfig.total = state.tableConfig.filterList.length
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
    const getList = () => {
      state.tableConfig.loading = true
      getImagesList().then((res: any) => {
        state.tableConfig.allList = res.reverse()
        getFilterList()
        state.tableConfig.loading = false
      })
      state.addFlag = false
    }
    const reset = () => { // 重置
      state.params = {
        name: '',
        edit_time: '',
        edit_user: '',
        describe: ''
      }
      getList()
    }
    const deleteFun = (id: string|number) => {
      ElMessageBox.confirm(proxy.$t('deleteImage'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        state.loading = true
        deleteImages(id).then(res => {
          proxy.$notification('operationSuccess')
          state.loading = false
          getList()
        })
      }).catch(() => {})
    }
    onMounted(() => {
      getList()
    })
    return {
      ...toRefs(state),
      getList,
      reset,
      pageChange,
      pageSizeChange,
      deleteFun
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
