<template>
  <el-tabs v-bind="$attrs" class="saas-tab-line" :class="`saas-tab-line__${size}`">
    <!-- 循环 多个-->
    <el-tab-pane v-for="(item, index) in tabs" :name="item[nameKey] || item" :key="index">
      <template #label>
        <div class="label">
          <template v-if="item[labelKey]">{{/[\u4e00-\u9fa5]/g.test(item[labelKey])? item[labelKey]: $t(item[labelKey]) || item[labelKey] }}</template>
          <template v-else-if="pre">{{ $t(`${pre}.${item}`) }}</template>
          <template v-else>{{ item }}</template>
        </div>
      </template>
      <slot name="content" :item="item" />
    </el-tab-pane>
    <!-- 只有一个 -->
    <el-tab-pane v-if="label">
      <template #label>
        <div class="label"> {{ label }}</div>
      </template>
      <slot name="paneContent" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">

export default {
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: null
    },
    nameKey: {
      type: String,
      default: 'name'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    pre: {
      type: String,
      default: null
    },
    size: { // tab的大小 mini small large
      type: String,
      default: 'large'
    }
  },
  setup () {
  }
}
</script>

<style lang="scss" scoped>
// tab 下划线样式
  .saas-tab-line {
    :deep(.el-tabs__item) {
      padding: 0;
      font-weight: 400;
      // height: 56px;
      @include font-base-title(16px, var(--color_menu_text));
      .label {
        margin: 24px 8px 16px;
        text-align: center;
      }
      &.is-active {
        color: var(--color_primary)!important;
      }
      &:hover {
        color: var(--color_primary);
      }
    }
    :deep(.el-tabs__nav-wrap::after) {
      height: 1px;
      background-color: var(--color_border);
    }
  }
  .saas-tab-line__large {
    :deep(.el-tabs__item) {
      height: 62px;
      line-height: 22px;
      min-width: 128px;
      font-size: 16px;
    }
  }
  .saas-tab-line__small {
    :deep(.el-tabs__item) {
      height: 52px;
      line-height: 20px;
      min-width: 108px;
      font-size: 14px;
      .label {
        margin-bottom: 8px;
      }
    }
  }
  // .saas-tab-line__mini {
  //   .el-tabs__item {
  //     line-height: 17px;
  //     min-width: 100px;
  //     font-size: 12px;
  //     .label {
  //       padding: 8px 0;
  //     }
  //   }
  // }
  .cost-tab {
    :deep(.el-tabs__item) {
      height: 38px!important;
      .label {
        margin: 0px!important;
      }
    }
  }
</style>
