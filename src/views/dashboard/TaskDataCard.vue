<template>
  <div class="box-card">
    <div class="box-card-title">
      <span>{{ dataItem.name }}</span>
    </div>
    <el-divider class="costv-divider m0" />
    <div class="box-card-content">
      <div class="box-card-content-value">{{ dataItem.total || 0 }}</div>
      <div v-show="dataItem.isStatus" class="box-card-content-status">
        <div v-if="dataItem.isStatus" >
          <div class="status-success" v-if="dataItem.success !== undefined">{{ $t('Success') }}：{{ dataItem.success || 0 }}</div>
          <div class="status-fail" v-if="dataItem.fail !== undefined">{{ $t('Fail') }}：{{ dataItem.fail || 0 }}</div>
          <div class="status-running" v-if="dataItem.running !== undefined">{{ $t('Running') }}：{{ dataItem.running || 0 }}</div>
          <div class="status-success" v-if="dataItem.available !== undefined">{{ $t('StartUp') }}：{{  dataItem.available || 0 }}</div>
          <div class="status-fail" v-if="dataItem.unavailable !== undefined">{{ $t('Pause') }}：{{ dataItem.unavailable ||  0}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, getCurrentInstance } from 'vue'

export default {
  components: {},
  props: {
    dataItem: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    const { proxy } = getCurrentInstance()
    const state = reactive({

    })
    return {

    }
  }
}

</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  min-width: 200px;
  min-height: 250px;
  border-radius: 8px;
  height: 165px;
  background-color: var(--color_bg);

  &-title {
    padding: 16px;
    font-size: 16px;
    line-height: 22px;
    color: var(--color_text_menu_2);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-content {
    height: 200px;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;

    &-value {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 35px;
      height: 180px;
      color: var(--color_primary);
      flex: 1
    }

    &-status {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      margin-bottom: 20px;
      flex: 1;
    }
  }
}

.status-success {
  margin: 5px 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--el-color-success)
}

.status-fail {
  margin: 5px 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--el-color-danger)
}

.status-running {
  margin: 5px 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--el-color-warning);
}
</style>