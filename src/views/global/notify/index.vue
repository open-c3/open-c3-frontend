
<template>
  <div class="body-layout1">
    <saas-tabs :label="$t('notifySwitchSetting')" class="mt-20"/>
    <p class="tr">
      <el-button @click="getList" icon="refresh" type="primary"/>
      <el-button @click="save" type="primary">{{ $t('save') }}</el-button>
    </p>
    <Table :thead="tableConfig.thead" :data="tableConfig.list" :tableLoading="tableConfig.loading" :span-method="spanMethod" row-id="id" class="mt20">
      <!-- 邮件选择框 -->
      <template #email>
        <el-table-column>
          <template #header>
            <el-checkbox :indeterminate="emailIndeterminate" v-model="email" @change="val => checkAll(val, 'email')">{{ $t('email') }}</el-checkbox>
          </template>
          <template #default="scope">
            <el-checkbox v-model="scope.row.email" @change="val => checkOne(val, 'email')">{{ $t('email') }}</el-checkbox>
          </template>
        </el-table-column>
      </template>
      <!-- 短信选择框 -->
      <template #sms>
        <el-table-column>
          <template #header>
            <el-checkbox :indeterminate="smsIndeterminate" v-model="sms" @change="val => checkAll(val, 'sms')">{{ $t('sms') }}</el-checkbox>
          </template>
          <template #default="scope">
            <el-checkbox v-model="scope.row.sms" @change="val => checkOne(val, 'sms')">{{ $t('sms') }}</el-checkbox>
          </template>
        </el-table-column>
      </template>
      <!-- 语音选择框 -->
      <template #voice>
        <el-table-column>
          <template #header>
            <el-checkbox :indeterminate="voiceIndeterminate" v-model="voice" @change="val => checkAll(val, 'voice')">{{ $t('voice') }}</el-checkbox>
          </template>
          <template #default="scope">
            <el-checkbox v-if="scope.row.voiceId !== ''" v-model="scope.row.voice" @change="val => checkOne(val, 'voice')">{{ $t('voice') }}</el-checkbox>
          </template>
        </el-table-column>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import searchFrom from '@/components/search/index.vue'
import Table from '@/components/table/index.vue'
import { THEAD_CONFIG, LIST_CONFIG } from '@/views/global/notify/config'
import { getEnvironment, setEnvironment } from '@/api/global/notify'
export default {
  components: { searchFrom, Table },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      tableConfig: {
        loading: false,
        thead: THEAD_CONFIG,
        total: 0,
        list: LIST_CONFIG
      },
      email: false,
      emailIndeterminate: false,
      sms: false,
      smsIndeterminate: false,
      voice: false,
      voiceIndeterminate: false,
      loading: false
    })
    // 合并单元格
    const spanMethod = (data) => {
      const {row, column, rowIndex, columnIndex} = data
      if (columnIndex === 0) {
        if (row.spanAry && row.spanAry.length)  return row.spanAry
        else return [0, 0]
      } else  {
        return [1, 1]
      }
    }
    const getList = () => {
      getEnvironment().then((res: any) => {
        for(const key of Object.keys(res)) {
          const email = state.tableConfig.list.find(item => item.emailId === key)
          if (email) {
            email.email = res[key]  === 'true' ? true : false
            checkOne(res[key], 'email')
          }
          const sms = state.tableConfig.list.find(item => item.smsId === key)
          if (sms) {
            sms.sms = res[key]  === 'true' ? true : false
            checkOne(res[key], 'sms')
          }
          const voice = state.tableConfig.list.find(item => item.voiceId === key)
          if (voice) {
            voice.voice = res[key]  === 'true' ? true : false
            checkOne(res[key], 'voice')
          }
        }
      })
    }
    // 全选
    const checkAll = (val, type) => {
      state.tableConfig.list.forEach(item => {
        if (item[`${type}Id`] !== '') {
          item[type] = val
        }
      })
      state[`${type}Indeterminate`] = false
    }
    // 选择单个
    const checkOne = (val, type) => {
      const ary = state.tableConfig.list.filter(item => item[`${type}Id`] !== '' && item[type] === true)
      const all = state.tableConfig.list.filter(item => item[`${type}Id`] !== '')
      state[type] = ary.length === all.length ? true : false
      state[`${type}Indeterminate`] = ary.length && ary.length < all.length ? true : false
    }
    // 保存
    const save = () => {
      let data: any = {}
      state.tableConfig.list.forEach(item => {
        if (item.voiceId !== '') {
          data[item.voiceId] = item.voice + ''
        }
        if (item.smsId !== '') {
          data[item.smsId] = item.sms + ''
        }
        if (item.emailId !== '') {
          data[item.emailId] = item.email + ''
        }
      })
      setEnvironment(data).then(res => {
        proxy.$notification('success')
      })
    }
    onMounted(() => {
      getList()
    })
    return {
      ...toRefs(state),
      getList,
      spanMethod,
      checkAll,
      checkOne,
      save
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
