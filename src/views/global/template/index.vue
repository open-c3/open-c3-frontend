
<template>
  <div v-loading="loading" class="body-layout1">
    <saas-tabs v-model="activeName" :tabs="tabs" @change="changeTab" class="cost-tab"/>
    <!-- 邮件模版 -->
    <el-card>
      <template #header>
        <div class="df jc_sb ai_c">
          <span>{{ $t('emailTemplate') }}</span>
          <span>
            <el-tooltip effect="light" :content="$t('copyTemplate')" placement="top">
              <el-button @click="copyFun('email')" icon="CopyDocument" type="primary"/>
            </el-tooltip>
            <el-tooltip effect="light" :content="$t('save')" placement="top">
              <el-button @click="save" icon="FolderChecked" type="primary"/>
            </el-tooltip>
            <el-tooltip effect="light" :content="$t('refresh')" placement="top">
              <el-button @click="getData" icon="refresh" type="primary"/>
            </el-tooltip>
          </span>
        </div>
      </template>
      <base-form ref="emailForm" :config="config[activeName].email" :params="params"/>
    </el-card>
    <!-- 短信模版 -->
    <el-card class="mt20">
      <template #header>
        <div class="df jc_sb ai_c">
          <span>{{ $t('smsTemplate') }}</span>
          <span>
            <el-tooltip effect="light" :content="$t('copyTemplate')" placement="top">
              <el-button @click="copyFun('sms')" icon="CopyDocument" type="primary"/>
            </el-tooltip>
            <el-tooltip effect="light" :content="$t('save')" placement="top">
              <el-button @click="save" icon="FolderChecked" type="primary"/>
            </el-tooltip>
            <el-tooltip effect="light" :content="$t('refresh')" placement="top">
              <el-button @click="getData" icon="refresh" type="primary"/>
            </el-tooltip>
          </span>
        </div>
      </template>
      <base-form ref="smsForm" :config="config[activeName].sms" :params="params"/>
    </el-card>
    <!-- 语音模版 -->
    <el-card v-if="activeName === 'monSystemAlarmNotifyTemplate' || activeName === 'monSystemEmail'" class="mt20">
      <template #header>
        <div class="df jc_sb ai_c">
          <span>{{ $t('voiceTemplate') }}</span>
          <span>
            <el-tooltip effect="light" :content="$t('copyTemplate')" placement="top">
              <el-button @click="copyFun('voice')" icon="CopyDocument" type="primary"/>
            </el-tooltip>
            <el-tooltip effect="light" :content="$t('save')" placement="top">
              <el-button @click="save" icon="FolderChecked" type="primary"/>
            </el-tooltip>
            <el-tooltip effect="light" :content="$t('refresh')" placement="top">
              <el-button @click="getData" icon="refresh" type="primary"/>
            </el-tooltip>
          </span>
        </div>
      </template>
      <base-form ref="voiceForm" :config="config[activeName].voice" :params="params"/>
    </el-card>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import baseForm from '@/components/baseForm/index.vue'
import { getEnvironment, setEnvironment } from '@/api/global/notify'
import { TEMPLATE_CONFIG, COPY_CONFIG, PARAMS_CONFIG, TABS_CONFIG } from '@/views/global/template/config'
export default {
  components: { searchFrom, Table, baseForm },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      tabs: TABS_CONFIG,
      activeName: 'jobTaskNotifyTemplate',
      params: {
        notifyTemplateEmailTitle: '', // 邮件模板标题
        notifyTemplateEmailContent: '', // 邮件模板内容
        notifyTemplateSmsContent: '', // 短信模板内容
        ciTemplateEmailTitle: '', // 构建通知模版标题
        ciTemplateEmailContent: '', // 构建通知模版内容
        ciTemplateSmsContent: '', // 构建通知模版短信内容
        flowTemplateEmailTitle: '', // 发布通知模版标题
        flowTemplateEmailContent: '', // 发布通知模版内容
        flowTemplateSmsContent: '', // 发布通知模版短信内容
        approvalTemplateEmailTitle: '', // 审批通知模版
        approvalTemplateEmailContent: '', // 审批通知模版
        approvalTemplateSmsContent: '', // 审批通知模版
        monitorTemplateEmailTitle: '', // 监控系统告警通知模版
        monitorTemplateEmailContent: '', // 监控系统告警通知模版
        monitorTemplateSmsContent: '', // 监控系统告警通知模版 短信
        monitorTemplateCallContent: '', // 监控系统告警通知模版 语音
        mailmonTemplateEmailTitle: '', // 监控系统邮件内容监控通知模版
        mailmonTemplateEmailContent: '', // 监控系统邮件内容监控通知模版
        mailmonTemplateSmsContent: '', // 监控系统邮件内容监控通知模版 短信
        mailmonTemplateCallContent: '' // 监控系统邮件内容监控通知模版 语音
      },
      serviceData: JSON.parse(JSON.stringify(PARAMS_CONFIG)),
      copy: COPY_CONFIG,
      config: TEMPLATE_CONFIG,
      loading: false
    })
    // 获取所有模版配置信息
    const getData = () => {
      const allKey = Object.keys(state.params)
      getEnvironment().then((res: any) => {
        for(const key of Object.keys(res)) {
          if (allKey.find(item => item === key)) {
            state.params[key] = res[key]
          }
        }
        state.serviceData = JSON.parse(JSON.stringify(state.params))
      })
    }
    // 保存
    const save = () => {
      state.loading = true
      setEnvironment(state.params).then(res => {
        proxy.$notification('success')
        state.loading = false
      })
    }
    // 复制
    const copyFun = (type) => {
      const obj = state.copy[state.activeName][type]
      for(const key of Object.keys(obj)) {
        state.params[key] = obj[key]
      }
    }
    const changeTab = () => {
      state.params = {...state.serviceData}
    }
    onMounted(() => {
      getData()
    })
    return {
      ...toRefs(state),
      getData,
      save,
      copyFun,
      changeTab
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
