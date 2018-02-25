<template>
  <div><div class="ciwong-shop">
    <Navigator title="教辅书城" left="grade" right='search'></Navigator>
    <bottom-nav :show="true"></bottom-nav>
    <div v-if="!loading">
      <div class="g-shoptop">
        <swiper class="m-banner" :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item, k) in banners" :key="k"><a :href="item.linkAddress || '#'"><img :src="item.photo" alt=""></a></swiper-slide>
        </swiper>
        <ul class="m-recommond">
          <router-link to="service?applyType=3" class="li">
            <div class="img fl"><img :src="newBook.logo || '../../assets/images/bg-newbook.png'" alt=""></div>
            <div class="info fl">
              <div class="bookname">NEW 新书上架</div>
              <p v-html="newBook.serviceName"></p>
              <div class="btn"></div>
            </div>
          </router-link>
          <router-link to="service?applyType=2" class="li">
            <div class="img fl"><img :src="hotBook.logo || '../../assets/images/bg-redbook.png'" alt=""></div>
            <div class="info fl">
              <div class="bookname red">RED 热门推荐</div>
              <p v-html="hotBook.serviceName"></p>
              <div class="btn red"></div>
            </div>
          </router-link>
        </ul>
      </div>
      <div class="g-subject g-area clearfix">
          <!-- swiper -->
          <swiper :options="{slidesPerView: 6}" ref="mySwiper2">
            <!-- <swiper-slide><mu-flat-button label="全部" class="u-subjectname" to="goods?id=0" /></swiper-slide> -->
            <swiper-slide v-for="(item, k) in subjects" :key="k"><mu-flat-button :label="item.subjectName" class="u-subjectname" :to="'search?subjectId='+item.subjectId" /></swiper-slide>
            <swiper-slide></swiper-slide>
          </swiper>
      </div>
      <div class="g-book g-area">
        <div class="m-head clearfix">
          <div class="title fl"><i></i><span>精品书籍</span></div>
          <router-link to="service?applyType=4" class="fr">查看全部</router-link>
        </div>
          <!-- swiper -->
        <swiper class="m-booklist clearfix" :options="{slidesPerView: 4}" ref="mySwiper3">
          <swiper-slide v-for="(item, k) in goodBooks" :key="k"><router-link :to="'serviceDetail?serviceId='+item.serviceId+'&applyType=4'"><div class="img"><img :src="item.logo" alt=""></div><p v-html="item.serviceName"></p></router-link></swiper-slide>
          <swiper-slide></swiper-slide>
          <swiper-slide></swiper-slide>
        </swiper>
      </div>
      <div class="g-service g-area">
        <div class="m-head clearfix">
          <div class="title fl"><i></i><span>优质服务</span></div>
          <router-link to="service?applyType=5" class="fr">查看全部</router-link>
        </div>
        <ul class="m-servicelist">
          <li class="clearfix" v-for="(item, k) in goodServices" :key="k"><router-link :to="'serviceDetail?serviceId='+item.serviceId+'&applyType=5'"><div class="img fl"><img :src="item.logo" alt=""></div><div class="info fl"><div class="title" v-html="item.serviceName"></div><p>适用于：{{item.period}}</p><span>{{item.buyNum}}人已购买</span></div><div class="a fr"></div></router-link></li>
        </ul>
      </div>
    </div>
  </div></div>
</template>

<script>
  import http from '@/config/http'
  import { mapState } from 'vuex'
  import Navigator from '@/components/navigator/index'
  import bottomNav from '@/components/navigator/bottomNav'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  export default {
    data () {
      return {
        area: '8201', // 440306,8201
        gradeId: 0,   // 1107
        schoolId: '435896', // 274170,435896
        banners: null,
        newBook: null,
        hotBook: null,
        goodBooks: null,
        goodServices: null,
        subjects: null,
        swiperOption: {
          // 所有的参数同 swiper 官方 api 参数
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          }
        }
      }
    },
    components: {
      Navigator,
      bottomNav,
      swiper,
      swiperSlide
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      },
      ...mapState(['loading'])
    },
    methods: {
    },
    created () {
      this.$loading()
      http.getShopHomeInfo({
        area: this.area,
        gradeId: this.gradeId,
        schoolId: this.schoolId
      }).then(res => {
        this.$loading(false)
        if (typeof res !== 'object') {
          this.$toast('暂无信息')
          return
        }
        this.banners = res.banners
        this.newBook = res.newBook
        this.hotBook = res.hotBook
        this.goodBooks = res.goodBooks
        this.goodServices = res.goodServices
        this.subjects = res.subjects
      })
    }
  }
</script>

<style lang="scss" scoped>
  .ciwong-shop{ background: #f5f5f5;min-height: 100%;padding-bottom: 0.15rem;}
  .g-area{background: #fff;margin-top:0.15rem;}
  
  .g-shoptop{
    position: relative;left: 0;top: 0;height: 4.75rem;
    .m-banner{height: 3.2rem;overflow: hidden; text-align: center;}
    .m-banner img{height: 100%;}
    .m-recommond{
      position: absolute;bottom: 0;left: 0;width:7.2rem;height:1.93rem; padding:0.1rem; box-sizing: border-box; background: #fff;border-radius: 0.1rem;margin-left: 0.15rem; z-index: 1;
      .li{float: left; width:50%; overflow: hidden;}
      .img{width:1.2rem;height: 1.72rem;border-radius: 0.1rem;overflow: hidden;}
      .info{ margin-left: 0.2rem; width:2rem;}
      .info>p{ height: 0.6rem; line-height: 0.30rem; color: #515554; overflow: hidden; text-overflow: ellipsis;font-size: 0.26rem;}
      .bookname{color: #ffaa31;height: 0.52rem; line-height: 0.50rem; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
      .bookname.red{color: #f77178;}
      .btn{width: 1.04rem; height: 0.58rem; margin-top: 0.05rem; background: url(../../assets/images/btn-newbook.png) center no-repeat; background-size: 100%;}
      .btn:hover{opacity: 0.8;}
      .btn.red{background-image: url(../../assets/images/btn-redbook.png)}
    }
  }
  .g-subject{
     padding:0 0.15rem; width: 115%;
     .swiper-slide{ height: 0.8rem; line-height: 0.8rem;}
    // .subject-list{width:2000px;height: 100%;}
    .u-subjectname{
      display: inline-block;color: #afb3b2;min-width: 0.1rem;position: relative; left:0; top:0; vertical-align: middle;
    }
  }
  .m-head{
    height: 0.9rem; line-height: 0.9rem;font-size: 0.28rem; padding:0 0.1rem;
    a{color: #afb3b2;}
    .title{font-size: 0.32rem;font-weight: bold;color: #363c3a;}
    .title>*{vertical-align: middle;}
    .title i{display:inline-block; width: 0.08rem; margin-right: 0.2rem; height: 0.3rem;background: #4ec792;border-radius: 0.04rem;}
  }
  .g-book{
    .m-booklist{
      margin: 0 0.15rem;width: 100%;
      .swiper-slide{width: 1.96rem; float: left; margin:0 0.3rem 0.2rem 0;}
      .img{width: 100%; height: 2.8rem; }
      p{line-height: 0.34rem; height: 0.66rem; overflow: hidden; margin: 0.1rem 0;text-align:center;}
    }
  }
  .m-servicelist{
    margin: 0 0.15rem;
    li{ padding-bottom: 0.3rem; border-bottom: 1px solid #eee; margin-top: 0.3rem;}
    .info{margin-left: 0.3rem;width: 4.2rem;}
    .img{width: 1.5rem; height: 1.5rem; overflow: hidden; border-radius: 0.09rem;background: #efefef;
      img{width: 100%; height: 100%;}
    }
    .title{color: #555756;}
    p{color: #afb3b2; height: 0.6rem; line-height: 0.3rem; padding: 0.04rem 0; font-size: 0.26rem;}
    span{color: #4ec792;}
    .a{width: 0.5rem; height: 0.5rem; line-height: 0.5rem; border-radius: 50%;margin-top: 0.5rem; color: #fff; text-align: center; background:  url(../../assets/images/icon-v.png) center #4ec792 no-repeat; background-size: 0.3rem 0.18rem; transform: rotate(-90deg);}
  }

</style>
