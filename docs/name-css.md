# css 命名
使用 [BEM](http://getbem.com/) 命名规范，**不要使用 `scope`**

参考  
[Web语义化标准解读](https://github.com/kuitos/kuitos.github.io/issues/33)  
[如何撰写有效率的CSS选择器(CSS Selector)](http://www.mrmu.com.tw/2011/10/11/writing-efficient-css-selectors/)  

### .vue
```html
<!-- pages/list.vue -->
<template>
  <div class="page-list"></div>
</template>

<style lang="scss">
@import '../assets/scss/_global.scss';

.page-list {
  /* blablabla~ */
}
</style>
```
