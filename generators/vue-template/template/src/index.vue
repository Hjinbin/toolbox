<template>
  <div>hello {{text}}</div>
</template>
<script>
export default {
  props: {
    // 数据源
    data: {
      type: Object,
      default: () => ({})
    },
    // 选项列表
    options: {
      type: Array,
      default: () => ([])
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      text: 'vue.js'
    }
  },
  methods: {
    /**
     * @vuese
     * 获取结果
     */
    getResult () {
    },
    onChange (args) {
      // on-change 事件
      // @arg 发生变化后的值
      this.$emit('on-change', args)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
