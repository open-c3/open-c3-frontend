<template>
  <div class="body-layout1">
    <saas-tabs :label="treeData?.parent" class="mt-20" />
    <div class="layout-content">
      <el-form ref="form" :model="scpForm" label-width="100px">
        <el-form-item :label="$t('JobName')">
          <el-input class="w450" v-model="scpForm.name" />
        </el-form-item>
      </el-form>
      <div class="mt10">
        <SourceFileCard :treeId="String(treeId)" class="source-card"/>
      </div>

      <div class="mt10">
        <TargetFileCard :treeId="String(treeId)" class="source-card"/>
      </div>
    </div>
    <div class="layout-content-confirm">
        <el-button type="primary" @click="handleConfirm">{{ $t('executeScripts') }}</el-button>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import store from '@/store'
import moment from 'moment'
import Table from '@/components/table/index.vue'
import SourceFileCard from './operate/SourceFileCard.vue'
import TargetFileCard from './operate/TargetFileCard.vue'
import { ElMessageBox } from 'element-plus'
import {
  SCP_SOURCE_FILE_SELECT_TYPE_HEAD
} from './config'
import {
  getJobUserList,
  districtbuttonFile,
} from '@/api/implement/index'
import {
  TreeIdInfo,
  DistrictGileInfo
} from '@/api/interface/implement'

export default defineComponent({
  components: { Table, SourceFileCard, TargetFileCard },
  props: {},
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeData = computed(() => { return store.getters.treeData })
    const treeId = computed(() => { return store.getters.treeId })

    const state = reactive({
      scpForm: {
        name: ''
      },
      activeName: 'share',
      allProUsers: [],
      typeThead: SCP_SOURCE_FILE_SELECT_TYPE_HEAD
    })

    // 获取用户列表
    const getUserData: () => Promise<void> = async (): Promise<void> => {
      const params: TreeIdInfo = {
        treeId: treeId.value
      }
      const dataRet = await getJobUserList(params)
      if (dataRet) {
        state.allProUsers = dataRet
      }
    }

    // 源文件选择类型
    const handleSelectSourceType: (type: string) => void = (type: string): void => {
      state.activeName = type
    }

    // 开始执行
    const handleConfirm: () => void = ():void => {
      return (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          ElMessageBox.confirm(proxy.$t('distributionFileMessage'), proxy.$t('distributionFile'), {
            confirmButtonText: proxy.$t('confirm'),
            cancelButtonText: proxy.$t('cancel'),
            type: 'warning'
          }).then(async () => {
            const params: DistrictGileInfo = {
            }
            const dataRet = await districtbuttonFile(treeId.value, params)
            if (dataRet) {
              proxy.$notification('success')
            }
          }).finally(() => {
          })
        }
      })
    }

    const defaultOperate: () => void = (): void => {
      state.scpForm.name = `${proxy.$t('DistributeFilesQuickly')}-${moment().format('YYYYMMDDHHmmss')}`
    }

    onMounted(() => {
      getUserData()
      defaultOperate()
    })

    return {
      treeId,
      treeData,
      ...toRefs(state),
      getUserData,
      handleSelectSourceType,
      handleConfirm,
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-content {
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  &-form {
    width: 50%;
  }
  &-confirm {
    margin-top: 30px;
  }
}

.w450 {
  width: 450px;
}

.source-card {
  width: 800px;
}
.layout-content-confirm {
  text-align: center;
  margin-top: 30px;
}
</style>