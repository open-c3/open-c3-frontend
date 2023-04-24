<template>
  <svg v-bind="$attrs" :class="svgClass" aria-hidden="true" :style="{width: width,height: height}">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// import { defineComponent } from 'vue'
import { computed } from 'vue'
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: '1em'
    },
    height: {
      type: [String, Number],
      default: '1em'
    }
  },
  setup (props) {
    const iconName = computed(() => {
      return `#icon-${props.iconClass}`
    })
    const svgClass = computed(() => {
      if (props.className) {
        return 'svg-icon ' + props.className
      } else {
        return 'svg-icon'
      }
    })
    return {
      iconName,
      svgClass
    }
  }
}

</script>

<style scoped>
.svg-icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
