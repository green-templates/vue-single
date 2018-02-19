- [vue-single-page-template](#vue-single-page-template)
  - [前端开发环境配置](#%E5%89%8D%E7%AB%AF%08%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE)
  - [开发及编译](#%E5%BC%80%E5%8F%91%E5%8F%8A%E7%BC%96%E8%AF%91)
  - [代码风格](#%E4%BB%A3%E7%A0%81%E9%A3%8E%E6%A0%BC)
  - [命名规范](#%E5%91%BD%E5%90%8D%E8%A7%84%E8%8C%83)
  - [service 文档](#service-%E6%96%87%E6%A1%A3)
  - [官方配置修改说明](#%E5%AE%98%E6%96%B9%E9%85%8D%E7%BD%AE%E4%BF%AE%E6%94%B9%E8%AF%B4%E6%98%8E)
    - [本地开发时浏览器访问](#%E6%9C%AC%E5%9C%B0%E5%BC%80%E5%8F%91%E6%97%B6%E6%B5%8F%E8%A7%88%E5%99%A8%E8%AE%BF%E9%97%AE)
    - [不提取 .vue 中的 css](#%E4%B8%8D%E6%8F%90%E5%8F%96-vue-%E4%B8%AD%E7%9A%84-css)
    - [添加 config/publicPath.js](#%E6%B7%BB%E5%8A%A0-configpublicpathjs)
    - [图片压缩](#%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9)
  - [其他 npm 命令](#%E5%85%B6%E4%BB%96-npm-%E5%91%BD%E4%BB%A4)
  - [TIPS](#tips)
    - [webpack 2 tree-shaking](#webpack-2-tree-shaking)

# vue-single-page-template
vue 单页面应用模板

## 前端开发环境配置
[快速进入开发阶段](./docs/FE-ENV.md)

## 开发及编译
安装 [libpng](https://www.npmjs.com/package/image-webpack-loader#libpng-issues)

```bash
# 安装依赖包，使用 cnpm
cnpm install

# 启动开发服务
npn run dev

# 编译
npm run build

# 编译上 cdn，请先在 ./config/publicPath.js 中添加相应地址
# 线上 cdn
npm run build --cdn
# 测试 cdn
npm run build --cdn-t
```

## 代码风格
[Vue 风格指南](https://cn.vuejs.org/v2/style-guide/)  

[js 风格指南，使用 standard](https://github.com/standard/standard/blob/master/docs/README-zhcn.md) (官方已集成，开发时会有报错)  

> 如果我不同意某条规则，可以改吗？

> 不行。制定这套 standard 规范的目的就是让大家都不必再花时间浪费在无谓的代码风格之争上面了

[vscode standard 配置](./docs/vscode-standard.md)(vscode 用户可以看看，非必需)

## 命名规范
[文件命名](./docs/name-file.md)  
[css 命名](./docs/name-css.md)

## service 文档
- 接口请求 [ajax](./docs/service/ajax.md)
- 弹框 [layer](./docs/service/layer.md)
- rem 布局 [rem](./docs/service/rem.md)
- 表单校验 [validate](./docs/service/validate.md)

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

``` bash
# 检查项目代码风格
npm run lint

# 自动修复某些代码风格问题
npm run lint -- --fix

# 生成依赖包分析报告
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## TIPS
### webpack 2 tree-shaking
正确使用 `es6 export` 语法  
```js
// bad
// 默认输出一个对象，不能用 tree-shaking
export default {}

// good
// 可以分别输出，或统一输出
// eg.
export setTitle
export addButton
// eg.
export {
  setTitle,
  addButton
}
```
[今天，你升级Webpack2了吗？](http://www.aliued.com/?p=4060)  
[【译】如何在 Webpack 2 中使用 tree-shaking](https://juejin.im/post/599bc13b6fb9a024a370f4ec)
# vue-single
