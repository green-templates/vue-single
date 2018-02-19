# rem
移动端rem适配  
参考 [hostcss](https://github.com/imochen/hotcss)

## 说明
基准参照为 320 屏幕  
html字体大小为 100px  
设计稿基准为 750px，可修改

## 使用

```scss
@import './rem.scss';
// 默认设计稿宽度 750
// 全局修改设计稿宽度为 640
// $designWidth: 640;

body {
  // 设计稿字体大小 30
  font-size: rem(30);
  // 修改单个设计稿宽度为 640
  // font-size: rem(30, 640);
}

```

```js
import rem from 'rem'

rem.init(canScale)
```
| 参数     | 类型      | 必须 | 说明                                                                                                                           | 示例 |
| -------- | --------- | ---- | ------------------------------------------------------------------------------------------------------------------------------ | ---- |
| canScale | `Boolean` | 否   | 是否设置 `initial-scale` 使用 `dpr` 缩放，默认 `true` <br> 能解决 `1px` 问题，不影响布局 <br> 部分 `Android` 需要开启 `settings.setUseWideViewPort(true)` |     |

## js 方法
在 `js` 中使用 `rem`
```js
// @returns {Number} rem 数值，需要自己加 'rem'
rem.px2rem(px, designWidth) + 'rem'

// 默认设计稿宽度 750
rem.px2rem(30)

// 全局修改设计稿宽度为 640
rem.designWidth = 640

// 修改单个设计稿宽度为 640
rem.px2rem(30, 640)
```
| 参数 | 类型     | 必须 | 说明 | 示例 |
| ---- | -------- | ---- | ---- | ---- |
| px   | `Number` | 是   |   字体大小   |     |
| designWidth   | `Number` | 否   |   设计稿大小 ，默认 750  |     |
