<template>
  <div v-bind="$attrs">
    <el-card class="mt10 source-card">
      <template #header>
        <div class="card-header">
          <div class="card-header-title">
            <svg-icon class="mr10" icon-class="source-file" width="16px" height="16px" />
            <span>{{ $t('sourceFile') }}</span>
          </div>
          <div class="card-header-operate">
            <el-button v-for="(item, index) in sourceFileType" :key="index" type="primary" link
              @click="handleSelectSourceType(item.type)">
              {{ item.text }}
            </el-button>
          </div>
        </div>
      </template>
      <Table :thead="sourceFileType[activeName].thead" :data="sourceFileType[activeName].data" class="source-table">
        <template #name="{ row }">
          <div>
            <el-input v-model="row.name" />
          </div>
        </template>
        <template #serverAddress="{ row }">
          <div>
          </div>
        </template>
      </Table>
    </el-card>
  </div>
  <component :is="compType[activeName]" v-if="compFlag" v-model="compFlag" :config="compConfig[activeName]" :compParams="compParams" @close="compClose"
  @success="compSuccess"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Table from '@/components/table/index.vue'
import ShareCard from './ShareCard.vue'
import {
  SHARE_DIALOG_CONFIG,
  SERVER_DIALOG_CONFIG,
  BUILD_DIALOG_CONFIG,
  SCP_SOURCE_FILE_SELECT_TYPE_HEAD
} from '../config'

export default defineComponent({
  components: { Table, ShareCard },
  props: {
    treeId: {
      type: String,
      default: '4000000000'
    }
  },
  setup() {
    const state = reactive({
      tableName: '',
      activeName: 'share',
      compFlag: false,
      compParams: {},
      sourceFileType: SCP_SOURCE_FILE_SELECT_TYPE_HEAD,
      compType: { share: 'ShareCard', server: 'ShareCard', build: 'ShareCard' },
      compConfig: { share: SHARE_DIALOG_CONFIG, server: SERVER_DIALOG_CONFIG, build: BUILD_DIALOG_CONFIG }
    })

    const handleSelectSourceType: (type: string) => void = (type: string): void => {
      state.activeName = type
      state.compFlag = true
    }

    const compClose:() => void = ():void => {
      state.compFlag = false
    }

    const compSuccess:() =>void = ():void => {
      compClose()
    }

    onMounted(() => {
    })

    watch(() => state.activeName, (value) => {
    })
    return {
      ...toRefs(state),
      handleSelectSourceType,
      compClose,
      compSuccess,
    }
  }
})

</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-title {
    display: flex;
    vertical-align: middle;
    align-items: center;
    justify-content: flex-start;
  }
}

.source-table {
  width: 100%;
}

.source-card {
  width: 800px;
}
</style>