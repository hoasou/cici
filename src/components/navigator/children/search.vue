<template>
  <div>
    <router-link class="m-search" to="/shop/search?pageType=1">&nbsp;</router-link>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style lang="scss" scoped>
  .m-search{ 
    display: inline-block; width: 0.8rem;  background: url(../../../assets/images/search.png) right 0.1rem center no-repeat; background-size: 0.33rem 0.33rem;
  }
</style>

