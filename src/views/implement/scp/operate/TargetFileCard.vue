<template>
  <el-card v-bind="$attrs" class="mt10 source-card">
    <template #header>
      <div class="card-header">
        <div class="card-header-title">
          <svg-icon class="mr10" icon-class="target-file" width="16px" height="16px" />
          <span>{{ $t('targetFile') }}</span>
        </div>
      </div>
    </template>
    <div class="mt30">
      <base-form ref="form" :config="config.form" :params="params">
        <!-- 目标路径 -->
        <template #dp>
          <div class="target-file-form-items">
            <el-input class="w450" v-model="params.dp" />
            <el-tooltip effect="dark" :content="$t('targetPathTip')" placement="top">
              <svg-icon class="ml20" icon-class="tooltip-icon" width="16px" height="16px" />
            </el-tooltip>
          </div>
        </template>

        <!-- 同步Delete -->
        <template #scp_delete>
          <div class="target-file-form-items">
            <el-switch v-model="params.scp_delete" />
            <el-tooltip effect="dark" :content="$t('scpDeleteTip')" placement="top">
              <svg-icon class="ml20" icon-class="tooltip-icon" width="16px" height="16px" />
            </el-tooltip>
          </div>
        </template>

        <!-- 执行账户 -->
        <template #dstUser>
          <div class="target-file-form-item">
            <el-select v-model="params.dstUser" class="w450"
              :placeholder="`${$t('configFormSelect')}${$t('executionAccount')}`" size="large">
              <el-option v-for="item in allProUsers" :key="item.username" :label="item.username" :value="item.username" />
            </el-select>
            <el-button class="ml20" type="primary" icon="Plus" @click="handleUser"></el-button>
          </div>
        </template>

        <!-- 目标机器 -->
        <template #choiceResult>
          <div class="target-file-form-item">
            <el-button type="primary" icon="Plus" @click="handleServer"></el-button>
          </div>
          <Table :thead="thead" :data="params.choiceResult" class="w600 mt10">
            <template #id="{ index }">{{ index + 1 }}</template>
            <template #type="{ row }">
              <div>{{ CHOICE_NODE_TYPE[row.type] }}</div>
            </template>
            <template #operate="{ row, index }">
              <el-button link type="primary" @click="handleDeleteItem(index)">{{ $t('delete') }}</el-button>
            </template>
          </Table>
        </template>

        <!-- 文件归属者 -->
        <template #fileChown>
          <div class="target-file-form-item">
            <div>
              <el-select v-model="params.fileChown" class="w450"
                :placeholder="`${$t('configFormSelect')}${$t('fileOwner')}`" size="large">
                <el-option v-for="item in allProUsers" :key="item.username" :label="item.username"
                  :value="item.username" />
              </el-select>
              <div class="target-file-form-item-button">{{ $t('fileChownMessage') }}</div>
            </div>
            <el-button class="ml20" type="primary" icon="Plus" @click="handleUser"></el-button>
          </div>
        </template>

        <!-- 文件权限 -->
        <template #chmod>
          <el-input class="w450" v-model="params.chmod" />
          <div class="target-file-form-item-button">{{ $t('chmodMessage') }}</div>
        </template>
      </base-form>
    </div>
  </el-card>

  <!-- 选择服务器 -->
  <Selectserver v-if="serverFlag" v-bind="$attrs" v-model="serverFlag" :config="serverConfig" :editItem="compParams"
    :treeId="String(treeId)" :radioOption="SELECT_SERVER_RADIO_OPTION" @success="serverSuccess" @close="serverClose" />

  <!-- 添加用户 -->
  <AddUserModal v-if="addUserFlag" v-bind="$attrs" v-model="addUserFlag" :compParams="compParams" @success="compSuccess" @close="compClose" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import store from '@/store'
import Selectserver from '@/views/quickentry/components/Selectserver.vue'
import AddUserModal from './AddUserModal.vue'
import {
  SHARE_DIALOG_CONFIG,
  BUILD_DIALOG_CONFIG,
  TARGET_SOURCE_CONFIG,
  SCP_SOURCE_FILE_SELECT_TYPE_HEAD
} from '../config'
import {
  SELECT_SERVER_RADIO_OPTION,
  ADD_ENV_GROUPS_CONFIG,
  RUN_THEAD_CONFIG,
  CHOICE_NODE_TYPE,
} from '../../config'
import {
  getJobUserList
} from '@/api/implement/index'
import { deepClone } from '@/utils'
import { TreeIdInfo } from '@/api/interface'

export default defineComponent({
  components: { Table, Selectserver, baseForm, AddUserModal },
  props: {
    treeId: {
      type: String,
      default: '4000000000'
    }
  },
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance

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
      addUserFlag: false,
      compParams: {},
      sourceFileType: SCP_SOURCE_FILE_SELECT_TYPE_HEAD,
      compType: { share: 'ShareCardModal', server: Selectserver, build: 'BuildCardModal' },
      compConfig: { share: SHARE_DIALOG_CONFIG, server: ADD_ENV_GROUPS_CONFIG, build: BUILD_DIALOG_CONFIG },
      serverList: [],
      config: TARGET_SOURCE_CONFIG,
      allProUsers: [],
      params: {
        dp: '',               // 目标路径
        scp_delete: false,    // 同步delete
        dstUser: '',          // 执行账户
        choiceResult: [],     // 目标机器
        fileChown: '',         // 文件归属者
        chmod: '',            // 文件权限
        timeout: '',          // 超时时间
        unClickDeployenv: 'always', // 生效环境
        unClickAction: 'always',    // 生效动作
        unClickBatches: 'always',   // 分批
      },
      thead: deepClone(RUN_THEAD_CONFIG),
      selectIpStr: '',
      serverFlag: false,
      serverConfig: ADD_ENV_GROUPS_CONFIG,
    })

    // 获取用户列表 
    const getUserData = async () => {
      const params: TreeIdInfo = { treeId: props.treeId }
      const dataRet = await getJobUserList(params)
      if (dataRet) {
        state.allProUsers = dataRet
      }
    }

    const handleUser = (type: string) => {
      state.addUserFlag = true
      state.compParams = {
        title: proxy.$t('addUser')
      }
    }

    const handleServer = () => {
      state.serverFlag = true
      state.compParams['title'] = proxy.$t('selectServer')
    }

    const compClose = (type?: string) => {
      getUserData()
      state.addUserFlag = false
    }

    const compSuccess: () => void = (): void => {
      compClose()
    }

    const serverSuccess = () => {
      serverClose()
    }

    const serverClose = (type?: string) => {
      state.serverFlag = false
      state.selectIpStr = type
    }

    const handleDeleteItem = (index: number) => {
      state.params.choiceResult.splice(index, 1)
    }

    onMounted(() => {
      getUserData()
    })

    watch(() => [selectIpArray.value, selectGroupArray.value, customArray.value], (value) => {
      if (state.selectIpStr === 'ip') {
        state.params.choiceResult = value[0].map(item => { return { name: item, type: 'node' } })
      } else if (state.selectIpStr === 'group') {
        state.params.choiceResult = value[1].map(item => { return { name: item.name, type: item.plugin } })
      } else if (state.selectIpStr === 'custom') {
        state.params.choiceResult = value[2].map(item => { return { name: item, type: 'node' } })
      }
    })

    return {
      SELECT_SERVER_RADIO_OPTION,
      CHOICE_NODE_TYPE,
      ...toRefs(state),
      handleUser,
      compClose,
      compSuccess,
      getUserData,
      handleServer,
      serverClose,
      serverSuccess,
      handleDeleteItem,
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

.target-file-form-items {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.target-file-form-item {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  &-button {
    font-size: 12px;
    color: var(--el-color-gray)
  }
}
</style>