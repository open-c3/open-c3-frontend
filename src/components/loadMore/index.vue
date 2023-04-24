<template>
  <div class="load-more mt20">
    <el-button v-if="page * Number(pageSize) < total" @click="handleCurrentChange" class="w200">{{ $t('config.loadMore.more')}}</el-button>
    <el-button v-else disabled class="w200">{{ $t('config.loadMore.noMore')}}</el-button>
  </div>
</template>

<script lang="ts">
import { scrollTo } from '@/utils/scrollTo'
import { getCurrentInstance } from 'vue'
export default {
  name: 'loadMore',
  emits: ['pageChange'],
  props: {
    goTop: {
      type: Boolean,
      default: true
    },
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
    }
  },
  setup (props) {
    const { proxy } = getCurrentInstance()
    const _this = proxy
    const divScrollTo = () => {
      let ele = _this.$el.parentNode.parentNode
      while (ele.scrollTop === 0 && ele !== document.body) {
        ele = ele.parentNode
      }
      scrollTo(ele, 0, 200)
    }
    // 页码更改
    const handleCurrentChange = (val) => {
      const newPage = props.page * 1 + 1
      if (props.goTop && newPage === 1) divScrollTo()
      _this.$emit('pageChange', newPage)
    }
    return {
      handleCurrentChange
    }
  }
}
</script>
<style lang="scss" scoped>
.load-more {
  text-align: center;
}
</style>
