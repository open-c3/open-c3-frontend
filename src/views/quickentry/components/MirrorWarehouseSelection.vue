<template>
  <Dialog v-bind="$attrs" :config="config" @close="close" @success="confirm">
    <template #content>
      <div v-if="editItem.ticketId === ''">
        <base-form ref="form" :config="config.form" :params="detailFrom" class="mt20 mb20" />
      </div>
      <div v-if="tableList.length > 0">
        <Table :thead="MIRROR_WAREHOUSE_SELECTION_THEAD" :data="tableList" :highlight-current-row="false">
          <template #repo="{ row }">
            <el-table-column prop="repo" :label="$t('name')" sortable width="180" :align="'center'">
              <template #default="{ row }">
                {{ row.repo || '-' }}
              </template>
            </el-table-column>
          </template>
          <template #type="{ row }">
            <el-table-column prop="type" :label="$t('type')" sortable width="180" :align="'center'">
              <template #default="{ row }">
                {{ row.type || '-' }}
              </template>
            </el-table-column>
          </template>
          <template #artifact_count="{ row }">
            <el-table-column prop="artifact_count" label="artifact_count" sortable width="180" :align="'center'">
              <template #default="{ row }">
                {{ row.artifact_count || '-' }}
              </template>
            </el-table-column>
          </template>
          <template #pull_count="{ row }">
            <el-table-column prop="pull_count" label="pull_count" sortable width="180" :align="'center'">
              <template #default="{ row }">
                {{ row.pull_count || '-' }}
              </template>
            </el-table-column>
          </template>
          <template #operate="{ row }">
            <el-table-column prop="operate" :label="$t('operate')" :align="'center'">
              <template #default="{ row }">
                <el-button @click="operate('selectWarehouse', row)" type="primary" link>{{ $t('selectWarehouse')
                }}</el-button>
              </template>
            </el-table-column>
          </template>
        </Table>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, getCurrentInstance, ComponentInternalInstance } from 'vue'
import Table from '@/components/table/index.vue'
import store from '@/store'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import {
  MIRROR_WAREHOUSE_SELECTION_FORM_CONFIG,
  MIRROR_WAREHOUSE_SELECTION_THEAD,
} from './config'
import {
  getHarborTableList,
  getHarborSelectList
} from '@/api/quickentry/index'
import {
  GetCredentialsInfo
} from '@/api/interface/quickentry'
import { ElMessageBox, ElNotification } from 'element-plus'

interface Stateinfo {
  detailFrom: {
    ticketid: string;
  };
  tableList: Array<any>;
  tableLoading: boolean;
  selectOption: Array<any>;
  selectTableWare: string;
}

export default defineComponent({
  components: {
    Table,
    Dialog,
    baseForm
  },

  props: {
    types: {
      type: String,
      default: 'Collect'
    },
    conTypes: {
      type: String,
      default: 'Collect',
      require: false
    },
    config: {
      type: Object,
      default: MIRROR_WAREHOUSE_SELECTION_FORM_CONFIG
    },
    editItem: {
      type: Object,
      default: {}
    },
    treeId: {
      type: Number,
      default: 4000000000
    },
    treeData: {
      type: Object,
      default: {}
    },
  },

  emits: ['success', 'close', 'selectRepo'],

  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeArray = computed(() => {
      return store.getters.treeArray
    })

    const state: Stateinfo = reactive({
      detailFrom: {
        ticketid: '',
      },
      tableList: [],
      tableLoading: false,
      selectOption: [],
      selectTableWare: '',
    })

    // 获取凭据列表
    const getCredentials = async () => {
      if (props.editItem.ticketId && props.editItem.ticketId !== '') {
        const params: GetCredentialsInfo = {
          ticketid: props.editItem.ticketId
        }
        state.tableLoading = true
        const dataRet = await getHarborTableList(params).catch(err => { state.tableLoading = false })
        if (dataRet) {
          state.tableLoading = false
          state.tableList = [...dataRet]
        }
      } else {
        const params: GetCredentialsInfo = {
          type: 'Harbor'
        }
        const dataRet = await getHarborSelectList(params)
        if (dataRet) {
          const newData = JSON.parse(JSON.stringify(dataRet))
          newData.map(item => {
            item.label = item.name
            return item
          })
          state.selectOption = [...newData]
        }
      }
    }

    const operate = (type: string, row: any) => {
      switch (type) {
        case 'selectWarehouse':
          ElMessageBox.confirm(proxy?.$t('selectWarehouseDesc'), proxy?.$t('selectWarehouseTitle'), {
            confirmButtonText: proxy?.$t('config_options_confirm'),
            cancelButtonText: proxy?.$t('config_options_cancel'),
            type: 'warning'
          }).then(() => {
            state.selectTableWare = row?.type
            proxy.$notification(proxy.$t('operationSuccess'));
            proxy.$emit('selectRepo', row?.repo)
            close()
          }).catch(() => { })
            .finally(() => { })
          break
      }
    }

    const confirm = () => {
      if (props.editItem.ticketId === '') {
        (proxy?.$refs.form as any).validFun().then(async (flag: any) => {
          if (flag) {
            close()
          }
        })
      }
      if (state.tableList.length > 0) {
        if (state.selectTableWare === '') {
          ElNotification({type:'error', message: proxy.$t('firstSelectWaremessafe')})
        }
      } else {
        proxy.$notification(proxy.$t('operationSuccess'));
        close()
      }
    }

    const close = () => {
      proxy.$emit('close')
    }

    onMounted(() => {
      getCredentials()
    })

    return {
      treeArray,
      ...toRefs(state),
      MIRROR_WAREHOUSE_SELECTION_THEAD,
      MIRROR_WAREHOUSE_SELECTION_FORM_CONFIG,
      close,
      confirm,
      operate,
      getCredentials,
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

.layout-title {
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-header {
    color: var(--color_text)
  }

  &-operate {
    display: flex;
    justify-content: flex-end;
  }
}

.layout-content {
  padding: 10px;
  min-height: 400px;
  widows: 100%;
  background-color: #000;
  color: #FFF;
}
</style>