<template>
  <div>
    <Table :thead="thead" :data="list"  ref="listTable" row-key="id"/>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import Table from '@/components/table/index.vue'
export default {
  components: { Table },
  setup () {
    const state = reactive({
      thead: [
        { type: 'slotTable', prop: 'multiple', align: 'center' },
        { prop: 'name', label: 'customerFullName', align: 'center', type: 'slot' },
        { prop: 'shortName', label: 'shortName', align: 'center' },
        { prop: 'contractRangeBegin', label: 'contractEffectiveDate', align: 'center', type: 'slot' },
        { prop: 'contractRangeEnd', label: 'contractEndDate', align: 'center', type: 'slot', sort: true },
        { prop: 'paymentPeriod', label: 'paymentPeriodDay', align: 'center', width: 140 },
        { prop: 'emailConfig', label: 'emailConfig', align: 'center', type: 'slot', width: 130 },
        { type: 'slot', prop: 'op', label: 'table.operate', width: 140, align: 'center' }],
      list: [{ id: 1}]
    })
    onMounted(() => {
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
// .box{
//   width: 100%;
//   height: 100%;
//   display: flex;
//   .left{
//     width: 60%;
//     background: #40e0cf;
//   }
//   .right{
//     width: 40%;
//     background: #7fbcff;
//   }
//   /*拖拽区div样式*/
//   .resize {
//     cursor: col-resize;
//     float: left;
//     position: relative;
//     top: 45%;
//     background: blue;
//     border-radius: 5px;
//     margin-top: -10px;
//     width: 10px;
//     height: 50px;
//     background-size: cover;
//     background-position: center;
//     font-size: 32px;
//     color: white;
//   }
//   /*拖拽区鼠标悬停样式*/
//   .resize:hover {
//       color: #444444;
//   }
// }
</style>
