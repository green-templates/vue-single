- [vue-single](#vue-single)
  - [开发及编译](#%E5%BC%80%E5%8F%91%E5%8F%8A%E7%BC%96%E8%AF%91)
  - [官方配置修改说明](#%E5%AE%98%E6%96%B9%E9%85%8D%E7%BD%AE%E4%BF%AE%E6%94%B9%E8%AF%B4%E6%98%8E)
    - [本地开发时浏览器访问](#%E6%9C%AC%E5%9C%B0%E5%BC%80%E5%8F%91%E6%97%B6%E6%B5%8F%E8%A7%88%E5%99%A8%E8%AE%BF%E9%97%AE)
    - [不提取 .vue 中的 css](#%E4%B8%8D%E6%8F%90%E5%8F%96-vue-%E4%B8%AD%E7%9A%84-css)
    - [添加 config/publicPath.js](#%E6%B7%BB%E5%8A%A0-configpublicpathjs)
    - [图片压缩](#%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9)
  - [其他 npm 命令](#%E5%85%B6%E4%BB%96-npm-%E5%91%BD%E4%BB%A4)

# vue-single
vue2 单页面应用模板，基于 [官方](https://www.npmjs.com/package/vue-cli) 略作修改

## 开发及编译
安装 [libpng](https://www.npmjs.com/package/image-webpack-loader#libpng-issues)

```zsh
# 安装依赖包，使用 cnpm
yarn/npm/cnpm install

# 启动开发服务
npm run dev

# 编译
npm run build

# 编译上 cdn，请先在 ./config/publicPath.js 中添加相应地址
# 线上 cdn
npm run build --cdn
# 测试 cdn
npm run build --cdn-t
```
---

## 官方配置修改说明

### 本地开发时浏览器访问
`devServer localhost` 改为打开当前 `ip`，使用 `npm` 包，不用手动输入，方便手机访问

### 不提取 .vue 中的 css
提取后图片相对路径错误，可修改 `publicPath` 为绝对路径解决

### 添加 config/publicPath.js
编译后域名访问添加 `/vue/` 路径 `http://xxx.com/vue/#/`  
添加 `cdn` 地址对象

### 图片压缩
使用 `webpack-image-loader`，需要安装 [libpng](https://www.npmjs.com/package/image-webpack-loader#libpng-issues)

```zsh
# error
Module build failed: Error: dyld: Library not loaded: /usr/local/opt/libpng/lib/libpng16.16.dylib
```

## 其他 npm 命令

```zsh
# 检查项目代码风格
npm run lint

# 自动修复某些代码风格问题
npm run lint -- --fix

# 生成依赖包分析报告
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
