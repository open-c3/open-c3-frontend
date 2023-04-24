<template>
  <div class="btn-base tr flex1">
    <el-button @click="openThirdApp('Grafana')" type="primary" class="mr5">Grafana</el-button>
    <el-button @click="openThirdApp('Prometheus')" type="primary" class="mr5">Prometheus</el-button>
    <el-button @click="openThirdApp('Alertmanager')" type="primary" class="mr5">Alertmanager</el-button>
  </div>
</template>
<script lang="ts">
import { computed } from 'vue'
import { g_url } from '@/utils/index'
import store from '@/store'
export default {
  props: {
    treeId: {
      type: [Number, String],
      default: 4000000000
    }
  },
  setup (props, context) {
    const treeId = computed(() => {
      return store.getters.treeId
    })
    // const url = window.location.origin
    const url = g_url
    // 打开第三方的模块
    const openThirdApp = (type) => {
      if (type === 'Grafana') {
        window.open(`${url}/third-party/monitor/grafana/`)
      } else if (type === 'Prometheus') {
        window.open(`${url}/third-party/monitor/prometheus/alerts`)
      } else if (type === 'Alertmanager') {
        window.open(`${url}/third-party/monitor/alertmanager/#/alerts?silenced=false&inhibited=false&active=true&filter=%7Bfromtreeid%3D"${treeId.value}"%7D`)
      }
    }
    return {
      openThirdApp
    }
  }
}
</script>
<style lang="scss" scoped>
.monitor-config{
  width: 100%;
  .monitor-config-content{
    width: calc(100% - 140px);
  }
}

</style>
