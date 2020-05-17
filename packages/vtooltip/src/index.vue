<template>
  <div>hello {{text}}</div>
</template>
<script>
import popper from './mixin'

export default {
  mixins: ['popper'],
  data () {
    return {
      text: 'vue.js'
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
