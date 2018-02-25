<template>
  <div class="member-box">
    <Navigator title="我" right="/member/setup" rightTitle="设置" skin='white'></Navigator>
    <bottom-nav :show="true"></bottom-nav>
    <div class="g-banner" style="">
      <div class="m-userinfo" v-if="userInfo">
        <router-link class="img" to="userinfo" tag="div"><img :src="userInfo.avatar || './static/images/default-head-img.png'" alt=""/></router-link>
        <div class="classinfo">
          <h3><span v-html="userInfo.realName || userInfo.nickName"></span> <span v-html="userInfo.userId"></span></h3>
          <p v-if="userInfo.classes.length>0"><span v-html="userInfo.classes[0].schoolName">深圳高级中学</span> <span v-html="userInfo.classes[0].className">九年级</span></p>
        </div>
        <div class="user-level">VIP</div>
      </div>
    </div>
    <div class="g-quicklink">
      <router-link class="li order" to="/member/order">我的订单</router-link>
      <router-link class="li score" :to="'/framePage?title=我的成绩&to='+encodeURIComponent('https://m.teacher.jiaofuyun.com/v1712_chuju/statistical/index.html?clientId=100027&userId=98505&brandId=570678343')" right="">我的成绩</router-link>
      <div class="li saoyisao" @click="saoyisao">扫一扫</div>
    </div>
    <div class="g-menu">
      <mu-flat-button class="li" @click="openStudySheet"><a><span>学习设置</span><div class="right"><img src="../../assets/images/into.png" alt=""></div></a></mu-flat-button>
      <mu-flat-button class="li" @click="openCacheSheet"><a href=""><span>清除缓存</span><div class="right"><img src="../../assets/images/into.png" alt=""></div></a></mu-flat-button>
      <mu-flat-button class="li" :to="'/framePage?title=常见问题&to='+encodeURIComponent('https://m.teacher.jiaofuyun.com/v1707_haitangban/FAQ/?brandId=524726977')"><a><span>常见问题</span><div class="right"><img src="../../assets/images/into.png" alt=""></div></a></mu-flat-button>
      <mu-flat-button class="li" href="tel:400-800-5500"><div class="tel"><span>客服电话</span><div class="right">400-800-5500</div></div></mu-flat-button>
    </div>
    <!-- 学习设置弹出框 -->
    <mu-bottom-sheet :open="studySheet" @close="closeStudySheet" sheetClass="m-studysheet">
      <div class="item">
        <p>听说模考</p>
        <mu-switch v-model="listenAndSpeakToggle" label="播放题型模板音频" labelLeft class="item-switch" />
      </div>
      <div class="item">
        <p>同步跟读</p>
        <mu-switch v-model="readingToggle" label="单个次/句完成跟读后评论" labelLeft class="item-switch" />
      </div>
    </mu-bottom-sheet>
    <!-- 清除缓存弹出框 -->
    <mu-bottom-sheet :open="cacheSheet" @close="closeCacheSheet">
      <mu-list @itemClick="closeCacheSheet">
        <mu-sub-header>
          确定需要清除的选项
        </mu-sub-header>
        <mu-list-item title="离线包文件"/>
        <mu-list-item title="视频文件"/>
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import Navigator from '@/components/navigator/index'
  import bottomNav from '@/components/navigator/bottomNav'
  export default {
    data () {
      return {
        userInfo: null,
        listenAndSpeakToggle: true,
        readingToggle: true,
        cacheSheet: false,
        studySheet: false
      }
    },
    components: {
      Navigator,
      bottomNav
    },
    methods: {
      closeStudySheet () {
        this.studySheet = false
      },
      openStudySheet () {
        this.studySheet = true
      },
      closeCacheSheet () {
        this.cacheSheet = false
      },
      openCacheSheet () {
        this.cacheSheet = true
      },
      saoyisao () {
        this.DIALOG_OPEN({
          content: '敬请期待',
          title: '提示',
          confirmFn: () => this.DIALOG_OPEN({content: '点击了确定', confirmFn: () => this.TOAST('最后回调函数是轻提示')}),
          cancelFn: () => this.TOAST('点击了取消')
        })
      },
      ...mapActions(['TOAST', 'DIALOG_OPEN'])
    },
    mounted () {
      this.userInfo = this.$store.getters.userInfo
      console.log(this.userInfo)
    }
  }
</script>
<style lang="scss" scoped>
    .member-box{
      background: #f5f5f5;
    }
    .g-banner{
      position: relative; width: 100%; height: 4.9rem; background: #6ae46b url(../../assets/images/me-defaultbg.png) center no-repeat; background-size: cover;
      .m-userinfo{
        position: absolute; bottom: 0.5rem; left: 0; color: #fff;padding: 0 0.2rem;
        &>div{float: left;}
        .img{width:1.2rem;height: 1.2rem; overflow: hidden; border-radius: 50%;background: #fff;box-shadow: 0 0.14rem 0.14rem #4cca4e;}
        .img img{width: 100%;height: 100%;display: block;}
        .classinfo{
          margin-left: 0.2rem;line-height: 0.6rem; width: 5rem; text-shadow: 0 0.02rem 0.04rem #3eab3f;
          &>*{ white-space: nowrap; text-overflow: ellipsis;overflow: hidden;}
        }
        .user-level{ width: 0.53rem; height: 0.26rem; line-height: 0.3rem; text-align: center; background: #f67177; border-radius: 0.13rem; margin-top: 0.14rem;font-size: 0.2rem;}
      }
    }
    .g-quicklink{
      padding: 0.3rem;
      background: #fff;
      padding-left: 0.75rem;
      .li{
        width: 1.75rem;
        display: inline-block;
        padding-top: 1.1rem;
        line-height: 0.4rem;
        background: url(../../assets/images/me-quicklink1.png) center top no-repeat;
        background-size: 1rem;
        text-align: center;
        &.order{background-image: url(../../assets/images/me-quicklink1.png);}
        &.score{background-image: url(../../assets/images/me-quicklink2.png);}
        &.saoyisao{background-image: url(../../assets/images/me-quicklink3.png);}
      }
    }
    .g-menu{
      margin-top: 0.15rem;background: #fff;
      .li{
        width:100%; height: 0.88rem;line-height: 0.88rem;padding: 0 0.15rem; border-bottom: 1px solid #e7e7e7;display: block;
        a,.tel{display: block; width: 100%;}
        span{float: left; padding-left: 0.6rem; background: url(../../assets/images/me-menu1.png) left center no-repeat; background-size: 0.33rem;}
        .right{float: right;color: #7e8888;}
        .right img{height: 0.2rem;}
        &:nth-child(2) span{background-image: url(../../assets/images/me-menu2.png); }
        &:nth-child(3) span{background-image: url(../../assets/images/me-menu3.png); }
        &:nth-child(4) span{background-image: url(../../assets/images/me-menu4.png); }
      }
    }
</style>

<style lang="scss">
    .m-studysheet.mu-bottom-sheet{
      padding: 0.2rem;
      p{color: #999; font-size:0.28rem; line-height: 0.4rem; padding: 0.1rem 0; }
      .item-switch{
        border: 1px solid #e7e7e7; border-radius:0.07rem;display: block; padding: 0.2rem; height:auto;line-height: 0.4rem;
        .mu-switch-wrapper{height:100%;}
      }
    }
</style>

