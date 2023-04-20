<template>
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
      {{ config.form.config[2] }}
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
        </template>
        <template #selectedUser>
          <el-select v-model="params.selectedUser" class="w450"></el-select>
          <el-button v-if="params.scriptType !== 'buildin'" icon="plus" type="primary" class="ml10"/>
        </template>
        <!-- 目标机器 -->
        <template #choiceResult>
          <div class="wp100">
            <el-button type="primary">{{ $t('selectServer') }}</el-button>
          </div>
          <Table :thead="thead" :data="params.choiceResult" class="w600 mt10">
            <!-- <td>{{$index + 1}}</td>
            <td ng-if="nodeType=='group'">{{ss.name}}</td>
            <td ng-if="nodeType=='builtin'">{{ss}}</td>
            <td>{{choiceType}}</td>
            <td>
                <button ng-if="nodeType=='group'" ng-click="quick.delChoice($index, ss.name)">{{'C3T.删除'|translate}}</button>
                <button ng-if="nodeType=='builtin'" ng-click="quick.delChoice($index, ss)">{{'C3T.删除'|translate}}</button>
            </td> -->
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
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, watch, getCurrentInstance, computed } from 'vue'
import store from '@/store'
import Drawer from '@/components/drawer/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import Table from '@/components/table/index.vue'
import { VAceEditor } from 'vue3-ace-editor'
// import 'brace/ext/searchbox'
import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/theme-cobalt'
import 'ace-builds/src-noconflict/ext-searchbox'
// import 'brace/theme/cobalt'
import { RUN_CONFIG, RUN_THEAD_CONFIG, ADD_USER_CONFIG } from '../config'
import { getScripts, getScriptDetail } from '@/api/business/scripts'

export default {
  components: { Drawer, baseForm, Table, VAceEditor },
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
      allScript: [],
      builtInPlugIn: ['kubectl', 'terraform', 'terraformv2', 'kubestar', 'awsecs', 'awsecsv2', 'awsecsv3', 'awsEcsService', 'sendemail', 'sendmesg', 'flowcaller', 'cdnrefresh', 'cdnrefreshv2', 'kubernetes', 'tsunamiudp', 'calltestenv', 'localbash', 'qaCallback', 'k8snscp', 'flownscp', 'elbShowv2', 'elbOfflinev2', 'elbOnlinev2', 'awsTargetGroup', 'null', 'sleep'],
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
        deployenv: '', // 生效环境
        action: '', // 生效动作
        batches: '', // 分配
        id: ''
      },
      config: RUN_CONFIG,
      loading: false,
      scriptStepFlag: true
    })
    const editorInit = (editor) => {
      editor.setReadOnly(false)
    }
    // 脚本来源 选择脚本克隆/本地脚本 时显示下拉列表
    watch(() => state.params.from, val => {
      console.log(state.params.from)
      state.config.form.config[2].hidden = val === 'manual' ? true : false
    }, {
      immediate: true
    })
     // 脚本来源 选择脚本克隆/本地脚本 时下拉列表值更改
     watch(() => [state.params.from, state.params.selectedScript], ([newFrom, newSelect])=> {
      if (newFrom === 'clone' || newFrom === 'local') {
        if (newSelect) {
          getScriptDetail(store.getters.treeId, parseInt(newSelect)).then((res: any) => {
            console.log(res)
            // var inputEdit = vm.scriptTypeEditor[data.data.type];
            // var scriptData = data.data;
            // if (vm.from == "clone"){
            //     inputEdit(data.data.cont, false);

            // }else if (vm.from == "local"){
            //     inputEdit(data.data.cont, true);
            // }
            // $scope.scriptType = data.data.type;
            state.params.scripts_cont = res.cont
            state.params.scriptType = res.type
          })
        }
      }
      console.log(newFrom, newSelect)
    }, {
      immediate: true
    })
    // 脚本内容选项 选择内建
    watch(() => state.params.scriptType, val => {
      state.config.form.config[5].label = val === 'buildin' ? 'useCredentials' : 'executionAccount'
      state.config.form.config[5].rules = val === 'buildin' ? [] : [{ required: true, trigger: 'change', message: proxy.$t('requiredText') }]
    }, {
      immediate: true
    })
   const getTimeStr = () => {
      var unixTimestamp = new Date()
      var Y = unixTimestamp.getFullYear()
      var M = (unixTimestamp.getMonth() + 1 < 10 ? '0' + (unixTimestamp.getMonth() + 1) : unixTimestamp.getMonth() + 1)
      var D = unixTimestamp.getDate() < 9 ? '0' + unixTimestamp.getDate() : unixTimestamp.getDate()
      var h = (unixTimestamp.getHours() > 9 ? unixTimestamp.getHours() : '0' + unixTimestamp.getHours())
      var m = (unixTimestamp.getMinutes() > 9 ? unixTimestamp.getMinutes() : '0' + unixTimestamp.getMinutes())
      var s = unixTimestamp.getSeconds() > 9 ? unixTimestamp.getSeconds() : '0' + unixTimestamp.getSeconds()
      return `${Y}${M}${D}${h}${m}${s}`
    }
    // scriptType
    onMounted(() => {
      // console.log("" + $filter('date') + $filter('date')(new Date, "sss"))
      // http://demo01.openc3.polymericcloud.com/api/job/userlist/26
      state.params.name = `快速执行脚本-${getTimeStr()}` 
      getScripts(store.getters.treeId, {}).then((res: any) => {
        state.allScript = res
        state.config.form.config[2].data = res
      })
    })
    const close = () => { // 关闭弹框
      context.emit('close')
    }
    // 弹框成功的回调
    const confirm = () => {
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          // addCollector(store.getters.treeId, {}).then(res => {
          //   context.emit('addSuccess')
          //   proxy.$notification('success')
          // }).finally(() => {
          //   state.loading = false
          // })
        }
      })
    }
    return {
      ...toRefs(state),
      close,
      confirm,
      treeData,
      editorInit
    }
  }
}
</script>
<style lang="scss">
</style>
