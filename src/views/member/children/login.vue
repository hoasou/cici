<template>
  <div class="m-login">
    <div class="logo">演示版</div>
    <div class="login-item input-box" :class="loginType === 1? 'on':''">
      <input type="text" class="u-username" v-model="list[userIndex].userName" @change="changeUser" placeholder="请输入您的用户名"/>
      <mu-select-field class="selector" v-model="userIndex" :labelFocusClass="['label-foucs']" label="">
        <mu-menu-item class="" v-for="(item,index) in list" :key="index" :value="index" :title="item.userName + ''" />
      </mu-select-field>
      <input type="password" class="u-pwd" v-model="list[userIndex].pwd">
    </div>
    <div class="login-item" :class="loginType !== 1 ? 'on':''">
      <input type="text" class="u-token" v-model="accessToken" @change="changeUser" placeholder="请输入您的token"/>
    </div>
    <div class="btn-box">
      <mu-raised-button label="登录" class="btn-login" @click="login"/>
    </div>
    <div class="txt">
      <p>需要帮助？ <a @click="changeLoginType">切换登录方式</a></p>
      <p>咨询客服(400-800-5555)</p>
    </div>
    <div class="bottom-txt">还没账号？<a @click="$toast('该功能暂未开放')">立即注册</a></div>

    <div v-if="url" style="position: fixed; bottom: 0; left: 0; width:100%; height: 100%; background:#fff; z-index:99;">
      <div @click="changeLoginType" style="width:1rem; height:1rem; line-height:1rem; font-weight:bold;float:right; font-size:0.4rem;">x</div>
      <p style="text-align:left;color:red; padding:0.4rem 0.2rem; margin-top: 1.5rem;">开发环境下跨域请求会有问题，请切换登陆方式，把数据中的accessToken的值复制到输入框后点击登录，数据如下：</p>
      <iframe style=" width: 80%; height: 3rem; border:1px solid #eee;" :src="url" frameborder="0"></iframe>
    </div>
  </div>
</template>
<script>
  import http from '@/config/http'
  import {brandId, clientId, baseUrl2} from '@/config/config'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        url: '',
        loginType: 1,
        accessToken: '',
        userIndex: 0,
        list: [{
          userName: 98546,
          logo: '',
          pwd: 123456
        }, {
          userName: 70020368,
          logo: '',
          pwd: 123456
        }, {
          userName: 98547,
          logo: '',
          pwd: 123456
        }]
      }
    },
    components: {
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    mounted () {
      if (this.$store.getters.userInfo.accessToken) {
        this.$toast({
          msg: '您已经登录了',
          fn: () => {
            this.$router.replace('/')
          }
        })
      }
    },
    methods: {
      ...mapActions(['SET_USERINFO']),
      changeLoginType () {  // 登陆方式 1：账号密码登录，2：token登录
        this.url = ''
        this.loginType = this.loginType === 1 ? 2 : 1
      },
      changeUser () {
      },
      login () {
        // http://eapi.jiaofucloud.cn/gateway/oauth/v2/token?appVersionId=3.11.310&brandId=524726977&clientId=20000&osVersion=iOS__10.3.3&passWord=123456&phoneVersion=iPhone%206&userName=70020464
        if (this.loginType === 2) { // token登录
          if (this.accessToken.length < 20) {
            this.$toast('请输入有效token')
            return
          }
          this.$loading()
          http.getUserInfo({
            accessToken: this.accessToken,
            clientId,
            brandId,
            uin: this.list[this.userIndex].userName
          }).then(res => {
            this.$loading(false)
            if (typeof res !== 'object') {
              this.$toast('token验证失败，请重新输入')
              return
            }
            res.accessToken = this.accessToken
            this.SET_USERINFO(res)
            this.$toast({
              msg: '登录成功',
              fn: () => {
                this.$router.replace('/')
              }
            })
          })
          return
        }
        // 账号登录
        this.$loading()
        let param = {
          userName: this.list[this.userIndex].userName,
          passWord: this.list[this.userIndex].pwd,
          brandId,
          clientId,
          appVersionId: '3.11.31',
          phoneVersion: 'iPhone 6',
          osVersion: 'iOS__10.3.3'
        }
        http.token(param).then(res => {
          this.$loading(false)
          console.log(res)
          if (typeof res !== 'object' || !res.accessToken) {
            let url = baseUrl2 + 'gateway/oauth/v2/token?'
            for (let key in param) {
              url += key + '=' + param[key] + '&'
            }
            this.url = url
            this.$toast('登录失败')
            return
          }
          this.SET_USERINFO(res)
          this.$toast({
            msg: '登录成功',
            fn: () => {
              this.$router.replace('/')
            }
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .m-login{
    text-align: center; width: 80%; margin: 0 auto; position: relative; min-height: 100%;
    a{ color:#4fc68c;}
    .logo{ margin: 1.2rem auto; width: 1.5rem; height: 1.5rem; line-height: 1.5rem; border-radius: 50%; background: #09bb09; color:#fff;}
    .input-box{
      .u-username{ border: 0; position: absolute; background: #fff; display: block; width: 5.5rem; height: 0.8rem;z-index: 1;}
      .u-pwd{width: 100%; height: 0.6rem; border: 0; border-bottom: 1px solid #eee; position: relative; z-index: 1;}
    }
    .login-item{ max-height: 0; opacity: 0; overflow: hidden; transition: all 0.2s; position: relative;}
    .login-item.on{ max-height: 2rem; opacity: 1;}
    .u-token{ border: 1px solid #eee; padding: 0 0.1rem; background: #fff; display: block; width: 100%; height: 0.8rem;}
    .selector{ width:100%;text-align: left;}
    .btn-box{ text-align:center; margin-top: 0.5rem;}
    .btn-login{background: #4fc68c; color:#fff; width: 100%; height: 0.8rem; border-radius: 0.1rem;}
    .txt{color: #999; line-height: 0.6rem; margin-top: 0.5rem;}
    .bottom-txt{color: #999; line-height: 0.6rem; position: absolute; bottom: 0; width: 100%;}
  }
</style>
<style>
  .m-login .mu-select-field .mu-dropDown-menu{height: 0.8rem;}
  .m-login .mu-text-field-line{background-color: #eee;}
</style>


