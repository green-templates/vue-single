# css 命名
使用 [BEM](http://getbem.com/) 命名规范，**不要使用 `scope`**

参考  
[Web语义化标准解读](https://github.com/kuitos/kuitos.github.io/issues/33)  
[如何撰写有效率的CSS选择器(CSS Selector)](http://www.mrmu.com.tw/2011/10/11/writing-efficient-css-selectors/)  

### .vue
最外层元素 `class` 命名规则

**页面文件**  
以 `page-文件名` 作为 `class`

**组件文件**  
以 `组件名` 作为 `class`

```html
<!-- pages/list.vue -->
<template>
  <div class="page-list"></div>
</template>

<style lang="scss">
.page-list {
  /* blablabla~ */
}
</style>

<!-- components/SBankList.vue  -->
<template>
  <div class="s-bank-list"></div>
</template>

<style lang="scss">
.s-bank-list {
  /* blablabla~ */
}
</style>
```
