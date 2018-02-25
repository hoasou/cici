import axios from 'axios'
import { baseUrl, baseUrl2, accessToken, brandId, clientId } from './config'

// 接口封装函数
// @param: token 是否需要拼接token，default value：true
function http (url, data, method = 'get', token = true) {
  if (token) {
    let defaultConfig = {
      accessToken: accessToken || (window._Vue && window._Vue.$store.getters.userInfo && window._Vue.$store.getters.userInfo.accessToken),
      brandId,
      clientId
    }
    data = Object.assign(defaultConfig, data)
  }
  return axios({
    url: url,
    method: method,
    params: data,   // get
    data: data,     // post
    responseType: 'json'
  }).then((http) => {
    var res = http.data
    if (res.errcode) {
      if (/未找到有效token|未认证的请求/i.test(res.msg)) {
        window._Vue.$store.commit('SET_ACCESSTOKEN', '')
        window._Vue.$toast('token验证失败，请重新登录')
        // window._Vue.$toast('您已经在其他地方登录或已退出登录，请重新登录')
        window._Vue.$router.replace('/member/login')
      } else {
        window._Vue.$toast(res.msg || '系统繁忙')
      }
      window._Vue.$loading(false)
    } else {
      return res.data
    }
  }).catch(
    (err) => {
      window._Vue.$toast(err || '系统繁忙')
      return err
    }
  )
}

const _API = {
  token: baseUrl2 + 'gateway/oauth/v2/token',
  get_shop_head: baseUrl + 'gateway/v5/shop/v2/get_shop_head',
  catalogues_package: baseUrl + 'gateway/v2/package/catalogues_package',
  get_shop_advservers: baseUrl + 'gateway/v5/shop/v2/get_shop_advservers',
  get_shop_servers: baseUrl + 'gateway/v5/shop/v2/get_shop_servers',
  get_my_school: baseUrl + 'gateway/v4/relation/school/get_my_school',
  getUserInfo: baseUrl + 'gateway/v5/user/getUserInfo',
  get_epage_Service: baseUrl + 'gateway/v5/service/v2/get_epage_Service'
}

export default {
  getShopHomeInfo: (data) => http(_API.get_shop_head, data),
  catalogues_package: (data) => http(_API.catalogues_package, data),
  get_shop_advservers: (data) => http(_API.get_shop_advservers, data),
  get_shop_servers: (data) => http(_API.get_shop_servers, data),
  token: (data) => http(_API.token, data, 'get', false),  // 不需要默认拼接token
  get_my_school: (data) => http(_API.get_my_school, data, 'get', false),  // 不需要默认拼接token
  getUserInfo: (data) => http(_API.getUserInfo, data),
  get_epage_Service: (data) => http(_API.get_epage_Service, data)
}
