<template>
  <div class="data-form-tags">
    <el-button-group class="ml-4">
      <el-button v-for="(item, index) in buttonGroup" :key="index" @click="handleSelect(tableType, item.value)"
        class="group-item" type="primary">
        {{ item.text }}
      </el-button>
    </el-button-group>
    <div class="add-item-con">
      <div class="mt10" v-if="selectButton !== ''">
        <el-form v-model="tableFrom" label-width="130px" :inline="true">
          <el-form-item :label="$t('firstDetectionTime')">
            <el-input-number v-model="tableFrom.initialDelaySeconds" :step="1" />
          </el-form-item>
          <el-form-item :label="$t('detectionIntervalTime')">
            <el-input-number v-model="tableFrom.periodSeconds" :step="1" />
          </el-form-item>
          <el-form-item :label="$t('probeTimeout')">
            <el-input-number v-model="tableFrom.timeoutSeconds" :step="1" />
          </el-form-item>
        </el-form>

        <el-form class="mt10" v-model="tableFrom" label-width="100px" :inline="true">
          <el-form-item v-if="selectButton === 'command'" :label="$t('commandLine')">
            <el-input v-model="tableFrom.exec.command" />
          </el-form-item>
          <el-form-item v-if="selectButton === 'http'" :label="$t('port')">
            <el-input v-model="tableFrom.httpGet.port" />
          </el-form-item>
          <el-form-item v-if="selectButton === 'http'" :label="$t('path')">
            <el-input v-model="tableFrom.httpGet.path" />
          </el-form-item>
          <el-form-item v-if="selectButton === 'tcp'" :label="$t('port')">
            <el-input v-model="tableFrom.tcpSocket.path" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Table from '@/components/table/index.vue'
import {
  APPLY_PROBE_BUTTON_GROUP,
  HOST_PATH_SELECT,
} from '../config'

interface StateInfo {
  tableFrom: any;
  buttonGroup: Array<any>;
  formType: any;
  formFlag: boolean;
  selectButton: string
}

export default defineComponent({
  components: {
    Table,
  },
  props: {
    tableType: {
      type: String,
      default: '',
    },
    tableConfig: {
      type: Object,
      default: {}
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const state: StateInfo = reactive({
      tableFrom: {
        initialDelaySeconds: 0,
        periodSeconds: 0,
        timeoutSeconds: 0,
        exec: {
          command: ''
        },
        httpGet: {
          port: '',
          path: '',
        },
        tcpSocket: {
          port: ''
        }
      },
      buttonGroup: APPLY_PROBE_BUTTON_GROUP,
      formType: {},
      formFlag: false,
      selectButton: '',
    })

    const handleSelect = (tableType: string, subType: string) => {
      state.selectButton = subType
    }

    const defaultOperate = () => {
    }

    onMounted(() => {
      defaultOperate()
    })

    return {
      APPLY_PROBE_BUTTON_GROUP,
      ...toRefs(state),
      handleSelect,
    }
  }
})

</script>

<style lang="scss" scoped>
.group-item {
  margin-left: 2px !important;
}

.add-item-con {
  width: 100%;
  margin-top: 20px;
}
</style>