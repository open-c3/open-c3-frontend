
<template>
  <div class="body-layout1 kanban">
    <saas-tabs :label="$t('monDashBoard')" class="mt-20"/>
    <div class="df jc_sb">
      <span>{{ treeData?.parent }}</span>
      <thirdApp/>
    </div>
    <p>
      {{ $t('selectDashBoard')}}
      <el-select v-model="kanban" @change="changeKanBan">
        <el-option :label="$t('hostMon')" value="_host_"/>
        <el-option v-for="item in list" :label="item.name" :value="item.url" :key="item.id"/>
      </el-select>
      <el-button @click="flag = true" type="primary" icon="plus" class="ml10">{{ $t('dashBoardManage')}}</el-button>
    </p>
    <p>
      <a class="glyphicon glyphicon-share" data-toggle="tooltip" data-placement="right" target='_blank' :href="monitorkanban.url" :uib-tooltip="$t('openGrafana')" aria-hidden="true" style="padding-top: 11px;font-size: larger;">{{ $t('openGrafana') }}</a>
    </p>
    <div class="kanban-iframe-content">
      <iframe id="frame_id" :src="monitorkanban.url" frameborder="0" name="grafana" scrolling="auto" width="100%" height="100%" class="kanban-iframe"></iframe>
    </div>
    <add-kanban v-model="flag" v-if="flag" @addSuccess="getList"/>
  </div>
</template>
<script lang="ts">
import { onMounted, reactive, toRefs, computed, watch } from 'vue'
import thirdApp from '@/views/monitor/components/thirdApp.vue'
import store from '@/store'
import addKanban from '@/views/monitor/kanban/add.vue'
import { getConfigKanBanList } from '@/api/monitor/index'
import { g_url } from '@/utils/index'
export default {
  components: { thirdApp, addKanban },
  setup () {
    // const url = window.location.origin
    const url = g_url
    const state = reactive({
      flag: false,
      kanban: '_host_',
      list: [],
      monitorkanban: {
        url: '',
        trustSrc: ''
      },
      dashboarnuuid1: 'dUrNraOn1',
      dashboarnuuid2: 'dUrNraOnz'
    })
    const treeId = computed(() => {
      return store.getters.treeId
    })
    const treeData = computed(() => {
      return store.getters.treeData
    })
    const getList = () => {
      console.log(treeId.value)
      getConfigKanBanList(treeId.value).then(res => {
        state.list = res
      })
      state.flag = false
    }
    const setUrl = (uuid, name) => {
      if (name === '_host_') {
        state.monitorkanban.url = url + '/third-party/monitor/grafana/d/' + uuid + '/openc3-dashboard?orgId=1&var-origin_prometheus=&var-job=openc3&var-hostname=All&var-device=All&var-interval=2m&var-maxmount=&var-show_hostname=&var-total=1&var-treeid=treeid_' + treeId.value + '&kiosk'
      } else {
        state.monitorkanban.url = url + '/third-party/monitor/grafana/d/7h8Ok7wGz/k8sji-qun-jian-kong-kan-ban-hui-zong?orgId=1&var-datasource=thanos&var-cluster=' + name + '&var-namespace=All&var-pod=alertmanager-server-679c879455-x7vww&var-interval=$__auto_interval_interval&var-container=alertmanager&var-node=All&var-k8s_version=v1.19.6-eks-49a6c0&kiosk'
      }
    }
    const changeKanBan = () => {
      if (state.kanban === '_host_') {
        setUrl(state.dashboarnuuid1, '_host_')
      } else {
        state.monitorkanban.url = url + state.kanban
      }
      (<HTMLIFrameElement>document.getElementById('frame_id')).contentWindow.location.reload()
    }
    watch(() => treeId.value, val => {
      getList()
    }, {
      immediate: true,
      deep: true
    })
    onMounted(() => {
      changeKanBan()
    })
    return {
      ...toRefs(state),
      changeKanBan,
      getList,
      treeId,
      treeData
    }
  }
}
</script>
<style lang="scss" scoped>
.kanban{
  width: 100%;
  height: calc(100vh - 240px);
  // padding-bottom: 24px;
  .kanban-iframe-content{
    height: calc(100% - 150px);
    // height: 100%;
    width: 100%;
  }
}
</style>
