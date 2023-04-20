<template>
  <div class="body-layout1">
    <span class="layout-title">{{ treeData?.parent }}</span>
    <el-divider class="costv-divider mt16 mb16" />
    <div class="layout-content">
      <el-form ref="form" v-model="scpForm" label-width="100px">
        <el-form-item :label="$t('JobName')">
          <el-input class="w450" v-model="scpForm.name" />
        </el-form-item>
      </el-form>
      <el-card class="mt10 w450">
        <el-form ref="sourceForm" v-model="scpForm" label-width="100px">

        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import store from '@/store'
import moment from 'moment'
import {
  getJobUserList
} from '@/api/implement/index'
import {
  TreeIdInfo
} from '@/api/interface/implement'

export default defineComponent({
  components: {},
  props: {},
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeData = computed(() => { return store.getters.treeData })
    const treeId = computed(() => { return store.getters.treeId })

    const state = reactive({
      scpForm: {
        name: ''
      },
      allProUsers: []
    })

    // 获取用户列表
    const getUserData: () => Promise<void> = async (): Promise<void> => {
      const params:TreeIdInfo = {
        treeId: treeId.value
      }
      const dataRet = await getJobUserList(params)
      if (dataRet) {
        state.allProUsers = dataRet
      }
    }

    const defaultOperate: () => void = ():void => {
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

.scripts-content-box {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.item-value-switch {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>