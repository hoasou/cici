<template>
<div>
  <div class="payment">
    <Navigator title="支付详情" left='back' right=''></Navigator>
    <div class="m-info"><div class="m-info-con clearfix">
      <div class="img fl"><img src="../../../assets/images/bg-newbook.png" alt=""></div>
      <div class="info fl">
        <div class="title"><span v-html="payInfo.name"></span> <span class="tips">{{payInfo.price}}元每个</span></div>
        <p>数量：<span v-html="payInfo.num"></span></p>
        <p>合计：<span class="price">￥{{payInfo.price}}</span></p>
      </div>
    </div></div> 
    
    <div class="g-menu mt15">
      <div class="m-menu-head">
        <span></span>
        <h3><i></i> 支付方式</h3>
      </div>
      <div class="m-menu-body">
        <div class="li clearfix" :class="payType == 'wx' ? 'on' : ''" @click="selectPayType('wx')">
          <div class="radio fl"><i></i></div>
          <div class="payinfo fl">
            <h3>微信</h3>
            <p>推荐有微信账号用户使用</p>
          </div>
          <div class="payicon wx fr"></div>
        </div>
        <div class="li clearfix" :class="payType == 'zfb' ? 'on' : ''" @click="selectPayType('zfb')">
          <div class="radio fl"><i></i></div>
          <div class="payinfo fl">
            <h3>支付宝</h3>
            <p>推荐有支付宝账号用户使用</p>
          </div>
          <div class="payicon zfb fr"></div>
        </div>
        <div class="li clearfix" :class="payType == 'yl' ? 'on' : ''" @click="selectPayType('yl')">
          <div class="radio fl"><i></i></div>
          <div class="payinfo fl">
            <h3>银联</h3>
            <p>推荐所有银联储蓄卡、信用卡用户</p>
          </div>
          <div class="payicon yl fr"></div>
        </div>
      </div>
    </div>

    <mu-flat-button label="确定购买" class="u-btn-buy" @click="payment"></mu-flat-button>
  </div>
</div>
</template>
<script>
  import Navigator from '@/components/navigator/index'
  export default {
    data () {
      return {
        value: 'simple2',
        payType: 'wx',
        payInfo: this.$store.getters.payInfo
      }
    },
    components: {
      Navigator
    },
    methods: {
      selectPayType (type) {
        this.payType = type
      },
      payment () {
        this.$toast('暂不支持购买 （购买金额：' + this.payInfo.price + '）')
      }
    },
    created () {
      this.$loading()
    },
    mounted () {
      this.$loading(false)
      setTimeout(() => {
        if (!this.payInfo) {
          this.$router.go(-1)
        }
      })
    }
  }
</script>
<style lang="scss" scoped>
  .m-info{background: #f5f5f5;padding: 0.2rem; }
  .m-info-con{
    padding: 0.3rem 0.2rem; border-bottom: 1px solid #eee; background: #fff; border-radius: 0.1rem;box-shadow: 0 0 0.2rem #e6e6e6;
    .price{ color: red;font-size: 0.3rem;}
    .img{
      width: 1.5rem; height: 1.94rem; overflow: hidden; border-radius: 0.09rem;text-align: center;
      img{width: auto; height: 100%; border-radius: 0.09rem;background: #efefef;}
    }
    .info{margin-left: 0.3rem;width: 4.9rem;}
    .title{color: #333;line-height: 0.5rem;overflow: hidden;}
    p{color: #999; height: 0.6rem; line-height: 0.5rem; padding: 0.04rem 0; font-size: 0.26rem;}
    .tips{color: #999; font-size: 0.26rem;}
  }
  
  .g-menu{
    padding: 0.3rem 0.2rem; background: #fff;
    .m-menu-head{ 
      line-height: 0.35rem;
      i{width:0.08rem; height: 0.35rem; border-radius: 0.04rem; background: #52cd8f;display: inline-block; vertical-align: middle; margin-right: 0.1rem; }
      h3{ font-weight: 600; color: #333;}
      span{ float:right; color: #999;font-size: 0.26rem;}
    }
    .m-menu-body{
      margin-top: 0.34rem;
      .li{
        border: 1px solid #eee; border-radius: 0.1rem; padding: 0.1rem 0.2rem;margin-top:0.1rem;
        .radio{width: 0.46rem;height: 0.46rem;margin-top:0.15rem;border-radius: 50%;border: 1px solid #eee; padding: 0.10rem;}
        .radio i{transition: all 0.2s; transform: scale(2); border-radius: 50%;}
        &.on .radio i{ transform: scale(1);width: 100%; height: 100%;display: block; background: #52cd8f;}
        .payinfo{
          margin-left: 0.6rem; width: 4.8rem;
          h3{font-size: 0.3rem;}
          p{font-size: 0.24rem;color: #999;}
        }
        .payicon{width: 0.5rem; height: 0.5rem;margin-top:0.15rem;overflow: hidden; background: url(../../../assets/images/icon-wx.png) center no-repeat; background-size: contain;}
        .zfb{background-image: url(../../../assets/images/icon-zfb.png);}
        .yl{background-image: url(../../../assets/images/icon-yl.png);}
      }
    }
  }
</style>
<style lang="scss">
  .payment{
    .mu-flat-button.u-btn-buy{ 
      width: 100%; position: fixed; left: 0; bottom: 0; z-index: 99; background: #52cd8f; height: 1rem; text-align: center; line-height: 1rem; color: #fff;border-top: 1px solid #69ecaa;
    }
    .mu-flat-button.u-btn-buy .mu-flat-button-label{ font-size: 0.36rem;}
  }
</style>
