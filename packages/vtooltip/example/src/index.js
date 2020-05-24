import Vue from 'vue'
import App from './app.vue'
import VTooltip from '../../src'

Vue.use(VTooltip)

new Vue({
  el: '#app',
  render: h => h(App)
})
