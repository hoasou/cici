<template>
  <div class="m-back" @click="back">&nbsp;</div>
</template>
<script>
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {}
    },
    methods: {
      back () {
        this.SET_SLIDE('right')
        this.$router.go(-1)
      },
      ...mapMutations([
        'SET_SLIDE'
      ])
    },
    mounted () {
    }
  }
</script>
<style lang="scss" scoped>
  .m-back{
    vertical-align: middle;display: inline-block; width: 80%; height: 100%; background: url(../../../assets/images/back.png) left no-repeat; background-size: 0.16rem 0.3rem;
  }
</style>