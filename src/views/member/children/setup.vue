<template>
  <div class="m-setup">
    <Navigator title="设置" left='back' right=''></Navigator>
    <mu-list>
      <mu-list-item title="个人信息" to="userinfo">
        <mu-icon slot="right" value="navigate_next"/>
      </mu-list-item>
      <mu-list-item title="网络测速">
        <mu-icon slot="right" value="navigate_next"/>
      </mu-list-item>
      <mu-list-item title="版本更新" afterText="v2.11.301">
      </mu-list-item>
      <mu-list-item title="关于演示版">
        <mu-icon slot="right" value="navigate_next"/>
      </mu-list-item>
    </mu-list>
    
    <mu-raised-button label="退出登录" class="btn-login" @click="login"/>
  </div>
</template>
<script>
  import Navigator from '@/components/navigator/index'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {}
    },
    components: {
      Navigator
    },
    methods: {
      ...mapActions(['DIALOG_OPEN']),
      login () {
        this.DIALOG_OPEN({
          content: '您确定要退出吗？',
          title: '提示',
          confirmFn: () => {
            this.$store.commit('LOGOUT')
            this.$toast('您已退出登录，请重新登录')
            this.$router.replace('/member/login')
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .m-setup{
    .btn-login{background: #f17474; color:#fff; width: 80%; margin: 0.5rem auto; height: 0.8rem; border-radius: 0.1rem;display: block; box-shadow: 0 0 0.2rem #f17474;}
    .mu-list{ padding: 0 0.2rem;}
    .mu-item{border-bottom: 1px solid #e7e7e7;
      p{text-align: right;}
    }
  }
</style>
