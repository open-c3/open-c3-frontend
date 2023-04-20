<template>
  <Dialog v-bind="$attrs" :config="config" :title="editItem.title" @close="close">
    <template #content>
      <div class="mb20">
        <!-- 基本信息 -->
        <el-form v-model="detailForm" label-width="100px" class="detail-form">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="`${$t('creatorTime')}：`">{{ detailForm.create_time }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="`${$t('finishAt')}：`">{{ detailForm.finish_time }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="`${$t('submitter')}：`">{{ detailForm.submitter }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="`${$t('handler')}：`">{{ detailForm.handler }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="`${$t('type')}：`">{{ detailForm.type }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="`${$t('approvalName')}：`">{{ detailForm.name }}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-form ref="detailFormRef" :model="detailForm" label-width="100px" class="detail-form mt20" :rules="rules">
        <!-- 详情 -->
        <el-form-item :label="`${$t('ApplicationDetails')}：`">
          <pre>{{ detailForm.remarks }}</pre>
        </el-form-item>

        <!-- 理由 -->
        <el-form-item :label="`${$t('ApplicationReason')}：`">
          <pre> {{ detailForm.submit_reason }} </pre>
        </el-form-item>

        <!-- 答复 -->
        <el-form-item v-if="!(editItem.type === 'tome' && detailForm.status === 'todo')" :label="`${$t('processReply')}：`"
          prop="handle_reason" required>
          <pre> {{ detailForm.handle_reason }}</pre>
          <el-input style="display:none" v-model="detailForm.handle_reason" :placeholder="$t('fillAnswer')" />

        </el-form-item>
        <el-form-item v-else :label="`${$t('processReply')}：`" prop="handle_reason" required>
          <el-input v-model="detailForm.handle_reason" :rows="2" type="textarea" :placeholder="$t('fillAnswer')" />
        </el-form-item>
      </el-form>

    </template>
    <template #footer>
      <div>
        <el-button type="primary" :disabled="detailForm.status !== 'todo'" @click="confirm">{{ $t('submit') }}</el-button>
        <el-button :disabled="detailForm.status !== 'todo'" @click="updateRefuse('refuse')">{{ $t('refuse') }}</el-button>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, getCurrentInstance, ComponentInternalInstance } from 'vue'
import store from '@/store'
import type { FormRules } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import {
  ASSIGNMENT_DIALOG_CONFIG,
  ASSIGNMENT_DETAIL_OPERATE_DIALOG,
} from '../config'
import {
  setCustomize,
  getAssignCommit,
  getAssignOperate,
} from '@/api/userCenter/assignment'
import {
  ICustonizeData,
  IAssignmentOperateData,
  IAssignmentOperateDetailData,
} from '@/api/interface/userCenter'


export default defineComponent({
  components: {
    Dialog,
    baseForm
  },

  props: {
    config: {
      type: Object,
      default: ASSIGNMENT_DIALOG_CONFIG
    },
    editItem: {
      type: Object,
      default: {}
    },
    treeId: {
      type: String,
      default: '4000000000',
    },
    treeData: {
      type: Object,
      default: {}
    },
  },

  emits: ['success', 'close'],

  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const state = reactive({
      detailForm: {} as any,
    })
    const rules = reactive<FormRules>({
      handle_reason: [
        { required: true, message: proxy.$t('fillAnswer'), trigger: 'blur' },
      ],
    })

    // 获取详细信息
    const getData: () => Promise<void> = async (): Promise<void> => {
      const params: IAssignmentOperateData = {
        id: props.editItem.item.id
      }
      const dataRet = await getAssignCommit(params)
      if (dataRet) {
        state.detailForm = dataRet
      }
    }

    //  审批
    const confirm = () => {
      (proxy?.$refs.detailFormRef as any).validate().then((valid: any) => {
        if (valid) {
          updateRefuse('submit')

        }
      })
    }

    // 二次确认弹窗
    const updateRefuse: (type: string) => Promise<void> = async (type: string): Promise<void> => {
      return ElMessageBox.confirm(ASSIGNMENT_DETAIL_OPERATE_DIALOG[type].description, ASSIGNMENT_DETAIL_OPERATE_DIALOG[type].title, {
        confirmButtonText: proxy.$t('confirm'),
        cancelButtonText: proxy.$t('cancel'),
        type: 'warning'
      }).then(async () => {
        if (['submit'].includes(type)) {
          const params: IAssignmentOperateData = { id: state.detailForm.id }
          const dataRet = await getAssignCommit(params)
          if (dataRet) {
            const cusParams: ICustonizeData = {
              api: state.detailForm.url,
              data: state.detailForm.data as any
            }
            const customizeDataRet = await setCustomize(cusParams)
            if (customizeDataRet) {
              if (customizeDataRet.stat) {
                await updateStatus('success')
              } else {
                await updateStatus('fail')
              }
            }
          }
        }
        if (['refuse'].includes(type)) {
          updateStatus('refuse')
        }
      }).catch(() => { })
    }

    const updateStatus: (type: string) => Promise<void> = async (type: string): Promise<void> => {
      const params: IAssignmentOperateDetailData = { id: props.editItem.item.id, data: { status: type, handle_reason: state.detailForm.handle_reason } }
      const dataRet = await getAssignOperate(params)
      if (dataRet) {
        if (dataRet.stat) {
          proxy.$notification('operationSuccess')
          close()
        }
      }
    }

    const close = () => {
      proxy.$emit('close')
    }

    onMounted(() => {
      getData()
    })

    return {
      ...toRefs(state),
      rules,
      ASSIGNMENT_DIALOG_CONFIG,
      confirm,
      close,
      updateRefuse,
    }
  }
})
</script>

<style scoped lang="scss">
.select-tree {
  border: 1px solid var(--color-dialog-line);
}

.select-tree-name {
  width: 100%;
  height: 50px;
  padding: 10px;
  border-bottom: 1px solid var(--color-dialog-line);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-left {
    width: 100%;
    font-weight: 600;
  }

  &-right {
    height: 100%
  }
}

.detail-form {
  :deep(.el-form-item__label) {
    font-size: 12px !important;
  }

  :deep(.el-form-item__content) {
    font-size: 12px !important;
  }
}
</style>