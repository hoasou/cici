<template>
  <div>
    <Navigator title="作业" left="/member/setup" leftTitle="消息"></Navigator>
    <bottom-nav :show="true"></bottom-nav>
    <p style="text-align:center; margin:100px 0;color:#999;">您暂无作业哦~</p>
  </div>
</template>
<script>
  import Navigator from '@/components/navigator'
  import bottomNav from '@/components/navigator/bottomNav'
  export default {
    data () {
      return {}
    },
    components: {
      Navigator,
      bottomNav
    }
  }
</script>