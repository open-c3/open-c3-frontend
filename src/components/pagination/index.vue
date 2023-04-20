<template>
  <div :class="pagerCount < 11 ? 'pagination-content df jc_fe' : 'pagination-content df jc_sb ai_c'">
    <span v-if="!(pagerCount < 11)" class="all-total">
      {{ $t('allTotal', {total: total }) }}  {{ $t('currentAndAllPage', {curPage: curPage, allPage: allPage}) }} 
    </span>
    <div class="df jc_fe ai_c">
      <span class="all-page mr8">{{ $t('allPage', {allPage: allPage}) }}</span>
      <el-pagination
        v-model:currentPage="curPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :layout="layout"
        :total="total"
        :pager-count="pagerCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { scrollTo } from '@/utils/scrollTo'
import { computed, getCurrentInstance } from 'vue'
export default {
  name: 'Pagination',
  emits: ['pageChange', 'pageSizeChange'],
  props: {
    page: {
      type: Number,
      required: true,
      default: 1
    },
    pageSize: {
      type: [Number, String],
      default: 10
    },
    total: {
      type: Number,
      required: true,
      default: 0
    },
    layout: {
      type: String,
      default: 'sizes, prev, pager, next, jumper'
    },
    goTop: {
      type: Boolean,
      default: true
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    pagerCount: {
      type: [Number, String],
      default: 11
    }
  },
  setup (props) {
    const { proxy } = getCurrentInstance()
    const _this = proxy
    // console.log(_this)
    const curPage = computed({
      get () {
        return props.page
      },
      set (val) {
      }
    })
    const allPage = computed(() => {
      return Math.ceil(props.total / (props.pageSize as any))
    })
    // 页码更改
    const handleCurrentChange = (val) => {
      if (props.goTop) divScrollTo()
      _this.$emit('pageChange', val)
    }
    const divScrollTo = () => {
      let ele = _this.$el.parentNode.parentNode
      while (ele.scrollTop === 0 && ele !== document.body) {
        ele = ele.parentNode
      }
      scrollTo(ele, 0, 200)
    }
    const handleSizeChange = (val:number) => {
      // console.log(`${val} items per page`)
      _this.$emit('pageSizeChange', val)
    }
    
    return {
      curPage,
      handleCurrentChange,
      divScrollTo,
      handleSizeChange,
      allPage
    }
  }
}
</script>
<style lang="scss">
  .pagination-content{
    margin: 24px 0;
    .all-total{
      color: var(--el-pagination-all-total-color);
      font-size: 12px;
    }
    .all-page{
      color: var(--el-pagination-all-page-color);
      font-size: 14px;
    }
    .el-pagination .el-select .el-input{
      // width: 96px;
      width: 120px;
    }
    .el-pagination__jump{
      .el-input{
        width: 40px;
      }
      .el-input--small .el-input__wrapper{
        padding-left: 1px;
        padding-right: 1px;
      }
    }
    .el-pagination__editor{
      min-width: 24px !important;
    }
    .el-pagination__sizes{
      margin: 0;
    }
    .btn-prev, .btn-next{
      padding: 0;
      width: 8px;
      min-width: 16px;
    }
  }
</style>
