<template>
  <div>
    <transition :name="transitionName">
        <router-view class="child-view"/>
      <!-- <keep-alive include="home">
      </keep-alive> -->
    </transition>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { routerTransition } from '../../utils/filter'
  export default {
    data () {
      return {
        transitionName: 'slide-right'
      }
    },
    watch: {
      '$route' (to, from) {
        this.transitionName = routerTransition(to, from, this.slideDrection)
        setTimeout(() => {
          if (this.slideDrection === 'right') {
            this.SET_SLIDE('left')
          }
        }, 0)
      }
    },
    computed: {
      ...mapState(['slideDrection'])
    },
    methods: {
      ...mapMutations(['SET_SLIDE'])
    },
    mounted () {
      this.SET_SLIDE('left')
    }
  }
</script>

<style lang="scss" scoped>
  // transition
  .child-view {
		width: 100%;
		position: fixed;
		overflow: auto;
		overflow-x: hidden;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
    padding-bottom: 0.96rem;
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }

</style>
