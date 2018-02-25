import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import {getStore} from '../config/config'

Vue.use(Vuex)

const state = {
  slideDrection: 'left',  // 路由切换方式
  loading: false,
  payInfo: getStore('payInfo', 'json'), // 支付信息
  userInfo: getStore('userInfo', 'json') ||
    {
      accessToken: '',
      userId: '',
      mobile: '',
      realName: '',
      nickName: '',
      birthday: '',
      avatar: '',
      sex: '',
      classes: []
    },
  toast: {  // 轻提示
    msg: '',
    fn: undefined
  },
  dialog: { // 弹出框
    title: '',
    content: '',
    confirmTxt: '',
    confirmFn: null,
    cancelTxt: '',
    cancelFn: null,
    cancelShow: true
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
