<template>
  <div class="data-form-tags">
    <el-button-group class="ml-4">
      <el-tooltip v-for="(item, index) in buttonGroup" :key="index" effect="dark" :content="item.tooltip" placement="top">
        <el-button link class="button-group" :type="item.type" :icon="item.icon"
          @click="addTag(tableType, item.subType)">{{ item.text }}</el-button>
      </el-tooltip>
    </el-button-group>
    <div class="add-item-con">
      <div class="table-items" v-for="(item, index) in containerArr" :key="index">
        <el-row style="height:100%" :gutter="20">
          <el-col :span="22">
            <el-form v-model="item.containerForm" label-width="100px">
              <!-- name -->
              <el-form-item :label="`${$t('container')}${$t('name')}`">
                <el-input v-model="item.containerForm.name" />
              </el-form-item>

              <!-- 镜像 -->
              <el-form-item class="mt10" :label="$t('mirrorImage')">
                <el-input v-model="item.containerForm.image" />
              </el-form-item>

              <!-- 镜像拉取策略 -->
              <el-form-item class="mt10" :label="$t('mirrorPullStarategy')">
                <el-button-group class="ml4">
                  <el-button class="group-item" v-for="(dItem, dIndex) in PULL_POLICY_BUTTON_GROUP" :key="dIndex"
                    type="primary" @click="handlePolicy(index, dItem.value)">{{ dItem.text }}</el-button>
                </el-button-group>
                <div class="mt10">{{ $t('mirrorPullStarategyMessage') }}</div>
              </el-form-item>

              <!-- CPU限制 -->
              <el-form-item class="mt10" :label="$t('cpuLimitApp')">
                request <el-input class="w130 ml30 mr30" v-model="item.containerForm.resources.requests.cpu" />
                limit <el-input class="w130 ml30" v-model="item.containerForm.resources.limits.cpu" />
              </el-form-item>

              <!-- 内存限制 -->
              <el-form-item class="mt10" :label="$t('memoryLimitApp')">
                request <el-input class="w130 ml30 mr30" v-model="item.containerForm.resources.requests.memory" />
                limit <el-input class="w130 ml30" v-model="item.containerForm.resources.limits.memory" />
              </el-form-item>

              <!-- 限制Message -->
              <el-form-item class="mt10" label="">
                <div class="message-item mt10" v-for="eItem in REQUEST_MESSAGE_ARRAY" :key="eItem">{{ eItem }}</div>
              </el-form-item>
              <!-- 启动命令 -->
              <el-form-item class="mt10" :label="$t('startCommand')">
                <div class="start-command">
                  <div class="start-command-input">
                    <div>{{ item.containerForm.command || '-' }}</div>
                    <el-input class="w400" v-if="item.editCommandStateFlag" v-model="item.containerForm.tempcommandstring"
                      :placeholder="$t('startCommand')" />
                  </div>
                  <div class="start-command-operate">
                    <el-button v-if="item.editCommandStateFlag" type="primary" link
                      @click="addCommand('start', index, item.containerForm.tempcommandstring)">
                      {{ $t('add') }}
                    </el-button>
                    <el-button type="primary" link
                      @click="() => { item.editCommandStateFlag = !item.editCommandStateFlag; item.containerForm.tempcommandstring = '' }">
                      {{ !item.editCommandStateFlag ? $t('edit') : $t('close') }}
                    </el-button>

                    <el-button type="primary" link @click="delCommand('start', index)">{{ $t('clearUp') }}</el-button>
                  </div>
                </div>
              </el-form-item>

              <!-- 命令参数 -->
              <el-form-item class="mt10" :label="$t('paramCommand')">
                <div class="start-command">
                  <div class="start-command-input">
                    <div>{{ item.containerForm.args || '-' }}</div>
                    <el-input class="w400" v-if="item.editCommandParamsFlag" v-model="item.containerForm.tempargsstring"
                      :placeholder="$t('paramCommand')" />
                  </div>
                  <div class="start-command-operate">
                    <el-button v-if="item.editCommandParamsFlag" type="primary" link
                      @click="addCommand('param', index, item.containerForm.tempargsstring)">
                      {{ $t('add') }}
                    </el-button>
                    <el-button type="primary" link
                      @click="() => { item.editCommandParamsFlag = !item.editCommandParamsFlag; item.containerForm.tempargsstring = '' }">
                      {{ !item.editCommandParamsFlag ? $t('edit') : $t('close') }}
                    </el-button>
                    <el-button type="primary" link @click="delCommand('param', index)">{{ $t('clearUp') }}</el-button>
                  </div>
                </div>
              </el-form-item>

              <!-- 环境变量 -->
              <el-form-item class="mt10" :label="$t('envVariable')">
                <AddButtonGroupTable class="demo-tabs" :buttonGroup="envVariableArr" :typeFlag="true"
                  :tableConfig="item.containerForm.env" :tableType="'variable'" />
              </el-form-item>

              <!--端口设置 -->
              <el-form-item class="mt10" :label="$t('portSettings')">
                <AddButtonGroupTable class="demo-tabs" :buttonGroup="portSettingArr" :typeFlag="true"
                  :tableConfig="item.containerForm.ports" :tableType="'portset'" />
              </el-form-item>

              <!-- 卷挂载点 -->
              <el-form-item class="mt10" :label="$t('volumeMountPoint')">
                <AddButtonGroupTable class="demo-tabs" :buttonGroup="volumeMountArr"
                  :tableConfig="item.containerForm.volumeMounts" :tableType="'volumeMount'" />
              </el-form-item>

              <!-- 应用存活探针 -->
              <el-form-item class="mt10" :label="$t('applySurvivalProbe')">
                <AddApplyProbe :tableConfig="item.containerForm.livenessProbe" :tableType="'livenessProbe'"/>
              </el-form-item>

              <!-- 应用就绪探针 -->
              <el-form-item class="mt10" :label="$t('applicationReadyProbe')">
                <AddApplyProbe :tableConfig="item.containerForm.readinessProbe" :tableType="'readinessProbe'"/>

              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="2">
            <div class="table-items-btn-content">
              <el-button type="primary" link @click="delTag(index, tableType)">{{ $t('delete') }}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Table from '@/components/table/index.vue'
import AddButtonGroupTable from './AddButtonGroupTable.vue'
import AddApplyProbe from './AddApplyProbe.vue'
import {
  PULL_POLICY_BUTTON_GROUP,
  REQUEST_MESSAGE_ARRAY,
  ENV_VARIABLE_GROUP_ARR,
  PORT_SETTING_GROUP_ARR,
  VOLUME_MOUNT_GROUP_ARR,
} from '../config'

interface StateInfo {
  containerArr: Array<any>;
  containerForm: any;
  pullPolicyGroup: Array<any>;
  envVariableArr: Array<any>;
  portSettingArr: Array<any>;
  volumeMountArr: Array<any>;
}

export default defineComponent({
  components: {
    Table,
    AddButtonGroupTable,
    AddApplyProbe,
  },
  props: {
    buttonGroup: {
      type: Array<any>,
      default: []
    },
    tableType: {
      type: String,
      default: '',
    },
    container: {
      type: Array<any>,
      default: []
    },
    editData: {
      type: Object,
      default: []
    }
  },
  // emits: ['addTag', 'delTag'],
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const state: StateInfo = reactive({
      containerArr: [],
      containerForm: {},
      pullPolicyGroup: [],
      envVariableArr: ENV_VARIABLE_GROUP_ARR,
      portSettingArr: PORT_SETTING_GROUP_ARR,
      volumeMountArr: VOLUME_MOUNT_GROUP_ARR,
    })


    const addTag = (tableType: string, subType: string) => {
      const newContainer = JSON.parse(JSON.stringify(state.containerArr))
      const newArr = newContainer.copyWithin(0)
      state.containerArr.push(newArr[0])
    }

    const delTag = (index: number, type: string) => {
      state.containerArr.splice(index, 1)
    }

    const handlePolicy = (index: number, value: string) => {
      if (value === '') {
        delete state.containerArr[index].containerForm['imagePullPolicy']
      } else {
        state.containerArr[index].containerForm['imagePullPolicy'] = value
      }
    }

    const addCommand = (type: string, index: number, value: any) => {
      if (type === 'start') {
        if (!state.containerArr[index].containerForm.command) {
          state.containerArr[index].containerForm.command = []
        }
        state.containerArr[index].containerForm.command.push(value)
        state.containerArr[index].containerForm.tempcommandstring = ''
      }
      if (type === 'param') {
        if (!state.containerArr[index].containerForm.args) {
          state.containerArr[index].containerForm.args = []
        }
        state.containerArr[index].containerForm.args.push(value)
        state.containerArr[index].containerForm.tempargsstring = ''
      }
    }

    const delCommand = (type: string, index: number) => {
      if (type === 'start') {
        delete state.containerArr[index].containerForm.command
        state.containerArr[index].containerForm.tempcommandstring = ''
      }
      if (type === 'start') {
        delete state.containerArr[index].containerForm.args
        state.containerArr[index].containerForm.tempargsstring = ''
      }
    }

    const defaultOption = () => {
      const newContainer = JSON.parse(JSON.stringify(props.container))
      state.containerArr = newContainer.map(item => {
        return {
          containerForm: {
            ...item,
            resources: {
              ...item.resources,
              env: []
            }
          },
          editCommandStateFlag: false,
          editCommandParamsFlag: false,
        }
      })
    }

    onMounted(() => {
      defaultOption()
    })

    return {
      PULL_POLICY_BUTTON_GROUP,
      REQUEST_MESSAGE_ARRAY,
      ...toRefs(state),
      addTag,
      delTag,
      handlePolicy,
      addCommand,
      delCommand,
    }
  }
})
</script>

<style lang="scss" scoped>
.add-item-con {
  width: 100%;
  margin-top: 20px;
}

.table-items {
  height: 100%;
  border: 1px solid var(--color_border);
  min-height: 50px;
  padding: 5px 0;
}

.group-item {
  margin-left: 2px !important;
}

.message-item {
  width: 90%;
  margin-left: 100px;
}

.table-items-btn-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.start-command {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
</style>