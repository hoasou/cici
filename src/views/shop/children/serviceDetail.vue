<template>
<div>
  <div class="page1">
    <Navigator :title="applyType == 5 ? '服务详情' : '书籍详情'" left='back' right='tel'></Navigator>
    <div class="m-toptip">
      <!-- 试用中 <strong>2018-02-07</strong> 到期 -->
      未购买
    </div>
    <div class="m-info clearfix">
      <div class="img fl"><img :src="data.logo" alt=""></div>
      <div class="info fl">
        <div class="title" v-html="data.name"></div>
        <p>适用于：<span v-html="data.gradeName || data.period"></span></p>
      </div>
    </div>
    <div class="g-price mt15">
      <div class="m-price-head">
        <p>(已有<span v-html="data.buycount || 0"></span>人购买)</p>
        <h3><i></i> 价格</h3>
      </div>
        <!-- swiper -->
      <swiper class="m-price-body clearfix" :options="{slidesPerView: 3}">
        <swiper-slide v-for="(item, k) in data.trial" :key="'trial'+k" v-if="item.trlalsum !== 0"><div class="price-btn" :class="checkedPriceObj.type === 'trial' && checkedPriceObj.index === k ? 'on' : ''" @click="checkedPrice(k, 'trial')">
          <div class="day"><span v-html="item.trlalsum"></span><p>天</p></div>
          <div class="number">免费体验</div>
        </div></swiper-slide>

        <swiper-slide v-for="(item, k) in data.price" :key="k" v-if="item.price !== 0"><div class="price-btn" :class="checkedPriceObj.type === 'price' && checkedPriceObj.index === k ? 'on' : ''" @click="checkedPrice(k, 'price')">
          <div class="day"><span v-html="item.unit"></span><p>个月</p></div>
          <div class="number">￥<span v-html="parseFloat(item.price).toFixed(2)"></span></div>
        </div></swiper-slide>
        <swiper-slide v-else @click="checkedPrice(k, 'trial')"><div class="price-btn price-btn2" :class="checkedPriceObj.type === 'trial' && checkedPriceObj.index === k ? 'on' : ''">免费获取</div></swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
    </div>

    <div class="g-detail-content mt15">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" title="内容介绍"/>
        <mu-tab value="tab2" title="内容目录"/>
      </mu-tabs>
      <div class="tab-item" v-if="activeTab === 'tab1'">
        <p v-html="data.desc"></p>
        <div v-for="(item, k) in data.photos" :key="k">
          <img :src="item.url" :alt="item.name" />
        </div>
      </div>
      <div class="tab-item" v-if="activeTab === 'tab2'">
          <mu-list>
            <mu-list-item title="单元1">
            </mu-list-item>
            <mu-list-item title="单元2">
            </mu-list-item>
            <mu-list-item title="单元3" toggleNested>
              <mu-list-item slot="nested" title="章节1">
              </mu-list-item>
              <mu-list-item slot="nested" title="章节2" toggleNested>
                <mu-list-item title="小节1" slot="nested">
                </mu-list-item>
              </mu-list-item>
              <mu-list-item slot="nested" title="章节3" toggleNested>
                <mu-list-item title="小节1" slot="nested">
                </mu-list-item>
              </mu-list-item>
            </mu-list-item>
          </mu-list>
      </div>
    </div>

    <mu-flat-button :label="checkedPriceObj.type === 'price' ? '立即购买' : '免费体验'" class="u-btn-buy" @click="checkout"></mu-flat-button>
  </div>
</div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import http from '@/config/http'
  import Navigator from '@/components/navigator/index'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  export default {
    data () {
      return {
        applyType: this.$route.query.applyType,
        activeTab: 'tab1',
        data: {},
        checkedPriceObj: {
          type: 'price',
          index: 0
        }
      }
    },
    components: {
      Navigator,
      swiper,
      swiperSlide
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val
      },
      // 获取书籍详情
      get_epage_Service () {
        http.get_epage_Service({
          serviceId: this.$route.query.serviceId // '5502' || '5432'
        }).then(res => {
          this.$loading(false)
          console.log('serviceDetail: ', res[0])
          this.data = res[0]
          this.checkedPriceObj.type = (this.data.trial.length > 0 && this.data.trial[0].trlalsum > 0) || (this.data.price.length > 0 && this.data.price[0].price === 0) ? 'trial' : 'price'
        })
      },
      checkedPrice (index, type) {
        this.checkedPriceObj = {type, index}
      },
      checkout () {
        if (this.checkedPriceObj.type === 'price') {
          this.SET_PAYINFO({
            name: this.data.name,
            logo: this.data.logo,
            num: 1,
            price: this.data[this.checkedPriceObj.type][this.checkedPriceObj.index].price || 0
          })
          this.$router.push('payment')
        } else {
          let day = this.data[this.checkedPriceObj.type][this.checkedPriceObj.index].trlalsum
          this.$toast('获得成功，您可以享受' + (day ? day + '天的' : '') + '免费体验')
          setTimeout(() => {
            this.$router.replace('/shop/home')
          }, 2000)
        }
      },
      ...mapMutations(['SET_PAYINFO'])
    },
    created () {
      this.$loading()
      this.get_epage_Service()
    }
  }
</script>
<style lang="scss" scoped>
  .page1{background: #f5f5f5;}
  .m-toptip{line-height: 0.9rem; text-align: center; color: #ff7070;}
  .m-info{
    padding: 0.3rem 0.2rem; border-bottom: 1px solid #eee; background: #fff;
    .info{margin-left: 0.3rem;width: 5.3rem;}
    .img{width: 1.36rem; min-height: 1.36rem; overflow: hidden;background: #efefef; border-radius: 0.09rem;
      img{width: 100%; height: auto; border-radius: 0.09rem;display:block;}
    }
    .title{color: #333;height: 1.4rem;overflow: hidden;}
    p{color: #666; height: 0.6rem; line-height: 0.3rem; padding: 0.04rem 0; font-size: 0.26rem;}
  }
  .g-price{
    padding: 0.3rem 0.2rem; background: #fff;
    .m-price-head{ 
      line-height: 0.35rem;
      i{width:0.08rem; height: 0.35rem; border-radius: 0.04rem; background: #52cd8f;display: inline-block; vertical-align: middle; margin-right: 0.1rem; }
      h3{ font-weight: 600; color: #333;}
      p{ float:right; color: #999;font-size: 0.26rem;}
    }
    .m-price-body{
      margin-top: 0.34rem; width: 114%;
      .swiper-slide{width: 2.68rem!important;}
      .price-btn{
        transition: all 0.2s; text-align: center; color: #52cd8f; width: 2.68rem; height: 1.28rem; padding: 0.08rem 0.18rem 0.2rem 0.1rem; background: url(../../../assets/images/btn-price1-1.png) center no-repeat; background-size:contain; overflow: hidden;
        .day{float:left; width: 0.85rem; line-height: 0.36rem; padding-top: 0.1rem; font-size: 0.24rem;}
        .day span{ font-size: 0.36rem;}
        span{ font-weight: bold;display: inline-block;}
        .number{float:right; width: 1.5rem; line-height: 1rem;}
      }
      .price-btn.on{background-image: (url(../../../assets/images/btn-price1-2.png)); color: #fff;}
      .price-btn2{line-height: 1rem; background-image: (url(../../../assets/images/btn-price2-1.png));}
      .price-btn2.on{background-image: (url(../../../assets/images/btn-price2-2.png));}
    }
  }

  .g-detail-content{
    background: #fff; width: 100%; min-height:5rem;
    .mu-tabs{
      background: #fff; color: #52cd8f;border-bottom: 1px solid #eee;
      .mu-tab-link{color:#999;}
      .mu-tab-active{color:#52cd8f;}
    }
    .tab-item{ padding-top: 0.2rem;}
  }
</style>
<style lang="scss">
  .page1{
    .mu-tabs .mu-tab-link-highlight{background-color: #52cd8f;}
    .mu-flat-button.u-btn-buy{ 
      width: 100%; position: fixed; left: 0; bottom: 0; z-index: 99; background: #52cd8f; height: 1rem; text-align: center; line-height: 1rem; color: #fff;border-top: 1px solid #69ecaa;
    }
    .mu-flat-button.u-btn-buy .mu-flat-button-label{ font-size: 0.36rem;}
  } 
</style>

