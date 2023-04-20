<template>
  <Dialog v-bind="$attrs" :config="config" @close="close" :title="editItem.title" @success="close">
    <template #content>
      <Table :thead="EDIT_RELY_MODEL_THEAD" :data="tableList">
        <template #operation="{ row }">
          <div>
            <el-button type="primary" link @click="operate('delete', row)">{{ $t('delete') }}</el-button>
          </div>
        </template>
      </Table>

      <base-form ref="form" :config="config.form" :params="detailFrom" class="mt20 mb20">
        <template #addr>
          <el-input style="width:450px" v-model="detailFrom.addr" :placeholder="$t('addrPlaceholder')" />
          <div class="addr-tooltip">
            <el-tooltip class="box-item" effect="dark" :content="$t('viewCodeHelp')" placement="top">
              <a target='_blank' href="#/book/流水线多种代码来源/">
                <svg-icon icon-class="blankLink" width="16px" height="16px" />
              </a>
            </el-tooltip>
          </div>
        </template>
      </base-form>
      <el-divider class="costv-divider mt16 mb16" />
      <div class="form-confirm">
        <el-button type="primary" @click="confirm">{{ $t('save') }}</el-button>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, getCurrentInstance, ComponentInternalInstance } from 'vue'
import store from '@/store'
import Table from '@/components/table/index.vue'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { ElMessageBox } from 'element-plus'

import {
  EDIT_RELY_DIALOG_CONFIG,
  EDIT_RELY_MODEL_THEAD,
} from '../config'
import {
  getRelyList,
  addNewRely,
  deleteRelyRow,
  getCodeTicketNoPath,
} from '@/api/quickentry/index'
import {
  RelyRowInfo,
  AddRelyInfo,
  TicketAllInfo,
  FavoritesParams,
  FlowBlankLine,
  CreateJobLine,
} from '@/api/interface/quickentry'

interface Stateinfo {
  detailFrom: {
    addr: string;
    path: string;
    tags: string;
    ticketid: string;

  },
  defaultProps: {
    children: string;
    label: string;
  },
  tableList: Array<any>;
  newrely: any;
  loading: boolean;
  tickedList: TicketAllInfo[]
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
      default: EDIT_RELY_DIALOG_CONFIG
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

  emits: ['success', 'close'],

  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const treeArray = computed(() => {
      return store.getters.treeArray
    })

    const state: Stateinfo = reactive({
      detailFrom: {
        addr: '',
        path: '',
        tags: '',
        ticketid: '',
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      tableList: [],
      tickedList: [],
      newrely: {},
      loading: false,
    })

    // 获取依赖规则列表
    const getDatalRely = async () => {
      state.loading = true
      const params = {
        id: props.editItem.sourceId
      }
      const dataRet = await getRelyList(params).catch(() => { state.loading = false })
      if (dataRet) {
        state.loading = false
        state.tableList = [...dataRet]
      }
    }
    // 获取凭据列表 
    const getTickIdList = async () => {
      const dataRet = await getCodeTicketNoPath({})
      if (dataRet) {
        const newData = JSON.parse(JSON.stringify(dataRet))
        newData.map(item => item.label = item.name)
        state.tickedList = [...newData]
        props.config.form.config.filter(item => item.prop === 'ticketid')[0].data = state.tickedList
      }
    }

    const confirm = () => {
      (proxy?.$refs.form as any).validFun().then(async (flag: any) => {
        if (flag) {
          switch (props.conTypes) {
            case 'EditRelyModal':
              ElMessageBox.confirm(proxy?.$t('addDependencyDesc'), proxy?.$t('addDependency'), {
                confirmButtonText: proxy?.$t('config_options_confirm'),
                cancelButtonText: proxy?.$t('config_options_cancel'),
                type: 'warning'
              }).then(() => {
                const params: AddRelyInfo = {
                  id: props.editItem.sourceId,
                  data: {
                    addr: state.detailFrom.addr,
                    path: state.detailFrom.path,
                    tags: state.detailFrom.tags,
                    ticketid: state.detailFrom.ticketid,
                  }
                }
                addNewRely(params).then(res => {
                  proxy?.$notification('operationSuccess')
                  getDatalRely()
                }).catch(err => {
                  console.error(err)
                }).finally(() => { })
              })
              break
          }
        }
      })
    }

    const close = () => {
      proxy.$emit('close')
    }

    const operate = (type: string, row: any) => {
      switch (type) {
        case 'delete':
          ElMessageBox.confirm(proxy?.$t('deleteDependencyDesc'), proxy?.$t('deleteDependency'), {
            confirmButtonText: proxy?.$t('config_options_confirm'),
            cancelButtonText: proxy?.$t('config_options_cancel'),
            type: 'warning'
          }).then(() => {
            state.loading = true
            const params: RelyRowInfo = {
              projectId: props.editItem.sourceId,
              id: row.id
            }
            deleteRelyRow(params).then(data => {
              proxy?.$notification('deleteSuccess')
              getDatalRely()
            })
          }).catch(() => { state.loading = false })
            .finally(() => { state.loading = false })
          break
      }
    }

    onMounted(() => {
      getDatalRely()
      getTickIdList()
    })

    return {
      treeArray,
      ...toRefs(state),
      EDIT_RELY_DIALOG_CONFIG,
      EDIT_RELY_MODEL_THEAD,
      confirm,
      close,
      operate,
      getTickIdList,
      getDatalRely,
    }
  }
})
</script>

<style scoped lang="scss">
.addr-tooltip {
  display: inline-block;
  margin-left: 10px;
}

.form-confirm {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 150px;
}
</style>