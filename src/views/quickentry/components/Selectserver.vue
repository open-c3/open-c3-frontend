<template>
  <Dialog v-bind="$attrs" :config="config" :title="editItem.title" @close="close" @success="confirm">
    <template #content>
      <el-form ref="form" :model="selectForm" label-width="100px">
        <el-form-item :label="`${$t('select')}${$t('type')}`" prop="type">
          <div class="select-server-content">
            <el-radio-group v-model="selectForm.type">
              <el-radio v-for="item in radioOption" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <div class="mt30">
          <!-- IP -->
          <div v-if="selectForm.type === 'ip'">
            <search-from :params="searchParams.params" :config="searchParams.config" @reset="reset"
              @query="pageChange(1)" />
            <el-divider class="costv-divider mt16 mb16" />
            <Table row-key="name" :thead="NOTICE_THEAD" :data="ips.list" :highlight-current-row="false" :page="ips.page"
              :pageSize="ips.pageSize" :tableLoading="ips.loading" :total="ips.total"
              :pageChange="page => pageChange(page, 'ips')" :pageSizeChange="size => pageSizeChange(size, 'ips')"
              @selection-change="handleSelectionChange">
              <template #multiple>
                <el-table-column :reserve-selection="true" type="selection" align="center" width="45" />
              </template>
              <template #inip="{ row }">
                <el-table-column :label="$t('privateIP')" width="150">
                  <template #default="scope">
                    <div v-if="!(scope as any).row.inip || (scope as any).row.inip === ''">-</div>
                    <div v-else class="table-column-ip">
                      <el-checkbox :ref="`exip-${(scope as any).$index}`" v-model="(scope as any).index" label=""
                        class="mr20" @change="onInipChange((scope as any).row, $event)" />
                      <span
                        :class="`${(scope as any).row.inip && !(scope as any).row.inips.status ? '' : (scope as any).row.inip && (scope as any).row.inips.status === 'fail' ? 'is-fail' :
                          (scope as any).row.inip && (scope as any).row.inips.status === 'success' ? 'is-success' : ''}`">
                        {{ (scope as any).row.inip }}
                      </span>
                    </div>
                  </template>
                </el-table-column>
              </template>
              <template #exip="{ row }">
                <el-table-column :label="$t('privateIP')" width="150">
                  <template #default="scope">
                    <div v-if="!(scope as any).row.exip || (scope as any).row.exip === ''">-</div>
                    <div v-else class="table-column-ip">
                      <el-checkbox :ref="`exip-${(scope as any).$index}`" v-model="(scope as any).index" label=""
                        class="mr20" @change="onExipChange((scope as any).row, $event)" />
                      <span
                        :class="`${(scope as any).row.exip && !(scope as any).row.exips.status ? '' : (scope as any).row.exip && (scope as any).row.exips.status === 'fail' ? 'is-fail' :
                          (scope as any).row.exip && (scope as any).row.exips.status === 'success' ? 'is-success' : ''}`">
                        {{ (scope as any).row.exip }}
                      </span>
                    </div>
                  </template>
                </el-table-column>
              </template>
              <template #clientVersion="{ row }">
                <el-table-column :label="$t('clientVersion')" width="150">
                  <template #default="scope">
                    <div v-if="(scope as any).row.inip">{{ (scope as any).row.inips.version }}</div>
                    <div v-if="(scope as any).row.exip && !(scope as any).row.inip">{{ (scope as any).row.exips.version }}
                    </div>
                  </template>
                </el-table-column>
              </template>
              <template #clientLastDetectionTime="{ row }">
                <el-table-column :label="$t('clientLastDetectionTime')" width="150">
                  <template #default="scope">
                    <div v-if="(scope as any).row.inip">{{ (scope as any).row.inips.edit_time }}</div>
                    <div v-if="(scope as any).row.exip && !(scope as any).row.inip">{{ (scope as any).row.exips.edit_time
                    }}</div>
                  </template>
                </el-table-column>
              </template>
              <template #clientErrorReason="{ row }">
                <el-table-column :label="$t('clientErrorReason')" width="150">
                  <template #default="scope">
                    <div v-if="(scope as any).row.inip && (scope as any).row.inips.status === 'fail'">
                      failcount:{{ (scope as any).row.inips.fail }};{{ (scope as any).row.inips.reason }}</div>
                    <div
                      v-if="(scope as any).row.exip && !(scope as any).row.inip && (scope as any).row.exips.status === 'fail'">
                      failcount:{{ (scope as any).row.exips.fail }};{{ (scope as any).row.exips.reason }}</div>
                  </template>
                </el-table-column>
              </template>
            </Table>
          </div>

          <!-- 分组选择 -->
          <div v-if="selectForm.type === 'group'">
            <Table :thead="GROUPS_THEAD" :data="groups.list" highlight-current-row :tableLoading="groups.loading"
              :page="groups.page" :pageSize="groups.pageSize" :total="groups.total" @current-change="handleCurrentChange"
              :pageChange="page => pageChange(page, 'groups')" :pageSizeChange="size => pageSizeChange(size, 'groups')">
            </Table>
          </div>
          <!-- 选择变量 -->
          <div v-if="selectForm.type === 'variable'">
            <Table :thead="VARIABLE_THEAD" :data="variable.list" :highlight-current-row="false"
              :tableLoading="variable.loading" :total="variable.total" :pageChange="page => pageChange(page, 'variable')"
              :pageSizeChange="size => pageSizeChange(size, 'variable')">
              <template #name="{ row }">
                <div>
                  <el-input v-model="row.name" @change="oninputChange" />
                  <!-- <el-input v-model="variable.text"/> -->
                </div>
              </template>
            </Table>
          </div>
          <!-- 手写IP -->
          <div v-if="selectForm.type === 'custom'">
            <p>{{ $t('handwrittenIPMultiple') }}</p>
            <p>{{ $t('handwrittenIPMultiple2') }}</p>
            <el-input v-model="custom.text" type="textarea" class="h300" />
          </div>
        </div>
      </el-form>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, getCurrentInstance, ComponentInternalInstance, watch } from 'vue'
import Table from '@/components/table/index.vue'
import searchFrom from '@/components/search/index.vue'
import store from '@/store'
import Dialog from '@/components/dialog/index.vue'
import { deepClone } from '@/utils'
import {
  ADD_ENV_GROUPS_CONFIG,
  PERCENT_TABLE_THEAD,
  HOST_RESOURCE_SEARCH,
  NOTICE_THEAD,
  GROUPS_THEAD,
  VARIABLE_THEAD,
} from './config'
import {
  getMachineTable,
  getGroupListTable,
} from '@/api/quickentry/index'

type RadioGroupType = {
  page: number;
  pageSize: number;
  total: number;
  list: Array<any>;
  loading: boolean;
  text?: string;
}
interface StateInfo {
  selectForm: {
    type?: string
  };
  searchParams: {
    config?: any,
    params: {
      name: string;
      type: string
      inip: string;
      exip: string;
    },
  };
  ips: RadioGroupType;
  groups: RadioGroupType;
  variable: RadioGroupType;
  custom: { text: string };
  inipSelectValues: Array<any>,
  exipSelectValues: Array<any>,
  radioGroupValues: any;
  inputVariableValues: string;
  repIps: Array<string>;
  ipsArray: Array<string>;
}

export default defineComponent({
  components: {
    Table,
    Dialog,
    searchFrom
  },

  props: {
    config: {
      type: Object,
      default: ADD_ENV_GROUPS_CONFIG,
      required: false,
    },
    editItem: {
      type: Object,
      default: {}
    },
    treeId: {
      type: String,
      default: '4000000000',
    },
    radioOption: {
      type: Array<any>,
      default: []
    }
  },

  emits: ['success', 'close'],

  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeArray = computed(() => {
      return store.getters.treeArray
    })
    const radioGroupObj: RadioGroupType = {
      page: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      list: []
    }
    const state: StateInfo = reactive({
      selectForm: {
        type: 'ip'
      },
      machineType: 'list',
      choiceServerNum: 0,
      tableList: [],
      tableLoading: false,
      ipTableList: [],
      tableTotal: 0,
      tableChecked: false,
      page: 1,
      pageSize: 10,
      searchParams: {
        config: HOST_RESOURCE_SEARCH,
        params: {
          name: '',
          type: '',
          inip: '',
          exip: ''
        },
      },
      ips: deepClone(radioGroupObj),
      groups: deepClone(radioGroupObj),
      variable: {
        ...deepClone(radioGroupObj),
        list: [{ id: 1, name: '$ip' }],
        text: '$ip'
      },
      custom: {
        text: '',
      },
      inipSelectValues: [],
      exipSelectValues: [],
      radioGroupValues: {},
      inputVariableValues: '',
      repIps: [],
      ipsArray: [],
    })

    // 获取服务器信息
    const getMacheInfoData = async () => {
      state.ips.loading = true
      const dataRet = await getMachineTable({ treeId: props.treeId }).catch(err => { state.ips.loading = false })
      if (dataRet) {
        state.ips.loading = false
        state.ips.list = dataRet
        state.ips.total = dataRet.length
      }
    }

    // 获取分组列表
    const getGroupData = async () => {
      state.groups.loading = true
      const dataRet = await getGroupListTable({ treeId: props.treeId }).catch(err => { state.groups.loading = false })
      if (dataRet) {
        state.groups.loading = false
        state.groups.list = dataRet
        state.groups.total = dataRet.length
      }
    }

    // 表单多选
    const handleSelectionChange = (value: any) => {
    }

    const reset = () => {
      state.searchParams.params = {
        name: '',
        type: '',
        inip: '',
        exip: ''
      }
      getMacheInfoData()
    }

    const pageChange = (page: number, type?: string) => {
      state[type].page = page
      const list = state[type].list.filter(item => item.name.includes(state.searchParams.params.name) && item.type.includes(state.searchParams.params.type) && item.inip.includes(state.searchParams.params.inip) && item.exip.includes(state.searchParams.params.exip))
      state[type].total = list.length
      state[type].list = list.slice((state[type].page - 1) * state[type].pageSize, state[type].page * state[type].pageSize)
    }

    const pageSizeChange = (size: number, type?: string) => {
      state[type].pageSize = size
      pageChange(1, type)
    }

    const onExipChange = (row: any, event: boolean) => {
      if (event === true) {
        state.exipSelectValues.push(row.exip)
      } else {
        state.exipSelectValues.splice(row.exip, 1)
      }

    }

    const onInipChange = (row: any, event: boolean) => {
      if (event === true) {
        state.exipSelectValues.push(row.exip)
      } else {
        state.exipSelectValues.splice(row.exip, 1)
      }
    }
    const oninputChange = (value) => {
      state.inputVariableValues = value
    }

    const handleCurrentChange = (value: any) => {
      state.radioGroupValues = value
    }

    const confirm = () => {
      if (state.selectForm.type === 'ip') {
        const ips: string[] = []
        // 选择的ip地址 
        state.repIps = ips.concat(state.exipSelectValues, state.inipSelectValues)
        state.radioGroupValues = {}
        state.inputVariableValues = ''
        state.ipsArray = []
        store.dispatch('setSelectIpArray', state.repIps)
        store.dispatch('setSelectGroupArray', [])
        store.dispatch('setVariableArray', [])
        store.dispatch('setCustomArray', [])
        close(state.selectForm.type)
        return
      }
      // 分组
      if (state.selectForm.type === 'group') {
        state.repIps = []
        state.inputVariableValues = ''
        state.ipsArray = []
        if (state.radioGroupValues['name']) {
          store.dispatch('setSelectGroupArray', [state.radioGroupValues])
          store.dispatch('setSelectIpArray', [])
          store.dispatch('setVariableArray', [])
          store.dispatch('setCustomArray', [])
        } else {
          proxy.$notification(proxy.$t('selectGroupMsg'), 'error')
        }
        close(state.selectForm.type)
        return
      }
      // 变量
      if (state.selectForm.type === 'variable') {
        state.repIps = []
        state.radioGroupValues = {}
        state.ipsArray = []
        store.dispatch('setVariableArray', [state.inputVariableValues])
        store.dispatch('setSelectGroupArray', [])
        store.dispatch('setSelectIpArray', [])
        store.dispatch('setCustomArray', [])
        close(state.selectForm.type)
        return
      }
      // 手写
      if (state.selectForm.type === 'custom') {
        state.repIps = []
        state.radioGroupValues = {}
        state.inputVariableValues = ''
        const textArray = state.custom.text.split(/\n| |,/)
        textArray.forEach(item => {
          if (item.length > 0) {
            state.ipsArray.push(item)
          }
        })
        store.dispatch('setCustomArray', state.ipsArray)
        store.dispatch('setVariableArray', [])
        store.dispatch('setSelectGroupArray', [])
        store.dispatch('setSelectIpArray', [])
        close(state.selectForm.type)
        return
      }
    }

    const close = (type?: string) => {
      if (type) {
        proxy.$emit('close', type)
      } else {
        proxy.$emit('close')
      }
    }

    watch(() => state.selectForm.type, (value) => {
      switch (value) {
        case 'ip':
          state.radioGroupValues = {}
          state.inputVariableValues = ''
          state.ipsArray = []
          break
        case 'group':
          state.repIps = []
          state.inputVariableValues = ''
          state.ipsArray = []
          break
        case 'variable':
          state.radioGroupValues = {}
          state.repIps = []
          state.ipsArray = []
          break
        case 'custom':
          state.radioGroupValues = {}
          state.repIps = []
          state.inputVariableValues = ''
          break
      }
    })

    onMounted(() => {
      getMacheInfoData()
      getGroupData()
    })

    return {
      treeArray,
      ...toRefs(state),
      NOTICE_THEAD,
      VARIABLE_THEAD,
      GROUPS_THEAD,
      ADD_ENV_GROUPS_CONFIG,
      PERCENT_TABLE_THEAD,
      close,
      reset,
      confirm,
      pageChange,
      onInipChange,
      onExipChange,
      getGroupData,
      oninputChange,
      pageSizeChange,
      getMacheInfoData,
      handleCurrentChange,
      handleSelectionChange,
    }
  }
})
</script>

<style scoped lang="scss">
.machine-select {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}

.table-column-ip {
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span {
    display: inline-block;
    // margin-left: 10px;
  }
}

.select-server-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}

.is-fail {
  color: var(--el-color-danger)
}

.is-success {
  color: var(--el-color-success)
}
</style>