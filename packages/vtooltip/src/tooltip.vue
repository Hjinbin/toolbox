<template>
  <div
    :class="tooltipPopperCls"
    ref="popper"
    @mouseenter="onMouseEnterPopper"
    @mouseleave="onMouseLeave"
  >
    <div
      v-show="visible"
      class="weops-tooltip-content"
      :style="contentStyle"
    >
      <div class="weops-tooltip-arrow"></div>
      <div class="weops-tooltip-inner">
        <Render :render="render">
          <span v-html="content" />
        </Render>
      </div>
    </div>
  </div>
</template>

<script>
// 依赖于wegoui的popper.js，用于popper定位，监听页面滚动自动调整位置
import Popper from './popper'

export default {
  name: 'WeopsGlobalTooltip',
  mixins: [Popper],
  components: {
    Render: {
      functional: true,
      props: {
        render: [Function, String]
      },
      render: (h, ctx) => {
        if (typeof ctx.props.render === 'function') {
          return ctx.props.render(h)
        }
        return ctx.children
      }
    }
  },
  props: {
    placement: String,
    theme: {
      type: String,
      default: 'dark'
    }
  },
  data () {
    return {
      content: '',
      popperEle: null,
      render: ''
    }
  },
  computed: {
    tooltipPopperCls () {
      return [
        'weops-tooltip-popper',
        `weops-tooltip-popper-${this.theme}`
      ]
    },
    contentStyle () {
      return Number(this.zIndex)
        ? {
          'z-index': Number(this.zIndex)
        }
        : {}
    }
  },
  methods: {
    onMouseEnter (el) {
      if (this.popperJS) {
        this.doDestroy()
      }
      // 传入参照元素，使用 Popper 自动调整 Tooltip 的位置
      this.reference = el
      this.onMouseEnterPopper()
    },
    onMouseEnterPopper () {
      this.value = true
    },
    onMouseLeave () {
      this.value = false
    }
  }
}
</script>

<style lang='scss' scoped>
@import './tooltip.scss';
</style>