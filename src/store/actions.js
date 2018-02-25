import {TOAST, DIALOG_UPDATE, DIALOG_OPEN, DIALOG_CLOSE, LOADING_UPDATE, SET_USERINFO} from './mutation-types'

export default {
  // 轻提示
  [TOAST] ({ commit, state }, conf) {
    if (window._timerToast) {
      console.log('重复弹框', conf.msg || conf)
      return
    }
    window._timerToast = true
    let _conf = {
      msg: conf.msg || conf,
      delay: conf.delay || 2000
    }
    commit(TOAST, _conf)
    setTimeout(() => {
      commit(TOAST, {msg: ''})
      window._timerToast = false
    }, _conf.delay)
  },
  // 打开弹窗
  [DIALOG_OPEN] ({ commit, state }, conf) {
    let _conf = {
      content: conf.content || conf,
      title: conf.title || '信息',
      confirmTxt: conf.confirmTxt || '确定',
      confirmFn: conf.confirmFn,
      cancelTxt: conf.cancelTxt || '取消',
      cancelFn: conf.cancelFn,
      cancelShow: conf.cancelShow !== false
    }
    setTimeout(() => {
      commit(DIALOG_UPDATE, _conf)
    }, 0)
  },
  // 关闭弹窗
  [DIALOG_CLOSE] ({ commit, state }) {
    let _conf = {
      content: ''
    }
    commit(DIALOG_UPDATE, _conf)
  },
  // 加载
  [LOADING_UPDATE] ({ commit, state }, bool) {
    commit(LOADING_UPDATE, bool)
  },
  // 设置用户信息
  [SET_USERINFO] ({ commit, state }, obj) {
    commit(SET_USERINFO, obj)
  }
}
