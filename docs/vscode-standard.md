# vscode standard 配置
```bash
# 安装依赖包到项目
npm install standard -D
```

`vscode-standardjs` 插件需要安装 `standard` 包到项目，之后不遵循 `standard` 规范的代码都会有警告  
`cmd + shift + p` 输入 `fix all` 后可选择 `standard` 插件提供的快速 **修复命令** 去除某些可修复（空格，分号等，[规则列表](http://eslint.cn/docs/rules/) 中带有 `黄色工具` 图标的规则）的警告，保存时也会修复，其他的需要手动修改

编辑器配置插件 [EditorConfig for VS Code](./docs/FE-ENV.md#插件介绍)  

代码格式化插件 [beautify](./docs/FE-ENV.md#插件介绍) `alt + f`  
