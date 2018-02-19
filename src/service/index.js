import rem from './rem'
import title from './title'
import layer from './layer'
import InitAjax from './ajax/InitAjax'

rem.init()

window.rem = rem
window.title = title
window.layer = layer

const config = {
  config: {
    headers: {
    }
  },
  host: ''
}
window.ajax = new InitAjax(config)
