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
      <Table :thead="sourceFileType[activeName].thead" :data="sourceFileType[activeName].data" class="source-table"
        :tableLoading="sourceFileType[activeName].loading">
        <template #name="{ row }">
          <div>
            <el-input v-model="row.name" />
          </div>
        </template>
        <template #address="{ row }">
          <div v-if="!row.address">{{$t('defultEmpty')}}</div>
          <div v-else>
            <span>{{$t('node')}}</span>：
            <span>{{row.address || '-'}}</span>
          </div>
        </template>
      </Table>
    </el-card>
  </div>
  <component :ref="compType[activeName]" :is="compType[activeName]" v-if="compFlag" v-model="compFlag" :treeId="String(treeId)"
    :config="compConfig[activeName]" :radioOption="SELECT_SERVER_RADIO_OPTION" :editItem="compParams" @close="compClose"
    @success="compSuccess" />

</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import Selectserver from '@/views/quickentry/components/Selectserver.vue'
import ShareCardModal from './ShareCardModal.vue'
import BuildCardModal from './BuildCardModal.vue'
import {
  SHARE_DIALOG_CONFIG,
  BUILD_DIALOG_CONFIG,
  SCP_SOURCE_FILE_SELECT_TYPE_HEAD
} from '../config'
import {
  SELECT_SERVER_RADIO_OPTION,
  ADD_ENV_GROUPS_CONFIG,
} from '../../config'

export default defineComponent({
  components: { Table, ShareCardModal, Selectserver, BuildCardModal },
  props: {
    treeId: {
      type: String,
      default: '4000000000'
    }
  },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const scpSourceFile = computed(() => { return store.getters.scpSourceFile })
    const selectIpArray = computed(() => {
      return store.getters.selectIpArray
    })

    const selectGroupArray = computed(() => {
      return store.getters.selectGroupArray
    })

    const customArray = computed(() => {
      return store.getters.customArray
    })

    const state = reactive({
      tableName: '',
      activeName: 'share',
      compFlag: false,
      compParams: {},
      sourceFileType: SCP_SOURCE_FILE_SELECT_TYPE_HEAD,
      compType: { share: 'ShareCardModal', server: 'Selectserver', build: 'BuildCardModal' },
      compConfig: { share: SHARE_DIALOG_CONFIG, server: ADD_ENV_GROUPS_CONFIG, build: BUILD_DIALOG_CONFIG },
      serverList: [],
    })

    const handleSelectSourceType: (type: string) => void = (type: string): void => {
      state.activeName = type
      state.compFlag = true
      state.compParams = {
        title: proxy.$t('selectServer')
      }
    }

    const compClose: () => void = () => {
      state.compFlag = false
      const params = {}
        const newServerList = [...selectIpArray.value, ...selectGroupArray.value, customArray.value]
        if (newServerList.length === 1 && newServerList[0] === '') {
          params['address'] = ''
        }else {
          const address = newServerList.join(',')
          params['address'] = address
        }
      if (state.activeName === 'share') {
        state.sourceFileType[state.activeName].data = [{ ...scpSourceFile.value, ...params }]
        return
      }
      if (state.activeName === 'server') {
        state.sourceFileType[state.activeName].data = [{...scpSourceFile.value, ...params}]
        return
      }
      if (state.activeName === 'build') {
        state.sourceFileType[state.activeName].data = [{...scpSourceFile.value}]
      }
    }

    const compSuccess: () => void = (): void => {
      compClose()
    }

    watch(() => [selectIpArray.value, selectGroupArray.value, customArray.value], (value) => {
      console.log(value)
      state.serverList = value
    })

    onMounted(() => {
    })

    return {
      SELECT_SERVER_RADIO_OPTION,
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