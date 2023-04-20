<template>
  <div v-loading="tableLoading" class="customTable" :element-loading-text="$t('dataLoading')">
    <!-- table -->
    <el-table
      ref="customTable"
      v-bind="$attrs"
      :data="data"
      :tooltip-effect="tooltipEffect"
      :empty-text="$t('emptyText')"
      :highlight-current-row="highlightCurrentRow"
      :border="border"
      class="customTable-main"
      @sort-change="sortChange"
      @row-click="rowClick">
      <template v-for="item in thead">
        <!-- 用于自定义列 -->
        <slot v-if="item.type === 'slotTable'" :name="item.prop"/>
        <el-table-column
          v-else-if="!item.hidden"
          :key="item.label"
          :sortable="item.sort || false"
          :label="$t( item.label )"
          :width="item.width"
          :min-width="item.minW"
          :prop="item.prop"
          :show-overflow-tooltip="item.showOverTip"
          :align="item.align || align || 'left'">
          <template #default="scope">
            <!-- 图片 -->
            <template v-if="item.type==='img'">
              <el-carousel v-if="{}.toString.call(scope.row[item.prop]).slice(8,-1)==='Array'" :height="item.style.height" :autoplay="false" indicator-position="none" type="card">
                <el-carousel-item v-for="(img,index) in scope.row[item.prop]" :key="index">
                  <img :src="img" :style="item.style" alt="暂无图片" >
                </el-carousel-item>
              </el-carousel>
              <template v-else>
                <img v-if="scope.row[item.prop]" :src="scope.row[item.prop]" :style="item.style" alt="暂无图片" >
              </template>
            </template>

            <!-- 可点的a标签 -->
            <template v-else-if="item.type==='drawer'">
              <div :class="{ visible: item.copy }">
                <a v-if="drawerCondition(item, scope.row)" :data-drawer="true" class="customTable-main-a" @click.prevent="handleOpen(scope.row, scope.$index, $event)">{{ item.text || scope.row[item.prop] }}</a>
                <span v-else>{{ item.text || scope.row[item.prop] }}</span>
                <!-- <Copy v-if="item.copy" :val="item.text || scope.row[item.prop]" hidden/> -->
                <span v-show="curRow === scope.row" class="customTable-main-mask"/>
              </div>
            </template>

            <!-- 外链 -->
            <template v-else-if="item.type==='link'">
              <a :href="scope.row[item.prop]" class="customTable-main-a" >{{ scope.row[item.prop] }}</a>
            </template>

            <!-- SVG -->
            <template v-else-if="item.type ==='svg'">
              <span class="customTable-main-svg" style="font-size: 18px;"><svg-icon v-if="item.prop && scope.row[item.prop]" :iconClass="scope.row[item.prop + 'Svg'] || (theme === 'light' ? scope.row[item.prop] : (scope.row[item.prop] +'-dark'))" :name="scope.row[item.prop + 'Svg'] || scope.row[item.prop]"/></span>
            </template>
            <!-- SVG和文字 -->
            <template v-else-if="item.type ==='svgText'">
              <span :class="item.class ? item.class : 'df ai_c'">
                <span class="customTable-main-svg mt6" style="font-size: 18px;"><svg-icon v-if="item.svgProp && scope.row[item.svgProp]" :iconClass="scope.row[item.svgProp + 'Svg'] || scope.row[item.svgProp]" :name="scope.row[item.svgProp + 'Svg'] || scope.row[item.svgProp]"/></span>
                <span class="ml5">{{ scope.row[item.prop] }}</span>
              </span>
            </template>
            <!-- SVG和文字 -->
            <template v-else-if="item.type ==='svgTextCopy'">
              <div class="svg-text-box">
                <span class="customTable-main-svg mt6" style="font-size: 18px;"><svg-icon v-if="item.svgProp && scope.row[item.svgProp]" :name="scope.row[item.svgProp + 'Svg'] || scope.row[item.svgProp]"/></span>
                <span class="ml5">{{ item.prop && scope.row[item.prop] && $t(`config.cloud.${scope.row[item.prop]}`) }}</span>
              </div>
            </template>

            <!-- 标签 -->
            <template v-else-if="item.type === 'tag'">
              <template v-if="typeof scope.row[item.prop] === 'string'">{{ scope.row[item.prop] }}</template>
              <template v-else>
                <span v-for="(tag,index) in scope.row[item.prop]" :key="index" :style="item.style" class="el-tag el-tag--info el-tag--small" style="margin:4px">
                  <span class="el-select__tags-text">{{ tag }}</span>
                </span>
              </template>
            </template>

            <!-- 开关 -->
            <template v-else-if="item.type === 'switch'">
              <el-switch :disabled="item.disabled" v-model="scope.row[item.prop]" active-color="#13ce66" inactive-color="#ff4949" @change="item.change ? item.change(scope.row,scope.$index):()=>{}"/>
            </template>

            <!-- 按钮或文字 -->
            <template v-else-if="item.type === 'btn'">
              <!-- <div v-if="item.type!=='btn'">{{ scope.row[item.prop] }}</div> -->
              <el-button :type="item.btnType || 'primary'" size="small" @click="item.click(scope.row, scope.$index, $event)">{{ item.text || scope.row[item.prop] }}</el-button>
            </template>

            <!-- 时间（会自动转化为本地显示时间） -->
            <template v-else-if="item.type === 'time'">
              <div>{{ $filters.localTime(scope.row[item.prop]) }}</div>
            </template>

            <!-- 文本遇到回车会自动换行 -->
            <template v-else-if="item.type === 'autoWrap'">
              <span class="customTable-main-autoWrap">{{ scope.row[item.prop] }}</span>
            </template>
            <!-- 资源类型 （英文，会自动转为中文映射）-->
            <template v-else-if="item.type === 'resType'">
              <div>{{ $filters.cloudMap(scope.row[item.prop]) }}</div>
            </template>
            <!-- 插入的内容 -->
            <template v-else-if="item.type === 'slot'">
              <div :style="item.style || scope.row.style" :class="{ visible: (item.copy && scope.row[item.prop]) || item.edit}">
                <slot :name="item.prop" :row="scope.row" :index="scope.$index"/>
                <!-- <Copy v-if="item.copy" :val="scope.row[item.prop]" hidden/> -->
              </div>
            </template>
            <!-- 内容 -->
            <template v-else>
              <div :style="item.style || scope.row.style" :class="{ visible: (item.copy && scope.row[item.prop]) || item.edit}" class="dif">
                <template v-if="item.showOverTip">
                  <!-- <ToolTip :text="scope.row[item.prop]">
                    undefined，null，''，不展示。避免false，0 无法展示
                    <span :class="{ textOverflow:item.showOverTip, text: item.showOverTip }">{{ scope.row[item.prop] || { false: 'false', 0: '0' }[scope.row[item.prop]] || '无' }}</span>
                  </ToolTip> -->
                </template>
                <span v-else :class="{ textOverflow:item.showOverTip, text: item.showOverTip }">{{ scope.row[item.prop] || { false: 'false', 0: '0' }[scope.row[item.prop]] || '-' }}</span>
                <!-- <Copy v-if="item.copy" :val="scope.row[item.prop]" hidden/> -->
                <span
                  v-if="item.edit && (!item.clouds || item.clouds[scope.row.cloud])" class="vh edit hand ml5 btn-link"
                  @click="item.editCb(scope.row)">
                  <el-icon><Edit /></el-icon>
                  </span>
              </div>
            </template>
          </template>
        </el-table-column>
      </template>
      <slot v-if="data.length !== 0" name="default"/>
      <el-table-column v-if="order" label="排序" align="center" width="70"><i style="font-size:18px" class="el-icon-rank"/></el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination v-if="total && pageType === 'page'" :page="page" :page-size="pageSize" :total="total" :go-top="goTop" :pagerCount="pagerCount" :layout="layout" @pageChange="$attrs.pageChange" @pageSizeChange="$attrs.pageSizeChange" />
    <load-more v-if="total && pageType === 'loadMore'" :page="page" :page-size="pageSize" :total="total" @pageChange="$attrs.pageChange"/>
  </div>
</template>

<script lang="ts">
  import { reactive, onMounted, toRefs, nextTick, getCurrentInstance, computed } from 'vue'
/*
 * @props: {                                          默 认 值      是否必须
 *    thead           (array)   :   表格表头数组          [ ]          是
 *    data            (array)   :   要展示的数据数组       [ ]          是
 *    tableLoading    (boolean) :   tableLoading       false         否
 *    noBorder        (boolean) :   是否去掉row的边框    false         否
 *    clickhighlight  (boolean) :   点某一行高亮当前行    false         否
 *    rowClickCb      (function):   点某一行回调          无           否
 *
 *    * 单选功能 *
 *    radioChange     ($emit)   :   单选选项改变回调        无          否
 *
 *    * 多选功能 *
 *    selectionChange ($emit)   :   多选选项改变回调        无          否
 *
 *    * 分页功能 *
 *    page            (number)  :   当前页                1           否
 *    total           (number)  :   总页数(有代表需要分页)  0            否
 *    pageSize        (number)  :   一页的数量            10           否
 *    goTop           (boolean) :   切换后滚动条返回顶部   true          否
 *
 *   * 抽屉功能 *
 *   drawerOpenCb     (function):   drawer打开回调        无           否
 *   drawerCloseCb    (function):   drawer关闭回调        无           否
 *
 *   * 排序功能 *
 *   order            (boolean) :   是否支持拖拽排序      fasle          否
 *   orderList        (array)   :   拖拽数据列表           []           否
 * }
 */
  import Pagination from '../pagination/index.vue'
  import loadMore from '@/components/loadMore/index.vue'
  import { useStore } from 'vuex'

export default {
  components: { Pagination, loadMore },
  emits: ['drawerOpenCb', 'rowClickCb', 'sortCb'],
  inheritAttrs: false,
  props: {
    // 表头信息
    thead: {
      type: Array<any>,
      required: true,
      default: () => ([])
    },
    // 数据数组
    data: { // 必须用props传，$attrs会报错
      type: Array,
      required: true,
      default: () => ([])
    },
    align: {
      type: String,
      default: ''
    },
    // 去掉row的边框
    noBorder: {
      type: Boolean,
      default: false
    },
    // 超出隐藏
    tooltipEffect: {
      type: String,
      default: 'dark'
    },
    //  加载中
    tableLoading: {
      type: Boolean,
      default: false
    },
    // 总页数
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: [Number, String],
      default: 10
    },
    goTop: {
      type: Boolean,
      default: true
    },
    pagerCount: {
      type: [Number, String],
      default: 11
    },
    layout: {
      type: String,
      default: 'sizes, prev, pager, next, jumper'
    },
    editRule: {
      type: Array,
      default: () => ([])
    },
    order: {
      type: Boolean,
      default: false
    },
    orderList: {
      type: Array,
      default: () => ([])
    },
    clickhighlight: {
      type: Boolean,
      default: false
    },
    pageType: {
      type: String,
      default: 'page'
    },
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const store = useStore()
    const theme = computed(() => { // 全局loading
      return store.state.app.theme
    })
    // 获取当前实例（包括从父组件传过来的props数据, 实例方法($watch,$emit, $forceUpdate,$nextTick, 定义的全局的$addHost
    // vue 内含的$alert,$message,$messageBox, $store,$router, $refs ...)）
    const { proxy } = getCurrentInstance()
    const _this = proxy
    // console.log(_this)
    const state = reactive({
      curRow: null,
      sortable: null
    })
    /* 是否展示为抽屉判断条件 */
    const drawerCondition = (item, row) => {
      const condition = item.clouds && item.clouds[row.cloud]
      // 给的item中不存在 clouds 字段 则不做判断  所有云都展示
      return !item.clouds || (typeof condition === 'function' ? condition(row) : condition)
    }
    // 点击tr
    const rowClick = (row, column, e) => {
      if (props.clickhighlight || e.target.dataset.drawer) {
        state.curRow = row
      } else {
        row = state.curRow
      }
    }
    // 打开抽屉
    const handleOpen = (row, i, e) => {
      if (row === state.curRow) return
      const left = 310 + e.target.offsetParent.offsetWidth
      _this.$emit('drawerOpenCb', left, row, i, e)
      document.documentElement.style.overflow = 'hidden'
      // proxy.$on('hook:destroyed', () => {
      //   document.documentElement.style.overflow = 'visible'
      // })
    }
    // 重置选中项
    const resetCurRow = () => {
      state.curRow = null as any
      (proxy.$refs.customTable as any).setCurrentRow(state.curRow)
      document.documentElement.style.overflow = 'visible'
    }
    // 设置当前行
    const setCurRow = (row) => {
      state.curRow = row
    }
    // 顺序修改
    const sortChange = (column, prop, order) => {
      _this.$emit('sortCb', column, prop, order)
    }
    // 默认选中
    const selectItemFun = (row, key) => {
      // console.log(row)
      if (row.length && props.data.length) {
        props.data.forEach(item => {
          const str = key || 'id'
          if (row.indexOf(item[str]) > -1) {
            (proxy.$refs.customTable as any).toggleRowSelection(item, true)
          }
        })
      }
    }
    const toggleRowSelectionFun = (row, flag) => {
      (proxy.$refs.customTable as any).toggleRowSelection(row, flag)
    }
    const toggleAllSelectionFun = () => {
      (proxy.$refs.customTable as any).toggleAllSelection()
    }
    const clearSelect = () => { // 清空
      (proxy.$refs.customTable as any).clearSelection()
      // customTable.value.clearSelection()
    }

    onMounted(async () => {
      if (props.order) {
        await nextTick()
      }
    })
    return {
      theme,
      ...toRefs(state),
      drawerCondition,
      setCurRow,
      resetCurRow,
      rowClick,
      handleOpen,
      sortChange,
      selectItemFun,
      clearSelect,
      toggleRowSelectionFun,
      toggleAllSelectionFun
    }
  },
  data () {
    return {
      curRow: null,
      sortable: null
    }
  }
}
</script>
