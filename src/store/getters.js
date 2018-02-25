import {TOAST, DIALOG} from './mutation-types'

export default {
  [TOAST] (state) {
    return state.toast
  },
  [DIALOG] (state) {
    return state.dialog
  },
  payInfo (state) {
    return state.payInfo
  },
  userInfo (state) {
    return state.userInfo
  }
}
