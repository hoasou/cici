<template>
  <div>
    <mu-bottom-nav v-if="show===true || show===undefined" class="g-bottomnav" :value="bottomNav" @change="handleChange">
      <mu-bottom-nav-item value="works" title="作业"  to="/works" titleClass="title-works"/>
      <mu-bottom-nav-item value="shop" title="教辅书城" to="/shop/home" titleClass="title-shop"/>
      <mu-bottom-nav-item value="member" title="我" to="/member/home" titleClass="title-member"/>
    </mu-bottom-nav>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        bottomNav: 'works'
      }
    },
    props: ['show'],
    watch: {
      '$route' (to) {
        if (to.path !== '/') {
          this.handleChange(to.path.split('/')[1])
        }
      }
    },
    methods: {
      handleChange (val) {
        this.bottomNav = val
      }
    },
    mounted () {
      if (this.$route.path !== '/') {
        this.handleChange(this.$route.path.split('/')[1])
      }
    }
  }
</script>

<style lang="scss">
  .g-bottomnav.mu-bottom-nav{
    width: 100%; height:0.96rem; position: fixed;bottom:0;left: 0;z-index: 999;border-top: 1px solid #eee; color: #a9b2ad;
    .mu-buttom-item{ padding: 0;}
    .mu-bottom-item-text{padding-top: 0.54rem;font-size: 0.24rem;}
    .mu-bottom-item-active .mu-bottom-item-text{ color: #4fc68c;font-size: 0.26rem; }
    .mu-bottom-item-text::after{content: '';position: absolute;left: 0;top: 0.1rem;width: 100%;height: 100%;background: center top no-repeat; background-size: auto 0.44rem;}
    .mu-bottom-item-active .mu-bottom-item-text::after{top: 0.08rem; background-size: auto 0.46rem;}
    .title-works::after{background-image: url(../../assets/images/nav-work1.png)}
    .mu-bottom-item-active .title-works::after{background-image: url(../../assets/images/nav-work2.png)}
    .title-shop::after{background-image: url(../../assets/images/nav-shop1.png)}
    .mu-bottom-item-active .title-shop::after{background-image: url(../../assets/images/nav-shop2.png)}
    .title-member::after{background-image: url(../../assets/images/nav-me1.png)}
    .mu-bottom-item-active .title-member::after{background-image: url(../../assets/images/nav-me2.png)}
  }
</style>
