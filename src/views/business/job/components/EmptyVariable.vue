<template>
  <Dialog v-bind="$attrs" :config="config" @close="cancel" @success="success">
    <template #content>
      <div>
        <Table :thead="tableConfig.thead" :data=tableConfig.list :page="tableConfig.page"
          :pageSize="tableConfig.pageSize" :total="tableConfig.total" :highlightCurrentRow="false">
          <template #order="{ index }">
            {{ (tableConfig.page - 1) * tableConfig.pageSize + index + 1 }}</template>
          <template #name="{ row }">
            <el-input disabled v-model="row.name" />
          </template>
          <template #value="{ row }">
            <el-input v-model="row.value" />
          </template>
          <template #describe="{ row }">
            <el-input disabled v-model="row.describe" />
          </template>
        </Table>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, defineComponent } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'

import {
  EMPTY_VARIABLE_CONFIG,
  EMPTY_TABLE_THEAD,
} from '@/views/business/job/config'


export default defineComponent({
  components: { Dialog, Table },
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  emit: ['close', 'success'],
  setup(props, context) {
    const state = reactive({
      loading: false,
      config: EMPTY_VARIABLE_CONFIG,
      tableConfig: {
        thead: EMPTY_TABLE_THEAD,
        list: [],
        total: 0,
        page: 1,
        pageSize: 10,
      }
    })

    // 获取空变量信息
    const getEmptyData = async () => {
      state.tableConfig.list = props.info.data
      state.tableConfig.total = props.info.data.length
    }

    const cancel = () => {
      context.emit('close')
    }

    const success = () => {
      context.emit('success', state.tableConfig.list)
      cancel()
    }

    onMounted(() => {
      getEmptyData()
    })

    return {
      ...toRefs(state),
      cancel,
      success,
      getEmptyData,
    }
  }
})



</script>

<style lang="scss"></style>