<template>
  <!-- <div :class="{ form_item: item.type!='textarea' }"> -->
    <el-input
      v-if="item.type ==='text' && !item.trim"
      :maxlength="item.maxlength"
      :autofocus="item.enterEnAble"
      v-model="currentValue"
      :disabled="item.disabled"
      :class="item.class || 'w240'"
      @keyup.enter="handlerEnter"
      @change="item.text&&inputChange(currentValue)"
      :placeholder="item.placeholder && $t(item.placeholder) || `${$t('configFormInput')}${item.label&&$t(item.label) || ''}`"
      clearable
    ></el-input>
    <el-input
      v-else-if="item.type ==='text' && item.trim"
      :maxlength="item.maxlength"
      :autofocus="item.enterEnAble"
      v-model.trim="currentValue"
      :disabled="item.disabled"
      :class="item.class || 'w240'"
      @keyup.enter="handlerEnter"
      @change="item.text&&inputChange(currentValue)"
      :placeholder="item.placeholder && $t(item.placeholder) || `${$t('configFormInput')}${item.label&&$t(item.label) || ''}`"
      clearable
    ></el-input>
    <el-input
      v-else-if="item.type ==='num'"
      :maxlength="item.maxlength"
      @keyup.enter="handlerEnter"
      v-model.number="currentValue"
      :disabled="item.disabled"
      :placeholder="item.placeholder && $t(item.placeholder) || ''"
      type="number"
      clearable
    >
      <!-- <template v-if="item.append" slot="append">{{ item.append }}</template> -->
    </el-input>
    <el-input-number
      v-else-if="item.type === 'counter'"
      v-model="currentValue"
      :min="item.min || 1"
      :max="item.max || 100"
      :disabled="item.disabled"
      @change="item.change&&numChange($event)"
      @keyup.enter="handlerEnter"
    ></el-input-number>
    <el-select
      v-else-if="item.type === 'select'"
      :size="item.size"
      :multiple="item.multiple"
      :disabled="item.disabled"
      :clearable="item.clearable"
      :collapse-tags="item.collapseTags"
      :value-key="item.key ? item.key : 'id'"
      :class="item.class"
      @change="item.select&&SelectChange($event)"
      @visible-change="item.visibleChange&&VisibleChange($event)"
      v-model="currentValue"
      :placeholder="item.placeholder && $t(item.placeholder) || `${$t('configFormSelect')}${item.label&&$t(item.label) || ''}`"
      :filterable="item.filterable"
    >
      <el-option
        v-for="(option, index) in item.data"
        :key="index"
        :label="item.name ? option[item.name] : option.label"
        :value="item.valueType == 'object' ? option : (item.value ? option[item.value] : option.id)"
      ></el-option>
    </el-select>
    <el-tree-select v-else-if="item.type === 'tree-select'" 
      v-model="currentValue"
      :data="item.data"
      :props="item.props"
      :size="item.size"
      :disabled="item.disabled"
      :clearable="item.clearable"
      :collapse-tags="item.collapseTags"
      :value-key="item.key ? item.key : 'id'"
      :class="item.class"
      :check-strictly="true"
      @change="item.select&&SelectChange($event)"
      @visible-change="item.visibleChange&&VisibleChange($event)"
      :placeholder="item.placeholder && $t(item.placeholder) || `${$t('configFormSelect')}${item.label&&$t(item.label) || ''}`"
      :filterable="item.filterable"/>
    <el-radio-group
      v-if="item.type === 'radio'"
      :disabled="item.disabled"
      v-model="currentValue"
    >
      <el-radio v-for="option in item.data" :label="option.id" :key="option.id">{{option.name}}</el-radio>
    </el-radio-group>
    <el-radio-group
      v-if="item.type === 'radioButton'"
      v-model="currentValue"
    >
      <el-radio-button v-for="option in item.data" :label="option.id" :key="option.id">{{option.name}}</el-radio-button>
    </el-radio-group>
    <el-checkbox-group
      v-else-if="item.type === 'checkbox'"
      v-model="currentValue"
      :disabled="item.disabled"
    >
      <el-checkbox
        v-for="(option, index) in item.data"
        :label="item.value ? option[item.value] : option.id"
        :key="index"
        :disabled="item.disabled"
      >{{item.name ? option[item.name] : option.label}}</el-checkbox>
    </el-checkbox-group>
    <el-checkbox
      v-else-if="item.type === 'checkboxSingle'"
      v-model="currentValue"
      :disabled="item.disabled"
      >{{ $t(item.text || 'resource.noNull') }}</el-checkbox>
    <el-time-select
      v-else-if="item.type === 'timeSelect'"
      v-model="currentValue"
      :disabled="item.disabled"
      :picker-options="item.pickerOptions"
    ></el-time-select>
    <el-time-picker
      v-else-if="item.type === 'timePicker'"
      v-model="currentValue"
      :disabled="item.disabled"
      :picker-options="item.pickerOptions"
    ></el-time-picker>
    <el-switch
      v-else-if="item.type === 'switch'"
      :disabled="item.disabled"
      :active-value="item.on || true"
      :inactive-value="item.off || false"
      v-model="currentValue"
    ></el-switch>
    <el-input
      v-else-if="item.type === 'textarea'"
      type="textarea"
      :class="item.class || 'w240'"
      :autosize="{ minRows: 4, maxRows: 8 }"
      v-model="currentValue"
      :placeholder="item.placeholder && $t(item.placeholder) || `${$t('configFormInput')}${item.label&&$t(item.label) || ''}`"
    ></el-input>
    <el-date-picker
      v-else-if="item.type == 'month' || item.type == 'datetime'|| item.type == 'date'"
      :placeholder="item.placeholder && $t(item.placeholder) || `${$t('configFormSelect')}${item.label&&$t(item.label) || ''}`"
      :type="item.type"
      :disabled="!!item.disabled"
      v-model="currentValue"
      :value-format="dateFormat"
      :class="item.class"
      :disabled-date="item.disabledDate ? item.disabledDate : () => { return false }"
      @change="item.select&&SelectChange($event)"
      :clearable="(item.clearable + '') ? item.clearable : true"
    ></el-date-picker>
    <el-date-picker v-else-if="item.type == 'datetimerange' || item.type == 'daterange' || item.type == 'monthrange'" v-model="currentValue" :type="item.type" :start-placeholder="item.startplaceholder && $t(item.startplaceholder) || $t('base.role.sdate')" :end-placeholder="item.endplaceholder && $t(item.endplaceholder) || $t('base.role.edate')" :value-format="item.valueFormat ? item.valueFormat : ''" :class="item.class" :unlink-panels="item.type == 'monthrange'"/>
    <el-upload
      v-else-if="item.type === 'upload'"
      :action="item.action || 'sys/file/upload'"
      :limit="item.limit"
      :on-success="uploadSuccess"
      :on-remove="uploadRemove"
      :file-list="currentValue"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <!-- <div slot="tip" class="el-upload__tip">不限制文档类型，大小限制为30M</div> -->
    </el-upload>
    <img class="image" v-else-if="item.type === 'image'">
  <!-- </div> -->
</template>

<script setup lang="ts">
import { reactive, toRefs, computed, watch } from 'vue'
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  modelValue: [String, Number, Array, Object, Boolean]
})

const emits = defineEmits(['update:modelValue', 'enter', 'input-change', 'num-change', 'select-change', 'visible-change'])
const state = reactive({
  currentValue: null
})

const { currentValue } = toRefs(state)

const dateFormat = computed(() => {
  let format = ''
  if (props.item.type === 'date') {
    format = 'yyyy-MM-dd'
  }
  if (props.item.type === 'datetime') {
    format = 'yyyy-MM-dd HH:mm:ss'
  }
  if (props.item.type === 'month') {
    format = 'yyyy-MM'
  }
  return props.item.valueFormat || format
})
// 监控
watch(() => props.modelValue, val => {
  // 表单重置触发
  state.currentValue = val
  // console.log('---value----', state.currentValue)
}, {
  immediate: true
})
watch(() => state.currentValue, val => {
  // 子级值的改变传递回父级
  const value = val
  emits('update:modelValue', value)
})

watch(() => props.item, item => {
  // console.log('-------')
  if (item.function) {
    const request = item.function
    const params = item.params || {}
    request(params).then(data => {
      // console.log(data)
      item.data = data
    })
  }
}, {
  deep: true,
  immediate: true
})

// 函数
function inputChange (val) {
  emits('input-change', val)
}
function numChange (val) {
  emits('num-change', val)
}

function SelectChange (val) {
  emits('select-change', val)
}

function VisibleChange (val) {
  emits('visible-change', val)
}

function uploadSuccess (res) {
  if (res.code === 0) {
    res.name = res.filename
    state.currentValue.push(res)
  }
}

function uploadRemove (file) {
  const index = state.currentValue.indexOf(file)
  state.currentValue.splice(index, 1)
}

function handlerEnter () {
  emits('enter')
}
</script>

<style lang="scss" scoped>
.form_item {
  :deep(.el-range-editor.el-input__inner) {
    padding: 0 10px;
  }
}

</style>
