# VTooltip

> 通过 `v-tooltip` 使用，简单易用、高性能

## 动机

### Why?

很多组件库已经实现了 Tooltip、Poptip 等提示框组件了，为什么要重复造轮子？

这些组件具有以下缺点或在一些场景不满足的地方，使用示例如下

```vue
<Poptip title="Title" content="content">
  <Button>Click</Button>
</Poptip>
```

- Button 被包裹住了，即 Button 的父级元素变成了 Poptip，这意味着设置一些上下文相关的样式可能比较麻烦
- Poptip 的大量使用：每个元素都需要单独编写 Poptip，这意味着页面如果需要大量的提示框效果，那么就需要编写大量的 Poptip，这会带来以下几点问题
  - 使用体验：对于显示简单信息的情况，使用组件的过程稍微显得繁琐
  - 性能问题：大量使用该组件的情况下，每个提示框都会被渲染出来，即使它们都是暂时隐藏的，渲染了大量的 DOM 元素容易带来性能问题
  - 性能问题：提示框组件内容监听了scroll事件，以此来实现提示框跟随滚动自动调整位置，即使在隐藏的时候仍然会继续监听并执行回调，会在不知不觉中影响你的页面性能
- 某些场景下，我们通过 css 设置了文本溢出以省略号结尾，同时希望溢出时显示提示框，否则不显示，这似乎需要单独写一个js判断，能否在组件内部就自动支持这种机制？

### What?

综合以上问题，`VTooltip` 是什么，具备什么优点：

- 通过 `v-tooltip` 指令的方式使用，提供多种参数选项，极其简洁易用，同时不会影响使用元素的上下文关系
- 通过 `Vue.use` 全局安装，鼠标 hover 时才显示，意味着当前只能显示一个提示框，因此全局只需要生成一个实例，再动态修改其内容与位置即可
- 只渲染了一份DOM，减少了没必要的 vue patch 的时间消耗
- 内部仍然监听了 scroll 来调整提示框位置，但由于全局只有一份实例，即使在多个地方使用，也不会造成性能问题
- 组件内部自动判断是否文本溢出，通过 `<span v-tooltip>长文本...</span>` 即可实现

## 快速开始

### 安装

```shell
npm install cai-vtooltip
```

### 使用

#### 全局安装

```javascript
import Vue from 'vue'
import Vtooltip from 'cai-vtooltip'

Vue.use(Vtooltip)
```

#### 在组件中使用

更多示例，请查看 [example](https://github.com/Hjinbin/toolbox/blob/master/packages/vtooltip/example/src/app.vue)

```vue
<template>
  <div>
    <div v-tooltip>长文本...</div> <div v-tooltip.force>强制显示短文本</div>
    <div v-tooltip="bindingVal">显示绑定值</div>
    <div v-tooltip="1 + 1">显示表达式结果</div>
    <div v-tooltip="{render: renderFunc}">render函数渲染自定内容</div>
  </div>
</template>
```

## API

`v-tooltip`

### 修饰符：

- `force`: 没有绑定值的情况下需要文本溢出，才会显示 tooltip，设置 force 后，短文本也会显示
- `top/bottom/left/right`: tooltip 的位置，默认是 top（在文本上方）
- `dark/light`: tooltip 的主题，默认为 dark

### 绑定值 value

目前接受的 value，有 `string、number、object`

- 内部使用了 `v-html`，可传入普通 HTML 字符串，或其他普通字符串、数字
- 传入 object 则接受一个属性名为 render 的 render 函数

### 可选的 option 对象

`Vue.use()` 支持传入一个可选的选项对象，目前 option 接收以下属性

- `zIndex` 设置 tooltip 的 `z-index` 属性，tooltip 被层级更高的元素挡住时，可修改这个属性，默认是 `1000`
