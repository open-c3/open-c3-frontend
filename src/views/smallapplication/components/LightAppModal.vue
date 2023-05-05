<template>
  <Dialog v-bind="$attrs" :config="config"
    :title="info !== null ? `${$t('edit')}${$t('lightApplication')}` : `${$t('add')}${$t('lightApplication')}`"
    :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <div>
        <el-form ref="form" label-width="100px" :model="lightForm" :rules="rules">
          <el-form-item v-if="info === null" :label="$t('importAll')" required prop="import">
            <el-switch v-model="lightForm.import" />
          </el-form-item>
          <el-form-item v-if="!lightForm.import" :label="$t('task')" prop="choiceJob">
            <el-select class="w450" v-model="lightForm.choiceJob" :disabled="info !== null">
              <el-option v-for="item in allTaskOptions" :key="item" :value="JSON.stringify(item)" :label="item.alias" />
            </el-select>
          </el-form-item>

          <el-form-item v-if="!lightForm.import" :label="$t('title')" prop="title" required>
            <el-input class="w450" v-model="lightForm.title" />
          </el-form-item>

          <el-form-item :label="$t('type')" prop="type" required>
            <el-input class="w450" v-model="lightForm.type" />
          </el-form-item>

          <el-form-item :label="$t('describe')" prop="describe" required>
            <el-input class="w450" v-model="lightForm.describe" />
          </el-form-item>

          <el-form-item :label="$t('storageLocation')" prop="storage">
            <el-radio-group v-model="lightForm.storage">
              <el-radio label="this">{{ $t('thisServiceTree') }}</el-radio>
              <el-radio label="global">{{ $t('globalVisible') }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </Dialog>
</template>

<script lang=ts>
import { defineComponent, reactive, toRefs, getCurrentInstance, onMounted, ComponentInternalInstance } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import {
  LIGHT_APPLICATION_MODAL_CONFIG,
} from '../config'
import {
  addVariableApp,
  addLightApp,
  updateLightApp,
  getSmallApplicationItems,
} from '@/api/smallapplication/index'

import {
  getAllGroupList,
  getTreeJobs,
  getGroupBatchesList,
} from '@/api/implement/index'

import {
  TreeIdInfo,
} from '@/api/interface/implement'
import {
  VariableOperateInfo,
  LightAppInfo,
} from '@/api/interface/smallapplication'
import type { FormRules } from 'element-plus'

export default defineComponent({
  props: {
    info: {
      type: Object,
      default: () => null,
      required: false,
    },
    treeId: {
      type: [Number, String],
      default: ''
    },
  },
  emits: ['close', 'handleConfirm'],
  components: { Dialog },
  setup(props, context) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const state = reactive({
      loading: false,
      config: LIGHT_APPLICATION_MODAL_CONFIG,
      ciInfo: {},
      allTaskOptions: [],
      allGroups: [],
      jobsLoadover: false,
      lightForm: {
        import: false,
        choiceJob: '',
        title: '',
        type: '',
        describe: '',
        storage: 'this',
      }
    })

    const rules = reactive<FormRules>({
      choiceJob: [
        { required: true, trigger: 'blur', message: proxy.$t('requiredText') },
      ],
      title: [
        { required: true, trigger: 'blur', message: proxy.$t('requiredText') },
      ],
      type: [
        { required: true, trigger: 'blur', message: proxy.$t('requiredText') },
      ],
      describe: [
        { required: true, trigger: 'blur', message: proxy.$t('requiredText') },
      ]
    })

    //获取所有作业列表
    const getAllGroupsData = async (treeId: string | number | string[]) => {
      const params: TreeIdInfo = { treeId }
      const dataRet = await getAllGroupList(params)
      if (dataRet) {
        dataRet.forEach(item => {
          state.ciInfo[`_ci_${item.id}_`] = item.name
          state.ciInfo[`_ci_test_${item.id}_`] = `${item.name}:${proxy.$t('test')}`
          state.ciInfo[`_ci_online_${item.id}_`] = `${item.name}:${proxy.$t('online')}`
        })
        const jobDataRet = await getTreeJobs(params)
        if (jobDataRet) {
          state.jobsLoadover = true
          state.allTaskOptions = jobDataRet
        }
        state.allTaskOptions.forEach(item => {
          if (state.ciInfo[item.name]) {
            item.alias = `(${proxy.$t('assembly_line')}:${state.ciInfo[item.name]})`
          } else {
            item.alias = item.name
          }
        })
      }
    }
    const addLightAppConfirm = async () => {
      if (state.lightForm.import) {
        state.allGroups.forEach(async (item, index) => {
          const params: VariableOperateInfo = {
            jobuuid: item.uuid,
            data: [{
              name: '_authorization_',
              value: 'true',
              describe: 'smallapplication',
            }]
          }
          await addVariableApp(props.treeId as string, params)
          const appPrarams: LightAppInfo = {
            describe: state.lightForm.describe,
            jobid: item.id,
            parameter: '',
            title: item.alias,
            type: state.lightForm.type,
            treeid: state.lightForm.storage === 'global' ? 0 : props.treeId
          }
          const dataRet = await addLightApp(appPrarams)
          if (dataRet) {
            proxy.$notification('operationSuccess')
          }
        })
      } else {
        const params = {
          jobid: JSON.parse(state.lightForm.choiceJob).id,
          describe: state.lightForm.describe,
          parameter: '',
          title: state.lightForm.title,
          type: state.lightForm.type,
          treeid: props.treeId,
        }
        const dataRet = await addLightApp(params)
        if (dataRet) {
          proxy.$notification('operationSuccess')
        }
      }
    }

    const updateLightAppConfirm = async () => {
      const params = {
        ...props.info,
        describe: state.lightForm.describe,
        parameter: '',
        title: state.lightForm.title,
        type: state.lightForm.type,
        treeid: props.treeId,
      }
      const dataRet = await updateLightApp(props.info.id, params)
      if (dataRet) {
        proxy.$notification('operationSuccess')
      }
    }

    const confirm = () => {
      (proxy.$refs.form as any).validate().then(async valid => {
        if (valid) {
          if (!props.info) {
            await addLightAppConfirm()
            context.emit('handleConfirm')
            cancel()
          } else {
            await updateLightAppConfirm()
            context.emit('handleConfirm')
            cancel()
          }
        }
      })
    }
    const cancel = () => {
      context.emit('close')
    }

    const defaultOperate = async () => {
      const dataRet = await getSmallApplicationItems({ treeId: props.info.id })
      if (dataRet) {
        state.lightForm = {
          import: false,
          choiceJob: dataRet.jobname,
          title: dataRet.title,
          type: dataRet.type,
          describe: dataRet.describe,
          storage: dataRet.treeid === '0' ? 'global' : 'this',
        }
      }
    }

    onMounted(() => {
      if (props.info) {
        defaultOperate()
      }
      getAllGroupsData(props.treeId)
    })

    return {
      rules,
      ...toRefs(state),
      confirm,
      cancel,
    }
  }
})
</script>

<style lang="scss" scoped></style>