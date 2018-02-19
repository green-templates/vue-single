# validate
表单校验

## 使用

### import
```js
import validate from 'validate'
```

### 自定义规则
该规则为校验函数组成的对象，**函数名** 对应 `form` 中的 `rule` 字段
```js
// custom rules
const rules = {
  name (i) {
    const regName = new RegExp('^[^\\d]+$')
    return !!i && regName.test(i)
  },
  mobile (i) {
    const regPhone = new RegExp('^1[34578]\\d{9}$')
    return regPhone.test(i)
  }
}

// add custom rules
validate.setConfig({
  rules: rules
})
```

### 调用
| 参数    | 类型      | 必须 |          | 说明             | 示例 |
| ------- | --------- | ---- | -------- | ---------------- | ---- |
| model   | `String`  | 是   | 校验数据 | 姓名             |
| err    | `String`  | 是   | 报错文案 | 请输入正确的姓名 |
| rule   | `String`  | 是   | 校验规则 | `name`          |
| ignore | `Boolean` | 否   | 是否校验 | `false`         |

```js
// form data
const form = {
  name: {
    model: '',
    err: 'name error',
    // 可添加多个验证规则，用 | 分隔
    rule: 'name|len5'
  },
  mobile: {
    model: '',
    err: 'mobile error',
    rule: 'mobile',
    // 不校验
    ignore: true
  }
}

// return Boolean
validate.check(form)
```

### 全局处理函数
全局处理验证错误，错误顺序由 `form` 中的对象顺序决定，从上到下
> 使用场景为 `toast` 类型报错，一次只报一次错误
```js
// handle global errors
validate.setConfig({
  handleError (err) {
    // toast error
    window.alert(err)
  }
})
```

### 单个回调函数
> 使用场景为输入框下方显示文案报错，显示多个报错
```js
// return Boolean
validate.check(form, (err, pass, key) => {
  // form[key]
  // object error in form
  const error = pass ? '' : err
  console.log(error)
})
```

## 说明
全局处理函数不应与单个回调函数同时使用

### 自带长度校验
`len5` 最小长度为 5  
`len5-10` 长度范围 5-10
```js
// example
const form = {
  name: {
    model: '',
    err: '',
    rule: 'len5'
  }
}
```

### 忽略某个字段不校验
`ignore: true`
```js
// example
const form = {
  name: {
    model: '',
    err: '',
    rule: 'len5',
    ignore: true
  }
}
```

### Vue
可作为 `Vue` 插件使用
```js
Vue.use(validate)

// in .vue
this.$validate(form, (obj, pass, key) => {
  // blablabla...
})
```
