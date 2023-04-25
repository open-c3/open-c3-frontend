<template>
  <div class="body-layout1">
    <saas-tabs :label="treeData?.parent" class="mt-20" />
    <div class="layout-content">
      <base-form class="layout-content-form" ref="form" :config="config.form" :params="params">
        <!-- 审批内容 -->
        <template #cont>
          <div class="target-file-form-items">
            <el-input class="w450" v-model="params.cont" type="textarea" />
            <el-tooltip class="box-item" effect="dark" :content="$t('viewApprovalHelp')" placement="top">
              <a target='_blank' href="#/book/发起审批/">
                <svg-icon icon-class="blankLink" width="16px" height="16px" />
              </a>
            </el-tooltip>
          </div>
        </template>
      </base-form>
      <div class="layout-content-confirm">
        <el-button type="primary" @click="handleConfirm">{{ $t('execute') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Table from '@/components/table/index.vue'
import moment from 'moment'
import baseForm from '@/components/baseForm/index.vue'
import store from '@/store'
import { ElMessageBox } from 'element-plus'
import {
  APPROVAL_FORM_CONFIG,
} from './config'
import {
  initiateApproval
} from '@/api/implement/approval'
import {
  InitiateApprovalInfo,
} from '@/api/interface/implement'

export default defineComponent({
  components: { Table, baseForm },
  props: {
    treeId: {
      type: String,
      default: '4000000000'
    }
  },
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeId = computed(() => { return store.getters.treeId })
    const treeData = computed(() => { return store.getters.treeData })

    const state = reactive({
      config: APPROVAL_FORM_CONFIG,
      params: {
        name: '',                       // 作业名称
        cont: '',                       // 审批内容
        approver: '',                   // 审批人
        deployenv: 'always',            // 生效环境
        action: 'always',               // 生效动作
        batches: 'always',              // 分批
        everyone: 'on',                 // 所有审批人都要审批
        relaxed: 'off',                 // 策略
        timeout: '86400',               // 超时时间
      }
    })

    const defaultOperate = () => {
      state.params.name = `${proxy.$t('executeApproverQuickly')}-${moment().format('YYYYMMDDHHmmss')}`
      state.params.cont = proxy.$t('approverCont')
    }

    const handleConfirm = () => {
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          ElMessageBox.confirm(proxy.$t('initiateApprovalMessage'), proxy.$t('initiateApproval'), {
            confirmButtonText: proxy.$t('confirm'),
            cancelButtonText: proxy.$t('cancel'),
            type: 'warning'
          }).then(async () => {
            const params: InitiateApprovalInfo = {
              treeId: treeId.value,
              data: state.params
            }
            const dataRet = await initiateApproval(params)
            if (dataRet) {
              proxy.$notification(proxy.$t('operationSuccess'))
            }
          })
        }
      })


    }

    onMounted(() => {
      defaultOperate()
    })

    return {
      treeId,
      treeData,
      ...toRefs(state),
      handleConfirm,
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

  &-confirm {
    margin-top: 30px;
  }
}

.card-header {
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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