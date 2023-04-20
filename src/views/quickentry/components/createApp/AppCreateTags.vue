<template>
  <!-- <el-card class="table-card">
    <template #header>
      <span>{{ title }}</span>
    </template> -->
    <div class="data-form-tags">
      <Table :thead="METADATA_THEAD" :data="tableConfig[tableType].data" :show-header="false">
        <template #key="{ row, $index }">
          <el-input v-model="row.key" />
        </template>
        <template #symbol="{ row }">
          <div>=</div>
        </template>
        <template #value="{ row }">
          <div v-if="tableConfig[tableType].condition.flag">
            <el-input v-if="tableConfig[tableType].condition.isCreate" v-model="tableConfig[tableType].condition.value" />
            <el-input v-else v-model="row.value" />
          </div>
          <div v-else>
            <el-input v-model="row.value" />
          </div>
        </template>
        <template #operate="{ row, index }">
          <el-button type="primary" link @click="delTag(index, tableType)">{{ $t('delete') }}</el-button>
        </template>
      </Table>
      <el-button @click="addTag(tableType)" type="primary" link class="mt10">{{ $t('add') }}</el-button>
    </div>
  <!-- </el-card> -->
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Table from '@/components/table/index.vue'
import {
  METADATA_THEAD,
} from '../config'

interface StateInfo {

}

export default defineComponent({
  components: {
    Table,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    tableType: {
      type: String,
      default: '',
    },
    tableConfig: {
      type: Object,
      default: {}
    },
  },
  // emits: ['addTag', 'delTag'],
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const state: StateInfo = reactive({

    })
    const addTag = (type: string) => {
      props.tableConfig[type].data.push({ key: '', symbol: '=', value: '' })
    }

    const delTag = (index: number, type: string) => {
      props.tableConfig[type].data.splice(index, 1)
    }

    onMounted(() => {

    })

    return {
      METADATA_THEAD,
      ...toRefs(state),
      addTag,
      delTag,
    }
  }
})
</script>

<style lang="scss" scoped></style>