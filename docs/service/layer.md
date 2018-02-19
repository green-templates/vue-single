# layer
基于 [layer](http://layer.layui.com/mobile/) 弹框修改  
需要 src/assets/scss/layer.scss

## 使用

### import
```js
import layer from './layer'
```

### loading
loading 框

```js
// return index
layer.loading(type, close)
```

| 参数  | 类型      | 必须 | 说明             | 示例  |
| ----- | --------- | ---- | ---------------- | ----- |
| type  | `Number`  | 否   | loading 类型 <br>`2` 三个点+黑色透明遮罩 默认<br> `3` loading圈+白色遮罩 <br> `4` loading圈+透明遮罩 <br> `5` 透明遮罩    | `2`     |
| close | `Boolean` | 否   | 点击遮罩能否关闭，默认为 `false` | `true`|

```js
// example
layer.loading(3)
```

### toast
toast 提示框

```js
// return index
layer.toast(msg, option)
```
| 参数  | 类型      | 必须 | 说明             | 示例  |
| ----- | --------- | ---- | ---------------- | ----- |
| msg  | `String`  | 否   | 提示消息，默认为空     | `blablabla~`     |
| option  | `Object`  | 否   | layer 参数 <br> `time: 2` toast 显示时间，默认 `2` 秒    | `time: 3`     |

```js
layer.toast('hhhhhhh~')
```

### warning
提示框，一个按钮

```js
// return index
layer.warning(msg, option)
```
| 参数  | 类型      | 必须 | 说明             | 示例  |
| ----- | --------- | ---- | ---------------- | ----- |
| msg  | `String`  | 否   | 提示消息，默认为空     | `blablabla~`     |
| option  | `Object`  | 否   | layer 参数 |  |

```js
// example
layer.warning('', {
  end() {
    // 点击按钮后会自动关闭弹框
  }
})
```

### confirm
提示框，两个按钮

```js
// return index
layer.confirm(msg, option)
```
| 参数  | 类型      | 必须 | 说明             | 示例  |
| ----- | --------- | ---- | ---------------- | ----- |
| msg  | `String`  | 否   | 提示消息，默认为空     | `blablabla~`     |
| option  | `Object`  | 否   | layer 参数 |  |

```js
// example
const lid = layer.confirm('', {
  btn: ['确定', '取消'],
  yes() {
    // 点击按钮后需要手动关闭弹框
    layer.close(lid)
  },
  no() {
    // 点击按钮后会自动关闭弹框
  }
})
```

### close
关闭某个弹框

```js
// n 为 layer 返回的 index
layer.close(n)
```

### closeAll
关闭全部弹框

```js
layer.closeAll()
```

## option
option 参数说明，此为 [layer](http://layer.layui.com/mobile/) 官方参数

| 参数  | 类型      | 必须 | 说明             | 示例  |
| ----- | --------- | ---- | ---------------- | ----- |
| shadeClose  | `Boolean`  | 否   | 点击遮罩能否关闭弹框，默认 `false`    | `false`     |
| content  | `String`  | 否   | `html` 内容，可加标签   | `<p>123</p>`     |
| btn  | `Array`  | 否   | 弹框按钮   | `['确定', '取消']`     |
| yes  | `Function`  | 否   | 一般用作 `confirm` `确定`按钮回调 <br> 此函数调用后需要`手动关闭`弹框  |     |
| no  | `Function`  | 否   | 一般用作 `confirm` `取消`按钮回调 <br> 此函数调用后会`自动关闭`弹框  |     |
| end  | `Function`  | 否   | 弹框关闭后调用，不论以哪种事件触发，只要调用了 `close` 都会执行 <br> 一般用作 `warning` 按钮回调 <br> 此函数调用后会`自动关闭`弹框 <br> 如果 `shadeClose` 为 `true`，点击遮罩关闭弹框后也会调用 |     |
| time  | `Number`  | 否   | 自动关闭弹框，默认 `2` 秒 <br>  一般用于 `toast`  | `time: 2`     |
