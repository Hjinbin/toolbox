# <%= name %>

> <%= description %>

## 如何使用

### 安装

```shell
npm i cai-<%= name %>
```

<% if(docs){ %>
### API 文档

文档使用 [JSDoc](https://jsdoc.app/about-getting-started.html) 生成

[API 文档](/api-docs/<%= name%>/index.html)
<% } %>

<% if(coverage){ %>
### 测试覆盖率

[测试覆盖率](/coverage/<%= name%>/lcov-report/index.html)
<% } %>

## License

MIT &copy; <%= username %>
