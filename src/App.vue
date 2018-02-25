<template>
  <div class="app-box">
    <transition :name="transitionName">
      <router-view class="routeView"/>
    </transition>
    
    <Dialogs></Dialogs>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { routerTransition } from './utils/filter'
  import Dialogs from '@/components/dialogs/index'
  export default {
    data () {
      return {
        // bottomNavShow: true,
        transitionName: 'pageTransition'
      }
    },
    components: {
      Dialogs
    },
    watch: {
      '$route' (to, from) {
        this.checkLoginState()
        // this.bottomNavShow = to.path === '/works' || to.path === '/shop/home' || to.path === '/member/home' ? true : false
        this.transitionName = routerTransition(to, from, this.slideDrection)
        this.LOADING_UPDATE(false)
        setTimeout(() => {
          if (this.slideDrection === 'right') {
            this.SET_SLIDE('left')
          }
        }, 0)
      }
    },
    methods: {
      checkLoginState () {
        if (window.location.hash.indexOf('/member/login') === -1 && (!this.userInfo || !this.userInfo.accessToken)) {
          this.$toast({
            msg: '您还未登录，请先登录再操作',
            delay: 3000,
            fn: () => {
              this.$router.replace('/member/login')
            }
          })
        }
      },
      ...mapActions(['LOADING_UPDATE']),
      ...mapMutations(['SET_SLIDE'])
    },
    computed: {
      ...mapState(['slideDrection', 'userInfo'])
    },
    mounted () {
      this.$nextTick(() => {
        this.checkLoginState()
      })
    }
  }
</script>

<style lang="scss">
	#app {
		position: relative;
		height: 100%;
	}
  // transition

	.routeView {
		width: 100%;
		margin: auto;
		position: fixed;
		overflow: auto;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
    transition: all .5s cubic-bezier(.55,0,.1,1);
	}
	.routeView::-webkit-scrollbar {
		display: none;
	}
	.pageTransition-enter-active, .pageTransition-leave-active {
		opacity: 1;
		backface-visibility: hidden;
		transition: all 0.4s;
		transform-origin: 50% 0;
		transform: translateZ(0);
		transform-style: preserve-3d;
	}
	.pageTransition-enter{
		opacity: 0;
		transform: translateY(1.50rem);
	}
	.pageTransition-leave-active {
		opacity: 0;
		transform: translateY(-0.50rem) scale(0.9,0.9);
	}

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
</style>
