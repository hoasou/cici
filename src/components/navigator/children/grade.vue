<template>
  <div class="m-grade">
    <p class="fl" @click="$toast('该功能暂未开放')">九年级</p> 
    <div class="ml10 grade-v"></div>
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
  .m-grade{
    vertical-align: middle;
    .grade-v{ display: inline-block; width: 0.2rem; height: 0.12rem; background: url(../../../assets/images/grade-v.png) center no-repeat; background-size: 100%;}
  }
</style>

