<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel">
    <template #content>
      <el-input v-model.trim="name" :placeholder="$t('newRegion')" class="w400">
        <template #append>
          <el-button :disabled="name === ''" @click="addRegion" type="primary">{{ $t('add') }}</el-button>
        </template>
      </el-input>
      <Table :thead="thead" :data="list" :tableLoading="tableLoading" class="mt20">
        <template #select="{ row }">
          <el-checkbox v-model="row.select" :key="row.id"></el-checkbox>
        </template>
        <template #operate="{ row }">
          <el-button @click="deleteFun(row.id)" link type="primary">{{ $t('delete') }}</el-button>
        </template>
      </Table>
    </template>
    <template #footer>
      <el-button @click="getData">{{ $t('refresh') }}</el-button>
      <el-button @click="saveFun" type="primary">{{ $t('save') }}</el-button>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, computed, watch, onMounted } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { ADD_REGION_CONFIG, REGION_THEAD_CONFIG } from '@/views/business/agent/config'
import { addCustomizeRegion, getCustomizeRegionList, getRegionTreeRelation, deleteCustomizeRegion, deleteRegionTreeRelation, addRegionTreeRelation } from '@/api/business/agent'
import { ElMessageBox } from 'element-plus'
export default {
  components: { Dialog, Table, baseForm },
  props: {
    treeData: {
      type: Object,
      default: () => null
    }
  },
  emits: ['close', 'update'],
  setup (props, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      config:ADD_REGION_CONFIG,
      loading: false,
      name: '',
      thead: REGION_THEAD_CONFIG,
      list: [],
      tableLoading: false,
      relation: {}
    })
    const cancel = () => { // 关闭弹框
      context.emit('close')
    }
    const addRegion = () => {
      ElMessageBox.confirm(proxy.$t('addRegionDesc', {name: state.name}), proxy.$t('addRegionTitle'), {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        state.loading = true
        addCustomizeRegion(props.treeData.id, { name: state.name}).then(res => {
          getData()
          state.loading = false
        })
      })
    }
    const getData = () => {
      Promise.all([getRegionTreeRelation(props.treeData.id), getCustomizeRegionList(props.treeData.id)]).then((res: any) => {
        state.relation = {}
        res[0].forEach(item => {
          state.relation[item.regionid] = {
            id: item.id,
            projectid: item.projectid
          }
        })
        state.list = res[1].map(item => {
          return {
            id: item.id,
            name: item.name,
            projectid: item.projectid,
            create_time: item.create_time,
            select: state.relation[item.id] && state.relation[item.id].projectid === item.projectid
          }
        })
      })
    }
    const deleteFun = (id: string | number) => {
      ElMessageBox.confirm(proxy.$t('deleteRegionDesc'), proxy.$t('deleteRegionTitle'), {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        state.tableLoading = true
        deleteCustomizeRegion(props.treeData.id, id).then(res => {
          state.tableLoading = false
          getData()
        })
      })
    }
    const saveFun = () => {
      ElMessageBox.confirm(proxy.$t('saveRegionDesc'), proxy.$t('saveRegionTitle'), {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(() => {
        state.list.forEach((item, index) => {
          // 当前选中 并且未保存过
          if (item.select && typeof state.relation[item.id] === 'undefined') {
            addRegionTreeRelation(props.treeData.id, {regionid: item.id}).then(res => {
              console.log(res)
            })
          } else if (!item.select && state.relation[item.id]) {
            deleteRegionTreeRelation(props.treeData.id, item.id).then(res => {
              console.log(res)
            })
          } else if (index + 1 === state.list.length) {
            getData()
          }
        })
      })
    }
    watch(() => props.treeData, val => {
      if (val) {
        state.config.titleParams.title = val.parent
        getData()
      }
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      cancel,
      getData,
      addRegion,
      deleteFun,
      saveFun
    }
  }
}
</script>
<style lang="scss">
</style>
