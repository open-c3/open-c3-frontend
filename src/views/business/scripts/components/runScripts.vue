<template>
  <div>
    <Drawer v-bind="$attrs" :loading="loading"  @close="close" width="800px">
      <template #drawerHeader>
          <div class="el-drawer__header">
            <span class="el-drawer__title">
              {{ treeData?.parent }}
            </span>
            <el-icon @click="close" class="el-drawer__close-btn"><Close /></el-icon>
          </div>
        </template>
      <template #content>
        <base-form ref="form" :config="config.form" :params="params" class="mt10">
          <template #scripts_cont>
            <div v-if="params.scriptType=='buildin' && params.from == 'manual'">
              <span class="f12 mr5">{{ $t('builtInPlugIn') }}:</span>
              <el-button v-for="item in builtInPlugIn" :key="item" link>{{ item }}</el-button>
            </div>
            <v-ace-editor
              v-model:value="params.scripts_cont"
              @init="editorInit"
              lang="yaml"
              theme="cobalt"
              style="height: 400px;width: 100%;"/>
            <a :href="url" target="_blank">{{ $t('commandHelp') }}</a>
          </template>
          <template #selectedUser>
            <el-select v-model="params.selectedUser" class="w450">
              <el-option v-for="item in allUser" :key="item.id" :value="item.id">{{ item.username }}</el-option>
            </el-select>
            <el-button v-if="params.scriptType !== 'buildin'" @click="addUser.flag = true" icon="plus" type="primary" class="ml10"/>
          </template>
          <!-- 目标机器 -->
          <template #choiceResult>
            <div class="wp100">
              <el-button @click="selectServer.flag = true" type="primary">{{ $t('selectServer') }}</el-button>
            </div>
            <Table :thead="thead" :data="params.choiceResult" class="w600 mt10">
              <template #id="{index}">{{ index+1 }}</template>
              <template #operate="{ row }">
                <el-button link type="primary">{{ $t('delete') }}</el-button>
              </template>
            </Table>
          </template>
        </base-form>
      </template>
      <template #footer>
        <el-button>{{ $t('executeScripts') }}</el-button>
      </template>
    </Drawer>
    <!-- 新增账户 -->
    <Dialog v-if="addUser.flag" v-bind="$attrs" :config="addUser.config" :loading="addUser.loading" @close="addUser.flag = false" @success="addUserConfirm">
      <template #content>
        <base-form ref="addUserForm" :config="addUser.config.form" :params="addUser.params"/>
      </template>
    </Dialog>
    <!-- 选择服务器 -->
    <Dialog v-if="selectServer.flag" v-bind="$attrs" :config="selectServer.config" :loading="selectServer.loading" @close="selectServer.flag = false" @success="addServer">
      <template #content>
        {{ selectServer.params.formType }}
        <el-radio-group v-model="selectServer.params.formType">
          <el-radio v-for="item in selectServer.formType" :label="item.id">{{item.name}}</el-radio>
        </el-radio-group>
        <template v-if="selectServer.params.formType === 'custom'">
          <p>{{ $t('handwrittenIPMultiple') }}</p>
          <p>{{ $t('handwrittenIPMultiple2') }}</p>
          <el-input v-model="selectServer.params.customstr" type="textarea" class="h300"/>
        </template>
      </template>
    </Dialog>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, watch, getCurrentInstance, computed } from 'vue'
import store from '@/store'
import Drawer from '@/components/drawer/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import Table from '@/components/table/index.vue'
import Dialog from '@/components/dialog/index.vue'
import { VAceEditor } from 'vue3-ace-editor'
// import 'brace/ext/searchbox'
import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/theme-cobalt'
import 'ace-builds/src-noconflict/ext-searchbox'
// import 'brace/theme/cobalt'
import { RUN_CONFIG, RUN_THEAD_CONFIG, ADD_USER_CONFIG, SELECT_SERVER_CONFIG, BUILT_IN_PLUGIN } from '../config'
import { getScripts, getScriptDetail } from '@/api/business/scripts'
import { getBusinessUse, createBusinessUse } from '@/api/business/user'
import { g_url } from '@/utils'
export default {
  components: { Drawer, baseForm, Table, VAceEditor, Dialog },
  emits: ['close', 'addSuccess'],
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const treeData = computed(() => {
      return store.getters.treeData
    })
    const state = reactive({
      url: `${g_url}/book/客户端内置命令/`,
      addUser: {
        flag: false,
        config: ADD_USER_CONFIG,
        loading: false,
        params: {
          username: ''
        }
      },
      selectServer: { // 选择服务器
        flag: false,
        config: SELECT_SERVER_CONFIG,
        loading: false,
        formType: [
          { name: proxy.$t('selectServerViaIP'), id: 'ip'},
          { name: proxy.$t('groupSelection'), id: 'group'},
          { name: proxy.$t('handwrittenIP'), id: 'custom'}
        ],
        params: {
          formType: '',
          customstr: ''
        }
      },
      allUser: [],
      allScript: [],
      builtInPlugIn: BUILT_IN_PLUGIN,
      thead: RUN_THEAD_CONFIG,
      title: 'newJob',
      params: {
        name: '', // 脚本名称
        from: 'manual', // 脚本来源
        selectedScript: '', // 脚本来源为 脚本克隆/本地脚本 时选择的脚本
        scriptType: 'shell', // 脚本内容选项
        selectedUser: '', // 执行账户 使用凭据
        choiceResult: [], // 目标机器
        scripts_cont: '',
        s_argv: '', // 脚本参数
        s_timeout: '', // 超时时间
        deployenv: 'always', // 生效环境
        action: 'always', // 生效动作
        batches: 'always', // 分配
        id: ''
      },
      config: RUN_CONFIG,
      loading: false,
      scriptStepFlag: true
    })
    const editorInit = (editor) => {
      editor.setReadOnly(true)
    }
    const close = () => { // 关闭弹框
      context.emit('close')
    }
    // 弹框成功的回调
    const confirm = () => {
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
        }
      })
    }
    // 根据id获取详情
    const detail = (id: number) => {
      getScriptDetail(store.getters.treeId, id).then((res: any) => {
        state.params.scripts_cont = res.cont
        state.params.scriptType = res.type
      })
    }
    const getAllUser = () => {
      getBusinessUse(store.getters.treeId, {}).then((res: any) => {
        state.allUser = res
      })
    }
    // 添加客户
    const addUserConfirm = () => {
      (proxy.$refs.addUserForm as any).validFun().then(valid => {
        if (valid) {
          state.addUser.loading = true
          createBusinessUse(store.getters.treeId, state.addUser.params).then(res => {
            proxy.$notification('success')
            getAllUser()
            state.addUser.flag = false
          }).finally(() => {
            state.loading = false
          })
        }
      })
    }
    const addServer = () => {
      const choiceResult = state.selectServer.params.customstr.split(/\n| |,/)
      state.params.choiceResult = choiceResult.map(item => item.length > 0)
      // var ips = [];
      // angular.forEach(vm.customstr.split(/\n| |,/), function (value, key) {
      //     if( value.length > 0 )
      //     {
      //         ips.push(value)
      //     }
      // });
      // $uibModalInstance.close(
      //     ips
      // );
    }
    onMounted(() => {
      getAllUser()
      if(prop.info) {
        state.params.name = prop.info.name
        detail(prop.info.id)
      }
    })
    return {
      ...toRefs(state),
      close,
      confirm,
      treeData,
      editorInit,
      addUserConfirm,
      addServer
    }
  }
}
</script>
<style lang="scss">
</style>
