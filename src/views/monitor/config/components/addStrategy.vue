<template>
  <Dialog v-bind="$attrs" :config="config" :loading="loading" @close="cancel" @success="confirm">
    <template #content>
      <base-form ref="strategyForm" :config="config.form" :params="params">
        <template #condition>
          <el-input v-model="params.metrics" :placeholder="$t('metricName')" class="w80"/>
          <el-input v-model="params.method" :placeholder="$t('compare')" class="w80 ml5"/>
          <el-input v-model="params.threshold" :placeholder="$t('threshold')" class="w80 ml5"/>
          <el-select v-model="params.job" class="w130 ml5">
            <el-option v-for="item in jobAry" :key="item.name" :value="item.name" :label="item.alias"/>
          </el-select>
        </template>
      </base-form>
    </template>
    
  </Dialog>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, watch, watchEffect, getCurrentInstance } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import store from '@/store'
import { ADD_STRATEGY_CONFIG } from '../config'
import { addRule } from '@/api/monitor/config.js'
export default {
  components: { Dialog, baseForm },
  emits: ['cancel', 'addSuccess'],
  props: {
    ruleInfo: {
      type: Object,
      default: null
    }
  },
  setup (prop, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      jobAry: [
      { name: '', alias: proxy.$t('All')} , 
      { name: 'openc3', alias: proxy.$t('host')} , 
      { name: 'openc3-mysql-v3', alias: 'Mysql'}, 
      { name: 'openc3-redis-v3', alias: 'redis' }, 
      { name: 'openc3-mongodb-v3', alias: 'mongodb' },
      { name: 'openc3-nodeext', alias: proxy.$t('nodeExt') } 
      ],
      params: {
        id: '',
        treeId: store.getters.treeId,
        alert: '',
        model: 'simple',
        condition: '', // model为simple 判断指标名 指标 阀值是否都输入
        metrics: '', // 指标名
        method: '', // 比较
        threshold: '', // 阈值
        job: '',
        expr: '', // 表达式
        bindtreesql: '', // model为服务树bindtree 表达式
        severity: 'level2', // 警告级别
        for: '', // 持续时间
        summary: '', // 概要
        description: '', // 描述
        value: '', // 值
        subgroup: '' // 子组
      },
      loading: false,
      config: ADD_STRATEGY_CONFIG
    })
    onMounted(() => {
    })
    const cancel = () => { // 关闭弹框
      context.emit('cancel')
    }
    // 弹框成功的回调
    const confirm = () => {
      (proxy.$refs.strategyForm as any).validFun().then(valid => {
        if (valid) {
          state.loading = true
          if (state.params.id === '') {
            delete state.params.id
          }
          addRule(state.params).then(res => {
            context.emit('addSuccess')
            proxy.$notification('success')
          }).finally(() => {
            state.loading = false
          })
        }
      })
    }
    const checkModel = () => {
      if (state.params.model === 'simple') {
        if (state.params.metrics === '' || state.params.method === '' || state.params.threshold === '') {
          state.params.condition = ''
        } else {
          state.params.condition = state.params.metrics + state.params.method + state.params.threshold + state.params.job
        }
      }
      proxy.$nextTick(() => {
        if ((proxy.$refs.strategyForm as any).validItemFun) {
          (proxy.$refs.strategyForm as any).validItemFun('condition')
        }
      })
    }
    watch(() => state.params.model, (newVal, oldVal) => {
      const fromConfig = JSON.parse(JSON.stringify(ADD_STRATEGY_CONFIG))
      state.params.condition = ''
      state.params.metrics = ''
      state.params.method = ''
      state.params.threshold = ''
      state.params.expr = ''
      if (newVal === 'simple') {
        fromConfig.form.config.splice(3, 2)
      } else if (newVal === 'custom') {
        fromConfig.form.config.splice(2, 2)
      } else if (newVal === 'bindtree' || newVal === 'bindetree') {
        fromConfig.form.config.splice(2, 1)
        fromConfig.form.config.splice(3, 1)
      }
      state.config = fromConfig
    }, {
      immediate: true
    })
    watchEffect(() => {
      checkModel()
    })
    watch(() => prop.ruleInfo, (newVal, oldVal) => {
      if (newVal !== null) {
        state.params.id = newVal.id
        state.params.alert = newVal.alert
        state.params.model = newVal.model
        state.params.metrics = newVal.metrics
        state.params.method = newVal.method
        state.params.threshold = newVal.threshold
        state.params.job = newVal.job
        state.params.expr = newVal.expr
        state.params.severity = newVal.severity
        state.params.for = newVal.for
        state.params.summary = newVal.summary
        state.params.description = newVal.description
        state.params.value = newVal.value
        state.config.title = 'editMonStrategy'
        checkModel()
      } else {
        state.config.title = 'addMonStrategy'
      }
    }, {
      immediate: true,
      deep: true
    })
    return {
      ...toRefs(state),
      cancel,
      confirm
    }
  }
}
</script>
<style lang="scss">
</style>
