<template>
    <div class="data-form-tags">
      <Table v-if="tableConfig[tableType]?.data.length>0" :thead="HOST_ALIASES_GROUP_THEAD" :data="tableConfig[tableType]?.data" :show-header="false">
        <template #ip="{ row, $index }">
          <el-input v-model="row.ip" :placeholder="$t('IPAddress')"/>
        </template>
        <template #symbol="{ row }">
          <div>=</div>
        </template>
        <template #hostnames="{ row, index }">
          <div v-for="(item, indexs) in row.hostnames" :key="item">
            <div class="domain-items">
              <el-input v-model="row.hostnames[indexs]" @change="handleChange($event)" :placeholder="$t('domain')"/>
              <el-button type="primary" link @click="delTagItems(index, indexs, tableType)" class="ml10">{{ $t('delete') }}</el-button>
            </div>
          </div>
        </template>
        <template #operate="{ row, index }">
          <div class="mt5 mb5">
            <el-button @click="addTagItems(index, tableType)" type="primary" link>{{ $t('add') }}</el-button>
            <el-button type="primary" link @click="delTag(index, tableType)">{{ $t('delete') }}</el-button>
          </div>
        </template>
      </Table>
      <el-button @click="addTag(tableType)" type="primary" link class="mt10">{{ $t('add') }}</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Table from '@/components/table/index.vue'
import {
  HOST_ALIASES_GROUP_THEAD,
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
      props.tableConfig[type].data.push({ ip: '', symbol: '=', hostnames: [''] })
    }

    const delTag = (index: number, type: string) => {
      props.tableConfig[type].data.splice(index, 1)
    }

    const addTagItems = ( tabIndex:number, type?: string) => {
      props.tableConfig[type].data[tabIndex].hostnames.push('')
    }

    const delTagItems = (tabIndex:number, index?: number, type?: string) => {
      props.tableConfig[type].data[tabIndex].hostnames.splice(index, 1)
    }

    const handleChange = (event: string) => {
    }

    onMounted(() => {

    })

    return {
      HOST_ALIASES_GROUP_THEAD,
      ...toRefs(state),
      addTag,
      delTag,
      addTagItems,
      delTagItems,
      handleChange,
    }
  }
})
</script>

<style lang="scss" scoped>
.domain-items {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 3px 0;
}
</style>