import Tooltip from './tooltip.vue'

let instance = null

export default function createInstance (Vue, options) {
  if (instance) {
    return instance
  }

  const VTooltip = Vue.extend(Tooltip)

  const el = document.createElement('div')
  document.getElementsByTagName('body')[0].appendChild(el)

  instance = new VTooltip({
    el,
    data: {
      zIndex: options.zIndex
    }
  })

  return instance
}
