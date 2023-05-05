<template>
  <div class="body-layout1">
    <saas-tabs :label="treeData?.parent" class="mt-20" />
    <div class="layout-content">
      <base-form ref="form" :config="config.form" :params="params" class="mt10 layout-content-form">
        <!-- 脚本内容 -->
        <template #scripts_cont>
          <div v-if="params.scriptType == 'buildin' && params.from == 'manual'">
            <span class="f12 mr5">{{ $t('builtInPlugIn') }}:</span>
            <el-button v-for="item in builtInPlugIn" :key="item" link @click="handleBuildinSet(item)">
              {{ item }}
            </el-button>
          </div>
          <v-ace-editor v-model:value="params.scripts_cont" @init="editorInit" lang="yaml" theme="cobalt"
            style="height: 400px;width: 100%;" />
          <a :href="url" target="_blank">{{ $t('commandHelp') }}</a>
        </template>

        <!-- 执行账户 -->
        <template #selectedUser>
          <el-select v-model="params.selectedUser" class="w450">
            <el-option v-for="item in allUser" :key="item.id" :value="item.id" :label="item.username" />
          </el-select>
          <el-button v-if="params.scriptType !== 'buildin'" @click="addUser.flag = true" icon="plus" type="primary"
            class="ml10" />
        </template>

        <!-- 目标机器 -->
        <template #choiceResult>
          <div class="wp100">
            <el-button type="primary" @click="handleSelectServer">{{ $t('selectServer') }}</el-button>
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
      </base-form>
      <div class="layout-content-confirm">
        <el-button type="primary" @click="handleConfirm">{{ $t('executeScripts') }}</el-button>
      </div>
    </div>
  </div>
  <!-- 新增账户 -->
  <Dialog v-if="addUser.flag" v-model="addUser.flag" v-bind="$attrs" :config="addUser.config" :loading="addUser.loading"
    @close="addUser.flag = false" @success="addUserConfirm">
    <template #content>
      <base-form ref="addUserForm" :config="addUser.config.form" :params="addUser.params" />
    </template>
  </Dialog>
  <component :ref="compType" :is="compType" v-if="compFlag" v-model="compFlag" :radioOption="SELECT_SERVER_RADIO_OPTION"
    :treeData="treeData" :treeId="String(treeId)" :editItem="editItem" :config="ADD_ENV_GROUPS_CONFIG" @close="compClose"
    @success="compSuccess" />
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import moment from 'moment'
import store from '@/store'
import baseForm from '@/components/baseForm/index.vue'
import Table from '@/components/table/index.vue'
import Dialog from '@/components/dialog/index.vue'
import Selectserver from '@/views/quickentry/components/Selectserver.vue'
import { VAceEditor } from 'vue3-ace-editor'
import { ElMessageBox } from 'element-plus'

import {
  RUN_CONFIG,
  BUILT_IN_PLUGIN,
  ADD_USER_CONFIG,
} from '@/views/business/scripts/config'
import {
  CHOICE_NODE_TYPE,
  RUN_THEAD_CONFIG,
  SELECT_SERVER_RADIO_OPTION,
  ADD_ENV_GROUPS_CONFIG,
  LEAVE_CHOICE_NODE_TYPE_REGEXP,
} from '../config'
import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/theme-cobalt'
import 'ace-builds/src-noconflict/ext-searchbox'
import { deepClone, g_url } from '@/utils'
import { getBusinessUse, createBusinessUse } from '@/api/business/user'
import {
  runquicklyRunScript,
} from '@/api/implement/index'
import {
  RunScriptTaskInfo
} from '@/api/interface/implement'

export default defineComponent({
  components: {
    Table,
    Dialog,
    baseForm,
    VAceEditor,
    Selectserver,
  },
  props: {},
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance

    const state = reactive({
      url: `${g_url}/book/客户端内置命令/`,
      addFlag: false,
      info: null,
      editorObj: null,
      config: deepClone(RUN_CONFIG),
      builtInPlugIn: deepClone(BUILT_IN_PLUGIN),
      thead: deepClone(RUN_THEAD_CONFIG),
      allUser: [],
      addUser: {
        flag: false,
        config: deepClone(ADD_USER_CONFIG),
        loading: false,
        params: {
          username: ''
        }
      },
      params: {
        name: '', // 脚本名称
        from: 'manual', // 脚本来源
        selectedScript: '', // 脚本来源为 脚本克隆/本地脚本 时选择的脚本
        scriptType: 'shell', // 脚本内容选项
        selectedUser: '', // 执行账户 使用凭据
        choiceResult: [], // 目标机器
        scripts_cont: '', // 选择的脚本类型
        node_cont: '',  // 编辑器类型
        node_type: '',
        s_argv: '', // 脚本参数
        s_timeout: 60, // 超时时间
        deployenv: 'always', // 生效环境
        action: 'always', // 生效动作
        batches: 'always', // 分配
        id: ''
      },
      compFlag: false,
      compType: '',
      editItem: {},
      selectIpStr: '',
      choiceNode: [],
      showmachineFlag: true, // 目标机器是否展示
    })
    const treeId = computed(() => {
      return store.getters.treeId
    })

    const treeData = computed(() => {
      return store.getters.treeData
    })

    const selectIpArray = computed(() => {
      return store.getters.selectIpArray
    })

    const selectGroupArray = computed(() => {
      return store.getters.selectGroupArray
    })

    const customArray = computed(() => {
      return store.getters.customArray
    })

    const editorInit: (editor: any) => void = (editor): void => {
      editor.setReadOnly(false)
    }

    const compClose: (type?: string) => void = (type?: string): void => {
      state.selectIpStr = type
      state.compFlag = false
    }

    const compSuccess: () => void = (): void => {
      compClose()
    }

    const handleBuildinSet: (name: string) => void = (name: string): void => {
      state.params.scripts_cont = `#!${name}`
    }

    const handleDeleteItem = (index: number) => {
      state.params.choiceResult.splice(index, 1)
    }

    // 获取全部执行账户
    const getAllUser: () => Promise<void> = async (): Promise<void> => {
      const dataRet = await getBusinessUse(store.getters.treeId, {}) as any
      if (dataRet) state.allUser = dataRet
    }

    // 添加客户确认
    const addUserConfirm: () => void = (): void => {
      (proxy.$refs.addUserForm as any).validFun().then(valid => {
        if (valid) {
          state.addUser.loading = true
          createBusinessUse(store.getters.treeId, state.addUser.params).then(res => {
            proxy.$notification('success')
            getAllUser()
            state.addUser.flag = false
          }).finally(() => {
            state.addUser.loading = false
          })
        }
      })
    }


    // 选择服务器
    const handleSelectServer = (): void => {
      state.compFlag = true
      state.compType = 'Selectserver'
      state.editItem = {
        title: proxy.$t('SelectiveMachine')
      }
    }

    // 执行脚本
    const handleConfirm: () => Promise<void> = (): Promise<void> => {
      return (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          ElMessageBox.confirm(proxy.$t('executeScriptsMessage'), proxy.$t('executeScripts'), {
            confirmButtonText: proxy.$t('confirm'),
            cancelButtonText: proxy.$t('cancel'),
            type: 'warning'
          }).then(async () => {
            if (state.params.scriptType === 'buildin') {
              if (!state.showmachineFlag) {
                state.params.node_type = 'builtin'
                state.params.node_cont = 'openc3skipnode'
              }
            }
            const params: RunScriptTaskInfo = {
              name: state.params.name,
              user: String(state.params.selectedUser),
              node_type: state.params.node_type,
              node_cont: state.params.node_cont,
              scripts_type: state.params.scriptType,
              scripts_cont: state.params.scripts_cont,
              scripts_argv: state.params.s_argv,
              timeout: state.params.s_timeout,
              deployenv: state.params.deployenv,
              action: state.params.action,
              batches: state.params.batches,
            }
            const dataRet = await runquicklyRunScript(treeId.value, params)
            if (dataRet) {
              proxy.$notification('success')
            }
          }).finally(() => {
          })
        }
      })
    }

    const defaultOption = (): void => {
      // choiceResult
      const formNoDisable: string[] = ['name', 'from', 'scriptType']
      formNoDisable.forEach(item => {
        state.config.form.config.filter(cItem => cItem.prop === item)[0].disabled = false
        if (item === 'name') {
          state.params.name = `${proxy.$t('executeScriptsQuickly')}-${moment().format('YYYYMMDDHHmmss')}`
        }
      })
    }

    onMounted(() => {
      defaultOption()
      getAllUser()
    })

    watch(() => [selectIpArray.value, selectGroupArray.value, customArray.value], (value) => {
      if (state.selectIpStr === 'ip') {
        state.params.node_type = 'builtin'
        state.params.choiceResult = value[0].map(item => { return { name: item, type: 'node' } })
      } else if (state.selectIpStr === 'group') {
        state.params.node_type = 'group'
        state.params.choiceResult = value[1].map(item => { return { name: item.name, type: item.plugin } })
      } else if (state.selectIpStr === 'custom') {
        state.params.node_type = 'builtin'
        state.params.choiceResult = value[2].map(item => { return { name: item, type: 'node' } })
      }
    })

    watch(() => state.params.scripts_cont, (value) => {
      if (LEAVE_CHOICE_NODE_TYPE_REGEXP.filter(item => value.search(item) === 0).length === 0) {
        state.config.form.config.filter(item => item.prop === 'choiceResult')[0].hidden = false
      } else {
        state.config.form.config.filter(item => item.prop === 'choiceResult')[0].hidden = true
      }
    })

    return {
      treeId,
      treeData,
      CHOICE_NODE_TYPE,
      SELECT_SERVER_RADIO_OPTION,
      ADD_ENV_GROUPS_CONFIG,
      ...toRefs(state),
      handleBuildinSet,
      editorInit,
      compSuccess,
      compClose,
      addUserConfirm,
      handleConfirm,
      handleSelectServer,
      handleDeleteItem,
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-content {
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &-form {
    width: 50%;
  }
}

.layout-content-confirm {
  margin-top: 30px;
}

.w450 {
  width: 450px;
}
</style>