import {SET_ACCESSTOKEN, SET_USERINFO, SET_SLIDE, TOAST, DIALOG_UPDATE, LOADING_UPDATE, SET_PAYINFO, LOGOUT} from './mutation-types'
import {setStore, removeStore} from '../config/config'

export default {
  // 设置token
  [SET_ACCESSTOKEN] (state, accessToken) {
    state.userInfo.accessToken = accessToken
    setStore('accessToken', accessToken)
  },
  // 设置用户信息
  [SET_USERINFO] (state, userInfo) {
    Object.assign(state.userInfo, userInfo)
    setStore('userInfo', userInfo)
  },
  // 退出登录
  [LOGOUT] (state) {
    state.userInfo = {}
    removeStore('userInfo')
  },
  // 导航返回方式
  [SET_SLIDE] (state, slideDrection) {
    state.slideDrection = slideDrection
  },
  // 轻提示
  [TOAST] (state, obj) {
    state.toast.msg = obj.msg
    state.toast.fn = obj.fn
  },
  // 弹出框
  [DIALOG_UPDATE] (state, obj) {
    state.dialog.content = obj.content
    state.dialog.cancelShow = obj.cancelShow
    state.dialog.confirmFn = obj.confirmFn
    state.dialog.title = obj.title
    state.dialog.confirmTxt = obj.confirmTxt
    state.dialog.cancelTxt = obj.cancelTxt
    state.dialog.cancelFn = obj.cancelFn
  },
  // 加载
  [LOADING_UPDATE] (state, bool) {
    state.loading = bool
  },
  // 添加支付信息
  [SET_PAYINFO] (state, obj) {
    state.payInfo = obj
    setStore('payInfo', obj)
  }
}
