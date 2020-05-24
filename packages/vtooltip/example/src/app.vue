<template>
  <div class="container">
    <h1>使用示例</h1>
    <div class="item">
      <div class="title">自动判断文本溢出时显示提示框</div>
      <div class="sub-title">单行文本溢出：</div>
      <div class="ell demo" v-tooltip :title="overflowText">{{overflowText}}</div>
      <div class="sub-title">多行文本溢出：</div>
      <div class="mult-ell--3 demo" v-tooltip :title="overflowText">{{overflowText}}</div>
      <textarea class="textarea" v-model="overflowText" />
    </div>
    <div class="item">
      <div class="title">文本未溢出强制显示提示框</div>
      <div>设置 force 属性</div>
      <div class="ell demo" v-tooltip.force :title="text">{{text}}</div>
    </div>
    <div class="item">
      <div class="title">传入绑定值，优先级高于 title 属性的值</div>
      <div class="sub-title">传入普通变量、表达式：</div>
      <div v-tooltip="text" class="demo">hover me</div>
      <div v-tooltip="1 + 1" class="demo">显示 1 + 1 的结果</div>
      <div class="sub-title">传入 html 文本：</div>
      <div v-tooltip="htmlText" class="demo">展示html文本</div>
    </div>
    <div class="item">
      <div class="title">绑定值接受一个 render 函数，渲染更加复杂的动态内容</div>
      <div v-tooltip="{render}" class="demo">hover me，尝试手动修改输入框的值</div>
    </div>
    <div class="item">
      <div class="title">样式相关</div>
      <div class="sub-title">提示框主题：</div>
      <div v-tooltip.dark.force class="demo">默认 dark</div>
      <div v-tooltip.light.force class="demo">白色 light</div>
      <div class="sub-title">提示框位置，更多用法请查看文档：</div>
      <div v-tooltip.bottom.force class="demo">bottom</div>
      <span v-tooltip.left.force class="demo">left</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      overflowText: 'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。 如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。 如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。',
      text: '示例文本',
      htmlText: '<div><i>这是斜体</i><br /><b>这是粗体</b></div>',
      render: (h) => {
        return <div>
          获取变量并展示：<span>{this.text}</span>
          <br />
          渲染一个 input 输入框：<input value={this.text} on-input={this.onInputChange} />
        </div>
      }
    }
  },
  methods: {
    onInputChange (ev) {
      this.text = ev.target.value
    }
  }
}
</script>
<style>
body {
  padding: 0;
  margin: 0;
  background: #f8f8f9;
}
</style>
<style lang="scss" scoped>
.container {
  width: 1000px;
  margin: auto;
}
.item {
  padding: 20px;
  text-align: center;
  margin: 20px 0;
  box-shadow: 0 2px 2px -1px rgba(152,162,179,.3), 0 1px 5px -2px rgba(152,162,179,.3);
  border-radius: 4px;
  background-color: #fff;
  .title {
    font-size: 20px;
    font-weight: bold;
    margin: 20px 0;
  }
  .sub-title {
    font-size: 16px;
    font-weight: bold;
    margin: 12px 0;
  }
}
.demo {
  width: 400px;
  margin: 20px auto;
}
.textarea {
  width: 400px;
  height: 120px;
}
.ell {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mult-ell {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

@for $i from 2 through 10 {
  .mult-ell--#{$i} {
    @extend .mult-ell;
    -webkit-line-clamp: #{$i};
  }
}
</style>