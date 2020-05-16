import { mount } from '@vue/test-utils'
import Index from '@/index.vue'

describe('<%= camelName %>.vue', () => {
  // 现在挂载组件，你便得到了这个包裹器
  const wrapper = mount(Index)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<div>hello vue.js</div>')
  })
})
