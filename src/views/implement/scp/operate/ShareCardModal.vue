<template>
  <Dialog v-bind="$attrs" :config="config" @close="close" @success="confirm(ruleFormRef)">
    <template #content>
      <saas-tabs v-model="activeName" :tabs="tabsList" class="mt-20" />
      <div v-if="activeName === 'select'">
        <div ref="ruleFormRef" class="df jc_fe" prop="name">
          <el-upload :action="action" :headers="headers" :show-file-list="false" :before-upload="beforeUpload"
            :on-success="uploadSuccess">
            <el-button :loading="uploadLoading" type="primary" icon="upload">{{ $t('uploadFile') }}</el-button>
          </el-upload>
          <el-button @click="tokenFlag = true" type="primary" icon="key" class="ml10">
            {{ $t('tokenManage') }}
          </el-button>
        </div>
        <Table :thead="Object.assign(tableConfig.thead)" :data="tableConfig.list" :tableLoading="tableConfig.loading"
          @current-change="handleCurrentChange" highlight-current-row :page="tableConfig.page"
          :pageSize="tableConfig.pageSize" :total="tableConfig.total" :pageChange="pageChange"
          :pageSizeChange="pageSizeChange" class="mt20">
          <template #size="{ row }">
            {{ bytesToSize(row.size) }}
          </template>
          <template #operate="{ row }">
            <el-button @click="deleteFun(row.id)" link type="primary">{{ $t('delete') }}</el-button>
          </template>
        </Table>
      </div>
      <div v-else-if="activeName === 'input'">
        <el-form ref="ruleFormRef" :model="shareForm" label-width="100px" :rules="rules">
          <el-form-item :label="`${$t('fileName')}：`" required prop="name">
            <el-input class="w450" v-model="shareForm.name" :placeholder="`${$t('configFormInput')}${$t('fileName')}`" />
          </el-form-item>
        </el-form>
      </div>
    </template>
  </Dialog>
  <Token v-if="tokenFlag" v-model="tokenFlag" @close="tokenFlag = false" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance, ref } from 'vue'
import store from '@/store'
import Table from '@/components/table/index.vue'
import Dialog from '@/components/dialog/index.vue'
import Token from '@/views/business/file/components/token.vue'
import {
  bytesToSize,
  TABS_CONFIG,
  SHARE_DIALOG_CONFIG,
} from '../config'
import { getFileServer, deleteFile } from '@/api/business/file'
import { ElMessageBox } from 'element-plus'
import { THEAD_CONFIG } from '@/views/business/file/config'
import type { FormInstance, FormRules } from 'element-plus'

export default defineComponent({
  components: { Dialog, Table, Token },
  emits: ['close', 'success'],
  props: {
    config: {
      type: Object,
      default: SHARE_DIALOG_CONFIG
    },
    compParams: {
      type: Object,
      default: {
      }
    }
  },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeId = computed(() => { return store.getters.treeId })
    const ruleFormRef = ref<FormInstance>()
    const state = reactive({
      activeName: 'select',
      tabsList: TABS_CONFIG,
      tableConfig: {
        loading: false,
        thead: THEAD_CONFIG,
        total: 0,
        list: [],
        allList: [],
        filterList: [],
        page: 1,
        pageSize: 10
      },
      shareForm: {
        name: '',
        address: '',
      },
      action: `/api/job/uploadv2/fileserver/${store.getters.treeId}`,
      headers: { 'Content-Type': undefined },
      uploadLoading: false,
      tokenFlag: false,
    })

    const rules = reactive<FormRules>({
      name: [
        { required: true, message: `${proxy.$t('configFormInput')}${proxy.$t('fileName')}`, trigger: 'blur' },
      ],
      address: [
        { required: false, message: `${proxy.$t('configFormInput')}${proxy.$t('serverAddress')}`, trigger: 'blur' },
      ]
    })

    // 获取服务器文件列表
    const getFileData: () => Promise<void> = async () => {
      state.tableConfig.loading = true
      const dataRet = await getFileServer(treeId.value, {}) as unknown as Array<any>
      state.tableConfig.loading = false
      if (dataRet) {
        state.tableConfig.total = dataRet.length
        state.tableConfig.list = dataRet.reverse()
      }
    }

    const close: () => void = () => {
      proxy.$emit('close')
    }

    const confirm: (formEl: FormInstance | undefined) => Promise<void> = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      if (state.activeName === 'select') {
        if (!state.shareForm.name) {
          proxy.$notification(proxy.$t('scpSelectNote'), 'error')
        } else {
          console.log(state.shareForm)
          store.dispatch('setScpSourceFile', state.shareForm)
          close()
        }
      } else if (state.activeName === 'input') {
        await formEl?.validate((valid, fields) => {
          if (valid) {
            console.log(state.shareForm)
            store.dispatch('setScpSourceFile', state.shareForm)
            close()
          }
        })
      }
    }

    const deleteFun = (id: number) => {
      ElMessageBox.confirm(proxy.$t('deleteFile'), '', {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel')
      }).then(() => {
        state.tableConfig.loading = true
        deleteFile(treeId.value, id).then(res => {
          proxy.$notification('success')
          getFileData()
        }).finally(() => {
          state.tableConfig.loading = false
        })
      })
    }

    const pageChange: (page: number) => void = (page: number) => {
      state.tableConfig.page = page
    }

    const pageSizeChange: (size: number) => void = (size: number) => {
      state.tableConfig.pageSize = size
      pageChange(1)
    }

    const handleCurrentChange = (value: any) => {
      state.shareForm = {
        name: value.name,
        address: '',
      }
    }

    // 开始上传
    const beforeUpload = () => {
      state.uploadLoading = true
    }
    // 上传成功
    const uploadSuccess = () => {
      proxy.$notification('success')
      state.uploadLoading = false
      getFileData()
    }

    watch(() => state.activeName, (value) => {
      state.shareForm = { name: '', address: '' }
    })

    onMounted(() => {
      getFileData()
    })
    return {
      rules,
      ruleFormRef,
      TABS_CONFIG,
      bytesToSize,
      ...toRefs(state),
      close,
      confirm,
      deleteFun,
      pageChange,
      pageSizeChange,
      handleCurrentChange,
      beforeUpload,
      uploadSuccess,
    }
  }
})
</script>

<style lang="scss" scoped></style>