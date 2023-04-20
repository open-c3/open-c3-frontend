<template>
  <Dialog v-bind="$attrs" :config="config" :params="params" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <base-form ref="form" :config="config.form" :params="params">
        <template #altername>
          <el-select v-model="params.altername" class="w450">
            <el-option v-for="item in list" :label="item.alert" :value="item.id" :key="item.id"/>
            <p @click="pageChange(page+1)" class="tc">加载更多</p>
          </el-select>
        </template>
        <template #btn>
          <el-button icon="plus" class="ml-120">{{$t('selfHealingJob')}}</el-button>
        </template>
      </base-form>
    </template>
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, watch, getCurrentInstance } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { ADD_CONFIG } from './config'
// import { getDutySchedule } from '@/api/monitor/onCall.js'
import { getJobList, addSelfHealing } from '@/api/monitor/selfHealing'
import { getRule } from '@/api/monitor/config.js'
export default {
  components: { Dialog, baseForm },
  emits: ['cancel', 'addSuccess'],
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      loading: false,
      alarmNameList: [],
      list: [],
      page: 1,
      pageSize: 10,
      params: {
        id: '',
        name: '',
        altername: '',
        jobname: '',
        eips: '',
      },
      config: ADD_CONFIG
    })
    // 弹框成功的回调
    const confirm = () => {
      (proxy.$refs.form as any).validFun().then(valid => {
        if (valid) {
          state.loading = true
          if (state.params.id === '') {
            delete state.params.id
          }
          addSelfHealing(state.params).then(res => {
            if (res) {
              context.emit('addSuccess')
              proxy.$notification('success')
            }
          }).finally(() => {
            state.loading = false
          })
        }
      })
    }
    const pageChange = (page) => {
      state.page = page
      if (page === 1) {
        state.list = []
      }
      const addList = state.alarmNameList.slice((state.page - 1) * state.pageSize, state.page * state.pageSize)
      state.list.push(...addList)
    }
    watch(() => prop.info, (newVal, oldVal) => {
      if (newVal !== null) {
        state.params.id = newVal.id
        state.params.name = newVal.name
        state.params.altername = newVal.altername
        state.params.jobname = newVal.jobname
        state.params.eips = newVal.eips
      }
      getJobList().then(res => {
        state.config.form.config[2].data = res
      })
      getRule(0).then((res: any) => {
        state.alarmNameList = res
        pageChange(1)
      })
    }, {
      immediate: true,
      deep: true
    })
    const cancel = () => { // 关闭弹框
      context.emit('cancel')
    }
    return {
      ...toRefs(state),
      cancel,
      confirm,
      pageChange
    }
  }
}
</script>
<style lang="scss">
</style>
