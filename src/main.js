import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'
import Vue from 'vue'
import router from './router'
import App from './App'
import MuseUI from 'muse-ui'
import store from './store/'
import Dialogs from './utils/dialogs'
import './utils/adaptive' // 自适应
import './assets/common/css/common.css'
import FastClick from 'fastclick' // 解决移动端300毫秒延迟
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.config.productionTip = false

Vue.use(MuseUI)
Vue.use(Dialogs)

/* eslint-disable no-new */
window._Vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
