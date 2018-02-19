# 文件命名

## components
**帕斯卡命名**  

通用组件，以 `U` 开头
```html
<!-- UTopBar.vue  -->
<template>
  <div class="u-top-bar"></div>
</template>

<!-- 引用 -->
<u-top-bar>
```

业务组件，以 `S` 开头
```html
<!-- SBankList.vue  -->
<template>
  <div class="s-bank-list"></div>
</template>

<!-- 引用 -->
<s-bank-list>
```

## pages
**以 `-` 连接**  

单名页面
```html
<!-- home.vue -->
<template>
  <div class="page-home"></div>
</template>
```

多名页面
```html
<!-- bankcard-list.vue -->
<template>
  <div class="page-bankcard-list"></div>
</template>
```

## 其他文件
`.js` 文件以 `驼峰` 命名，`构造函数` 以 `帕斯卡` 命名  
```js
// tool.js
// postError.js
// InitAjax.js
```

`图片` `.scss` 等以 `-` 连接
```js
// banner.png
// user-logo.png
// rem.scss
```
