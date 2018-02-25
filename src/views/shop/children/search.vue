<template>
  <div>
    <Navigator :title="title" left='back' right=''></Navigator>
    <div class="search-box" v-if="pageType==='1'">
      <input placeholder="搜索书籍" fullWidth v-model="keyWords" />
      <div class="btn" @click="search"></div>
    </div>
    <ul class="m-servicelist">
      <li class="clearfix" v-for="(item, k) in list" :key="k"><router-link :to="'serviceDetail?serviceId='+item.serviceId+'&applyType='+applyType"><div class="img fl"><img :src="item.logo" alt=""></div><div class="info fl"><div class="title" v-html="item.serviceName"></div><p>适用于：{{item.period}}</p><span>{{item.buyNum}}人已购买</span></div><div class="a fr"></div></router-link></li>
    </ul>
    <div class="no-information" v-if="list.length == 0">暂无信息</div>
  </div>
</template>
<script>
  import http from '@/config/http'
  import Navigator from '@/components/navigator/index'
  export default {
    data () {
      return {
        pageType: this.$route.query.pageType, // 1:搜索页，其他：学科列表页
        title: '',
        area: '8201',
        schoolId: '435896',
        gradeId: '0',
        salesType: 2,
        applyType: this.$route.query.applyType || '',
        subjectId: this.$route.query.subjectId || 0,
        keyWords: this.$route.query.keyWords || '',
        list: []}
    },
    components: {
      Navigator
    },
    methods: {
      search () {
        console.log(111)
        this.getList()
      },
      getList () {
        this.$loading()
        http.get_shop_servers({
          area: this.area,
          schoolId: this.schoolId,
          gradeId: this.gradeId,
          salesType: this.salesType,
          subjectId: this.subjectId,
          keyWords: this.keyWords,
          pIndex: 1,
          psize: 20
        }).then(res => {
          console.log('service: ', res)
          this.$loading(false)
          this.list = res.pageList
        })
      }
    },
    created () {
      this.title = this.pageType === '1' ? '搜索' : '全部商品'
      this.getList()
    }
  }
</script>
<style lang="scss" scoped>
  .search-box{
    position: relative; width: 80%; height: 0.8rem; margin: 0.3rem auto 0; background: #eee; border-radius: 0.1rem; padding: 0 0.2rem;box-shadow: 0 0.04rem 0.1rem #c7bebe inset; overflow: hidden;
    input{ border: 0; width: 100%; height: 100%; display: block; background: none;}
    .btn{ position: absolute; right: 0; top: 0; width: 1rem; height: 100%; background: url(../../../assets/images/search.png) center no-repeat; background-size: 0.33rem 0.33rem; border-radius: 0 0.1rem 0.1rem 0; background-color: #757474; border-left: 1px solid #dcd9d9; }
  }
  .no-information{text-align: center; color: #999; margin: 0.5rem 0;}
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

