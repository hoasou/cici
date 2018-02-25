<template>
  <div>
    <Navigator :title="title" left='back' right=''></Navigator>
    <ul class="m-servicelist">
      <li class="clearfix" v-for="(item, k) in list" :key="k"><router-link :to="'serviceDetail?serviceId='+item.serviceId+'&applyType='+applyType"><div class="img fl"><img :src="item.logo" alt=""></div><div class="info fl"><div class="title" v-html="item.serviceName"></div><p>适用于：{{item.period}}</p><span>{{item.buyNum}}人已购买</span></div><div class="a fr"></div></router-link></li>
    </ul>
  </div>
</template>
<script>
  import http from '@/config/http'
  import Navigator from '@/components/navigator/index'
  export default {
    data () {
      return {
        applyType: this.$route.query.applyType,
        title: '',
        area: '8201',
        gradeId: '0',
        subjectId: this.$route.query.subjectId || 0,
        schoolId: '435896',
        list: []
      }
    },
    components: {
      Navigator
    },
    created () {
      this.title = this.applyType === '5' ? '全部服务' : this.applyType === '4' ? '精品书籍' : this.applyType === '3' ? '新书上架' : this.applyType === '2' ? '热门推荐' : '全部商品'
      this.$loading()
      http.get_shop_advservers({
        area: this.area,
        schoolId: this.schoolId,
        applyType: this.applyType,
        gradeId: this.gradeId,
        pIndex: 1,
        psize: 20,
        subjectId: this.subjectId
      }).then(res => {
        console.log('service: ', res)
        this.$loading(false)
        this.list = res.pageList
      })
    }
  }
</script>
<style lang="scss" scoped>
  .m-servicelist{
    margin: 0 0.15rem;
    li{ padding-bottom: 0.3rem; border-bottom: 1px solid #eee; margin-top: 0.3rem;}
    .info{margin-left: 0.3rem;width: 4.2rem;}
    .img{width: 1.5rem; min-height:1.5rem; overflow: hidden; border-radius: 0.09rem;background: #efefef;
      img{width: 100%; height: auto;}
    }
    .title{color: #555756;}
    p{color: #afb3b2; height: 0.6rem; line-height: 0.3rem; padding: 0.04rem 0; font-size: 0.26rem;}
    span{color: #4ec792;}
    .a{width: 0.5rem; height: 0.5rem; line-height: 0.5rem; border-radius: 50%;margin-top: 0.5rem; color: #fff; text-align: center; background:  url(../../../assets/images/icon-v.png) center #4ec792 no-repeat; background-size: 0.3rem 0.18rem; transform: rotate(-90deg);}
  }
</style>
