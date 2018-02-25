import { TOAST, LOADING_UPDATE } from '../store/mutation-types'

export default {
  install: (Vue, options) => {
    Vue.prototype.$toast = (option) => {
      let v = window._Vue
      let _conf = {
        msg: option.msg || option,
        delay: option.delay || 2000,
        fn: option.fn
      }
      if (window._timerToast) {
        console.log('重复弹框', _conf.msg || _conf)
        return
      }
      window._timerToast = true
      v.$store.commit(TOAST, _conf)
      setTimeout(() => {
        typeof _conf.fn === 'function' && _conf.fn()
        v.$store.commit(TOAST, {msg: ''})
        window._timerToast = false
      }, _conf.delay)
    }

    Vue.prototype.$loading = (bool = true) => {
      let v = window._Vue
      v.$store.commit(LOADING_UPDATE, bool)
    }
  }
}
