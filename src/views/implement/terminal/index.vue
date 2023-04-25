<template>
  <div class="body-layout1">
    <saas-tabs :label="treeData?.parent" class="mt-20" />
    <div class="layout-content">
      <el-form v-model="terminalForm" ref="form">
        <el-form-item :label="$t('executionAccount')" prop="name">
          <el-select class="w450" v-model="terminalForm.name">
            <el-option v-for="(item, index) in allProUsers" :key="index" :label="item.username" :value="item.username" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('addAddress')">
          <div class="layout-address-table">
            <el-button icon="Plus" type="primary" @click="addressFlag = true"></el-button>
            <Table class="mt10" :thead="TERMINAL_ADDRESS_THEAD" :data="dataList">
              <template #operate="scope">
                <div>
                  <el-button type="primary" link
                    @click="operateItem((scope as any).row, (scope as any).index)">{{ $t('delete') }}</el-button>
                </div>
              </template>
            </Table>
          </div>
        </el-form-item>
      </el-form>
      <div class="layout-content-confirm">
        <el-button type="primary" @click="operate('start')">{{ $t('startOperate') }}</el-button>
        <el-button type="primary" @click="operate('clear')">{{ $t('clear') }}</el-button>
        <el-button type="primary" @click="operate('selectAll')">{{ $t('selectAll') }}</el-button>
      </div>
    </div>
    <AddAddress v-if="addressFlag" v-model="addressFlag" :treeId="treeId" :selectUser="terminalForm.name" @close="addressFlag = false"
      @choiceServer="choiceServerConfirm" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Table from '@/components/table/index.vue'
import AddAddress from './components/AddAddress.vue'
import store from '@/store'
import {
  TERMINAL_ADDRESS_THEAD
} from './config'
import {
  getJobUserList
} from '@/api/implement/index'
import { TreeIdInfo } from '@/api/interface'

export default defineComponent({
  components: { Table, AddAddress },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeId = computed(() => { return store.getters.treeId })
    const treeData = computed(() => { return store.getters.treeData })
    const state = reactive({
      allProUsers: [],
      terminalForm: {
        name: 'root'
      },
      dataList: [],
      addressFlag: false,
      compType: '',
      editItem: {} as any,
      terminalAddr :`${window.location.protocol}//${window.location.host}/api/job/cmd/`
    })

    // 获取用户信息列表
    const getUserData: () => Promise<void> = async () => {
      const params: TreeIdInfo = { treeId: treeId.value }
      const dataRet = await getJobUserList(params)
      if (dataRet) {
        state.allProUsers = dataRet
      }
    }

    // 表格项删除操作
    const operateItem = (row: any, index: number) => {
      state.dataList.splice(index, 1)
    }

    // 表单操删除作
    const operate = (type: string, row?: any) => {
      if (state.dataList.length === 0) {
        proxy.$notification('nodeEmpty')
        return
      }
      if (type === 'start') {
        let link = `${treeId.value}?node=${state.dataList.join(',')}&sudo=${state.terminalForm.name}&siteaddr=${window.location.protocol}//${window.location.host}`
        window.open(`${state.terminalAddr}${link}`, '_blank')
      }else if (type === 'clear') {
        state.dataList = []
      }else if (type === 'selectAll') {
        let link = `${treeId.value}?node=${state.dataList.join(',')}&sudo=${state.terminalForm.name}&tail=1`
        window.open(`${state.terminalAddr}${link}`, '_blank')
      }
    }

    // 添加地址
    const choiceServerConfirm = (ip: Array<any>) => {
      state.dataList = ip.map((item, index) => {
        return {
          id: index,
          address: item
        }
      })
      state.addressFlag = false
    }

    onMounted(() => {
      getUserData()
    })

    return {
      TERMINAL_ADDRESS_THEAD,
      ...toRefs(state),
      treeId,
      treeData,
      operateItem,
      operate,
      choiceServerConfirm,
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-content {
  width: 100%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &-confirm {
    margin-top: 30px;
  }
}

.layout-address-table {
  width: 450px;
}

.w450 {
  width: 450px
}</style>