# ToolBox

## Motivation

`ToolBox` 用于存放前端开发中常见工具函数，常用组件，有以下优点

- 一次编写，多次复用，避免在多个项目中重复封装
- 快速开发，基于 [SAO](https://github.com/saojs/sao) 生成模板，集成 example 示例、单元测试、测试覆盖率报告、自动生成API文档
- 维护升级方便，使用 [Lerna](https://lerna.js.org/) 管理和发布组件
- 使用 [bili](https://github.com/egoist/bili) (基于rollup封装)，支持打包为 ES Module，可以在项目中按需引入

## Quick Start

安装 sao，项目依赖

```shell
yarn global add sao
yarn
```

初始化模板

```shell
npm run init
```

## 技术细节

### 多包管理

使用 [Lerna](https://lerna.js.org/) 进行多包管理有以下优点

- 自动解决package之间的依赖关系
- 管理多包发布，通过 `git` 检测文件改动，自动发布
- 根据 `git` 提交记录，自动生成 `CHANGELOG`

### 快速开发

使用 [SAO](https://github.com/saojs/sao) 生成组件模板

> 为什么不使用 yeoman？
>
> yeoman 功能强大，但过于复杂，sao 开发和使用更加简单，适合快速开发

运行 `npm run init` 即可根据选择生成模板，无需手动搭建，同时集成了可选的以下模块

####  example

方便开发调试，发布之后，可作为使用示例

#### 测试用例

直接编写测试用例，同时可生成测试覆盖率报告，发布之后，自动集成到文档中方便查看

#### API 文档

文档使用 [docsify](https://docsify.js.org) 开发，根据 `README.md` 生成文档站点，运行以下命令预览

```shell
npm run docs:serve
```

文档发布使用 [Github Pages](https://pages.github.com/)，文档需要放在 `docs` 目录下，项目中加入了 [husky](https://github.com/typicode/husky)，代码提交前会自动同步 `packages` 目录下的组件文档

##### API 文档

组件API文档使用 `JSDoc`，可根据注释自动生成，提高开发效率，如需，手动编写文档则写到 `README.md`

值得注意的是，开发完组件后，需要手动将组件链接添加到 `list.md` 中

### 打包

package 打包使用 [bili](https://github.com/egoist/bili)，基于 rollup 封装的构建工具，可以将 `js` 库打包为 `ES Module`，可以发挥 `Webapck` 的 `Tree Shaking` 功能

`package.json` 中有以下两个入口

- module: `webpack` 在 import 一个模块时会根据 `module` 来引入模块
- main: 打包成 `cjs` 格式的模块路径

### 提交规范

项目使用 [commitizen](https://github.com/commitizen/cz-cli) 生成规范的提交信息，方便根据 commit 记录生成 CHANGELOG

```shell
git add .
# 使用 npm run commit 代替 git commit
npm run commit
# 或直接使用
npx git-cz
```

### 如何发布

#### Git Flow

- `master` 放置可以直接发布的代码，不能直接修改 push
- `dev` 用于开发，防止最新的预发布代码，发布时合并到 `master` 分支进行发布
- `dev-feature` 从 `dev` 分支 checkout 出新分支用于开发新功能，再合并到 `dev`
- `bugfix` 从 `dev` 分支 checkout 出新分支用于 bugfix，再合并到 `dev`

#### 发布

切换到 `master` 分支，以 `no fast forward` 方式合并 `dev`，然后进行发布

```shell
git checkout master
git merge xxx --no-ff
# 发布
npm run release
```
