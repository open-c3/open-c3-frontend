<template>
  <el-row>
    <el-col :span="22">
      <div class="table-items-btn-content">
        <el-form style="width:100%" :model="tableData" label-width="80px" :inline="true">
          <el-row style="width:100%">
            <el-col :span="8" class="table-items-btn-content-first">
              <el-form-item label="key" class="table-items-btn-content-first-form">
                <el-select v-model="cItem.key" @change="handleChange">
                  <el-option v-for="(dItem, dIndex) in nodeLabel.key" :key="dIndex" :label="dItem" :value="dItem" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="table-items-btn-content-first">
              <el-form-item label="operator" class="table-items-btn-content-first-form">
                <el-select v-model="cItem.operator">
                  <el-option v-for="(dItem, dIndex) in AFFINITY_OPERATOR_OPTION" :key="dIndex" :label="dItem.label"
                    :value="dItem.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="table-items-btn-content-first">
              <el-form-item label="values" class="table-items-btn-content-first-form">
                <el-tag class="ml5" v-for="gItem in cItem.values" :key="gItem">{{ gItem }}</el-tag>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-col>
    <el-col :span="2" class="el-col-operate">
      <el-button link type="primary" @click="delCol">
        {{ $t('delete') }}
      </el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import {
  AFFINITY_OPERATOR_OPTION,
} from '../config'

export default defineComponent({
  props: {
    tableData: {
      type: Object,
       default: {}
    },
    cItem: {
      type: Object,
      default: {}
    },
    nodeLabel: {
      type: Object,
      default: {},
      required: false
    }
  },
  emits:['handleChange', 'delCol'],
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const handleChange = (event:string) => {
      proxy.$emit('handleChange', event, {})
    }
    const delCol = () => {
      proxy.$emit('delCol')
    }
    return {
      AFFINITY_OPERATOR_OPTION,
      handleChange,
      delCol,
    }
  }
})
</script>

<style lang="scss" scoped></style>