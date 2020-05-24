import createInstance from './instance'

const placementList = ['top', 'bottom', 'right', 'left']

class Popper {
  constructor ({ Vue, options, el, binding }) {
    this.instance = createInstance(Vue, options)
    this.el = el
    this.binding = binding
    this.title = ''
    const { modifiers } = this.binding
    this.placement = placementList.find(p => modifiers[p]) || 'top'
    this.theme = modifiers.light ? 'light' : 'dark'
  }

  onMouseEnter (ev) {
    ev.stopPropagation()
    const { modifiers, value } = this.binding
    if (!isNullValue(value)) {
      this.handleValue(value)
    } else if (modifiers.force || isOverFlow(this.el)) {
      this.handleTitle()
    }
  }

  onMouseLeave (ev) {
    ev.stopPropagation()
    if (this.title) {
      this.el.setAttribute('title', this.title)
      this.title = ''
    }
    this.instance.onMouseLeave()
  }

  // 根据绑定值渲染，优先级高
  handleValue (value) {
    if (Object.prototype.toString.call(value) === '[object Object]') {
      const { render } = value
      if (typeof render === 'function') {
        this.renderFunction(render)
      }
    } else {
      this.renderText(value)
    }
  }

  // 根据 title 属性，或者读取innerText
  handleTitle () {
    const title = this.el.getAttribute('title')
    if (title) {
      this.renderText(title)
      this.title = title
      this.el.removeAttribute('title')
    } else {
      this.renderText(this.el.innerText)
    }
  }

  // 渲染普通文本、html文本
  renderText (text) {
    if (isNullValue(text)) return
    this.instance.content = text
    this.instance.render = ''
    this.renderTooltip()
  }

  // 渲染 render 函数
  renderFunction (render) {
    if (isNullValue(render) || typeof render !== 'function') return
    this.instance.render = render
    this.instance.content = ''
    this.renderTooltip()
  }

  // 渲染 tooltip 样式相关，并触发显示
  renderTooltip () {
    const Tooltip = this.instance
    Tooltip.placement = this.placement
    Tooltip.theme = this.theme
    Tooltip.onMouseEnter(this.el)
  }

  updateBinding (binding) {
    this.binding = binding
  }
}

export default {
  install (Vue, options = {}) {
    Vue.directive('tooltip', {
      bind (el, binding) {
        const popper = el._popper = new Popper({ Vue, options, el, binding })
        el._mouseenterHandler = popper.onMouseEnter.bind(popper)
        el._mouseleaveHandler = popper.onMouseLeave.bind(popper)
        el.addEventListener('mouseenter', el._mouseenterHandler)
        el.addEventListener('mouseleave', el._mouseleaveHandler)
      },
      componentUpdated (el, binding) {
        if (el._popper) {
          el._popper.updateBinding(binding)
        }
      },
      unbind (el) {
        el.removeEventListener('mouseenter', el._mouseenterHandler)
        el.removeEventListener('mouseleave', el._mouseleaveHandler)
        el._popper = null
      }
    })
  }
}

// 文本不溢出不需要显示title
// https://stackoverflow.com/questions/52232026/determine-if-ellipsis-is-being-displayed-when-using-webkit-line-clamp-for-multi
function isOverFlow (el) {
  const style = window.getComputedStyle(el)
  const overflow = style.getPropertyValue('overflow')

  if (overflow === 'hidden') {
    const display = style.getPropertyValue('display')
    const orient = style.getPropertyValue('-webkit-box-orient') ||
      style.getPropertyValue('-moz-box-orient') ||
      style.getPropertyValue('-ms-box-orient') ||
      style.getPropertyValue('-o-box-orient') ||
      style.getPropertyValue('box-orient')

    if (['-webkit-box', '-moz-box', '-ms-box', '-o-box', 'box'].includes(display) && orient === 'vertical') {
      return isVerticalOverflow(el)
    } else {
      return isHorizontalOverflow(el)
    }
  }
}
// 水平溢出
function isHorizontalOverflow (el) {
  return el.offsetWidth < el.scrollWidth
}
// 垂直溢出
function isVerticalOverflow (el) {
  return el.offsetHeight < el.scrollHeight
}

function isNullValue (val) {
  const type = typeof val
  return type === 'undefined' ||
    (type === 'number' && isNaN(val)) ||
    val === null ||
    (typeof val === 'string' && !val)
}