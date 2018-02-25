<template>
<div class="g-topnav" :class="skin=='white'?'whiteskin':''">
  <div class="g-topnav-con">
      <div class="m-nav-left">
        <Back v-if="left=='back'"></Back>
        <Grade v-else-if="left=='grade'"></Grade>
        <div v-else>
          <router-link :to="left" v-if="left">{{leftTitle}}</router-link>
        </div>
      </div>
      <div class="m-nav-title" v-text="title"></div>
      <div class="m-nav-right">
        <Search v-if="right=='search'"></Search>
        <Tel v-else-if="right=='tel'"></Tel>
        <router-link :to="right" v-else-if="right">{{rightTitle}}</router-link>
      </div>
  </div>
</div>
</template>
<script>
  import Grade from '@/components/navigator/children/grade'
  import Search from '@/components/navigator/children/search'
  import Back from '@/components/navigator/children/back'
  import Tel from '@/components/navigator/children/tel'
  export default {
    data () {
      return {
      }
    },
    props: ['title', 'left', 'leftTitle', 'right', 'rightTitle', 'skin'],
    components: {
      Grade,
      Search,
      Back,
      Tel
    },
    methods: {
      getRightTitle () {
        let title = this.rTitle || ''
        let str = decodeURIComponent(this.rightLink)
        if (!title && str) {
          let arr = str.match(/title=([^&]+)?/)
          if (arr) title = arr[1]
          // title = str.split('/')[2]
        }
        return title
      }
    },
    // watch: {
    //   '$route.query.to' (val) {
    //     // location.reload()
    //     this.centerTitle = this.$route.query.title
    //     this.rightLink = val
    //     this.rTitle = this.getRightTitle()
    //   },
    //   'centerTitle' (val) {
    //     if (val === this.rTitle) {
    //       this.rightLink = null
    //     }
    //   }
    // },
    computed: {
    },
    mounted () {
      // this.$nextTick(() => {
      //   this.rightLink = this.right
      //   console.log(23, this.rightLink)
      //   this.rTitle = this.getRightTitle()
      // })
    }
  }
</script>

<style lang="scss">
.g-topnav{
  height: 44px;position: relative;
  &.whiteskin {
    height: 0;
    .g-topnav-con{
      background: none;
      border-width: 0;
      color: #fff;
      position: absolute;
      a{color: #fff;}
      .m-back{background-image: url(../../assets/images/back2.png);}
    }
  }

  .g-topnav-con{
    line-height: 44px;
    border-bottom: 1px solid #EAE8E8;
    width: 100%;
    height: 44px;
    vertical-align: top;
    overflow: visible;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 9999;

    
    .m-nav-left,.m-nav-right{
      display: inline-block;
      overflow: hidden;
      width: 25%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 0.2rem;
      vertical-align: top;
      float: left;
      font-size: 0.30rem;
    }
    .m-nav-right{
      text-align: right;
      float: right;
      a{display: block; width: 100%; height: 100%;}
    }
    .m-nav-title{
      display: inline-block;
      text-align: center;
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.36rem;
      vertical-align: top;
      font-weight: 600;
    }
    
    .search{float:right;width:0.5rem;height: 0.8rem;vertical-align: middle; background: url(../../assets/images/search.png) center no-repeat; background-size: 0.34rem 0.34rem;}
  }
}
</style>
