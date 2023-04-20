<template>
  <el-form ref="configForm" :model="info" :label-width="config.labelWidth" :inline="config.isNoInline ? false : true" label-position="left" class="baseForm saas-search-form">
    <template v-for="(item,index) in config.formConfig" :key="index">
      <el-form-item :prop="item.prop" :rules="item.rules" :label="item.label ? $t(item.label) : ''" :ref="item.prop">
        <!-- <template v-if="item.type == 'temp'">
          <slot :name="item.prop" :info="item" :form="params"></slot>
        </template> -->
        <template v-if="item.type == 'desc'">
          {{ info[item.prop] || '-' }}
        </template>
        <template v-else-if="item.type == 'slot'">
          <slot :name="item.prop" :item="item" />
        </template>
        <form-item
          v-else
          :item="item"
          v-model="info[item.prop]"
          @select-change="SelectChange($event, item)"
          @visible-change="VisibleChange($event, item)"
          @enter="handleEmit('enter')"
        />
      </el-form-item>
    </template>
    <slot name="default"></slot>
    <el-form-item
      v-if="config.formBtnConfig"
      class="btn-base"
    >
      <el-button
        v-for="(item,index) in config.formBtnConfig"
        :key="index"
        :type="item.type"
        @click.prevent="handleEmit(item.emitName)"
        @keyup.enter="item.emitName == 'query'&& handleEmit(item.emitName)"
      >{{ $t(item.name) }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
/*
使用举例
{ // 下拉选择
  label: 'base.role.roleName',
  prop: 'name',
  type: 'select',,
  disabled: true
  multiple: true, // 是否多选
  valueType: 'object', // 绑定的对象值 为对象值，唯一键根据key决定 默认为 id
  key: 'id',
  value: 'id', // value 对应的参数值 默认为 id
  name: 'name', // name 对应显示的label 默认为label
  data: [{
    id: '1', label: '是', name: 'test1'
  }, {
    id: '2', label: '否', name: 'test2'
  }]
},
{// 单选
  label: 'base.role.roleName',
  prop: 'name',
  type: 'radio',
  data: [{
    id: '1', name: '是'
  }, {
    id: '2', name: '否'
  }]
}
{ // 多选
  label: 'base.role.roleName',
  prop: 'arr',
  type: 'checkbox',
  value: 'name', // value 对应的参数值 默认为 id
  // name: 'name', // name 对应显示的label 默认为label
  data: [{
    id: 'test1', label: '是', name: 'test1'
  }, {
    id: '2', label: '否', name: 'test2'
  }]
}
// 时间选择器
{ // 具体可看 element
  label: 'base.role.roleName',
  prop: 'arr',
  type: 'timeSelect'
}
// 开关
{
  label: 'base.role.roleName',
  prop: 'name',
  type: 'switch',
  on: '1', // 开启对应的值 默认是1
  off: '0' // 关闭对应的值 默认是0
}

// 输入框
{
  label: 'base.role.roleName',
  prop: 'name',
  type: 'textarea'
}
// 时间选择
{
  label: 'base.role.roleName',
  prop: 'time',
  type: 'datetime' // mouth datetime date  datetimerange(时间段)
}
// 云厂商
{
      prop: 'cloud',
      type: 'cloud',
      multiple: true, // 多选
      clouds: ['aws', 'qcloud', 'huawei', 'aliyun'], // 设置云厂商 有默认
      i18n: 'cloudR', // 因为资源aws不区分  加i18n区分
      placeholder: 'cost.base.discount.serviceSearch'
    },
    云账号 依赖于云厂商
    {
      prop: 'account',
      type: 'account',
      cloud: 'cloud', // 筛选项中云厂商的key
      multiple: true, // 多选,
      awsAllFlag: false, // 判断aws 和aws-cn  是否合并查询 true 则查询的是合并后的结果
      placeholder: 'cost.base.discount.serviceSearch'
    }
*/

import formItem from './form-item.vue'

import { reactive, toRefs, watch, getCurrentInstance } from 'vue'

export default {
  components: { formItem },
  props: {
    params: {
      type: Object,
      default: () => {}
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup (props, context) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      info: {}
    })
    watch(() => props.params, () => {
      state.info = props.params
    }, {
      immediate: true
    })
    const SelectChange = (val, item) => {
      context.emit('select', val, item)
    }

    const VisibleChange = (val, item) => {
      context.emit('visibleChange', val, item)
    }

    const handleEmit = (fun) => {
      context.emit(fun)
    }

    const validFun = () => {
      const promise = new Promise(resolve => {
        (proxy.$refs.configForm as any).validate(valid => {
          resolve(valid)
        })
      })
      return promise
    }
    const validItemFun = (item) => {
      (proxy.$refs.configForm as any).validateField(item, valid => {
      })
    }

    return {
      ...toRefs(state),
      SelectChange,
      handleEmit,
      validFun,
      VisibleChange,
      validItemFun
    }
  }
}

</script>

<style lang="scss" scoped>
.baseForm {
  :deep(.el-range-editor--small.el-input__inner) {
    width: 230px;
  }
}
</style>
