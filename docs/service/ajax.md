# ajax
基于 [axios](https://github.com/mzabriskie/axios) 封装  
可生成多个实例，应对不同接口  
请求时添加 `layer.loading`  
全局处理 error，不需要 `.catch` 回调  

## 使用
```js
import InitAjax from './InitAjax'

const ajax = new InitAjax(options)
const ajax2 = new InitAjax(options2)
```

### options
| 参数   | 类型              | 必须 | 说明                | 示例 |
| ------ | ----------------- | ---- | ------------------- | ---- |
| config | `Object`          | 否   | axios.defaults 配置 |      |
| host   | `String` `Object` | 否   | 请求域名配置        |      |

```js
// example
const ajax = new InitAjax({
  // axios.defaults
  config: {
    headers: {
      'token': ''
    }
  },
  host: ''
  // host: {
  //   online: '',
  //   testing: ''
  // }
})
```

### 方法
```js
// axios.all axios.spread
ajax.all
ajax.spread

// options 同 axios.defaults，外加自定义 loading
ajax.get(url, params, options)
ajax.post(url, params, options)
```

```js
// example
ajax.get('/v1/list', {
  id: 1
}, {
  // axios.defaults
  timeout: 5000,
  // layer.loading
  loading: 3
}).then(res => {
  // blablabla~
})
```
