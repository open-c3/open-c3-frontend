<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel">
    <template #content>
      <Table :thead="thead" :data="list" :tableLoading="loading" class="mb20">
        <template #operate="{ row }">
          <el-button @click="deleteFun(row.id)" link type="primary">{{ $t('delete') }}</el-button>
        </template>
      </Table>
      <el-card>
        <template #header>
          token {{ $t('add') }}
        </template>
        <base-form ref="form" :config="config.form" :params="params">
          <template #list>
          </template>
        </base-form>
        <el-button @click="add" class="ml145">{{ $t('add') }} token</el-button>
        <p class=" ml10 mr20"><span class="c-error">{{$t('uploadViaToken')}}:</span> {{ url }}</p>
        <p class=" ml10 mr20"><span class="c-error">{{ $t('strictUpload') }}</span>{{ strictUrl }}</p>
      </el-card>
    </template>
    <template #footer>
      <el-button @click="cancel">{{ $t('cancel') }}</el-button>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance, computed, watch } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import store from '@/store'
import md5 from 'js-md5'
import { TOKEN_CONFIG, TOKEN_THEAD_CONFIG } from '../config'
import { getTokenList, getJobThirdList, addToken, deleteToken } from '@/api/business/file'
import { ElMessageBox } from 'element-plus'

export default {
  components: { Dialog, Table, baseForm },
  emits: ['close'],
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const thead = TOKEN_THEAD_CONFIG
    const state = reactive({
      hostUrl: window.location.protocol + '//' + window.location.host,
      list: [],
      params: {
        token: '',
        describe: '',
        isjob: false,
        jobname: ''
      },
      config:TOKEN_CONFIG,
      loading: false
    })
    const url = computed(() => {
      return `curl -X POST ${state.hostUrl}/api/job/uploadv2/fileserver/${store.getters.treeId}/upload -F "file=@/tmp/xxx.txt" -H 'token: ${state.params.token}'`
    })
    const strictUrl = computed(() => {
      return `curl -X POST ${state.hostUrl}/api/job/uploadv2/fileserver/${store.getters.treeId}/upload?checkmd5=de3285f3e7077e6ba8a43a21bb8a3adf -F "file=@/tmp/xxx.txt" -H 'token:${state.params.token}'`
    })
    const cancel = () => { // 关闭弹框
      context.emit('close')
    }
    const getTokenData = () => {
      getTokenList(store.getters.treeId).then((res: any) => {
        state.list = res
      })
    }
    const add = () => {
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          addToken(store.getters.treeId, state.params).then(res => {
            proxy.$notification('success')
            getTokenData()
            state.params.token = md5(String(new Date().getTime()))
            state.params.describe = ''
            state.params.isjob = false
            state.params.jobname = ''
          })
        }
      })
    }
    const deleteFun = (id) => {
      ElMessageBox.confirm(proxy.$t('deleteToken'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel')
      }).then(() => {
        deleteToken(store.getters.treeId, id).then(res => {
          proxy.$notification('success')
          getTokenData()
        })
      })
    }
    watch(() => state.params.isjob, val => {
      state.config.form.config[3].hidden = !val
    }, {
      immediate: true
    })
    onMounted(() => {
      state.params.token = md5(String(new Date().getTime()))
      getTokenData()
      getJobThirdList({project_id: store.getters.treeId}).then((res: any) => {
        state.config.form.config[3].data = res.map(item => {
          return {id: item, label: item}
        })
      })
    })
    return {
      ...toRefs(state),
      cancel,
      confirm,
      thead,
      strictUrl,
      url,
      add,
      deleteFun
    }
  }
}
</script>
<style lang="scss">
</style>
