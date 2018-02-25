<template>
  <div class="m-order">
    <Navigator title="我的订单" left='back' right=''></Navigator>
    <mu-list>
      <mu-list-item title="已完成订单">
        <mu-icon slot="right" value="navigate_next"/>
      </mu-list-item>
      <mu-list-item title="未完成订单">
        <mu-icon slot="right" value="navigate_next"/>
      </mu-list-item>
      <mu-list-item title="生效的订单">
        <mu-icon slot="right" value="navigate_next"/>
      </mu-list-item>
    </mu-list>

  </div>
</template>
<script>
  import Navigator from '@/components/navigator/index'
  export default {
    data () {
      return {}
    },
    components: {
      Navigator
    }
  }
</script>
<style lang="scss">
  .m-order{
    .mu-list{ padding: 0 0.2rem;}
    .mu-item{border-bottom: 1px solid #e7e7e7;
      p{text-align: right;}
    }
  }
</style>
