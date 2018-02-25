<template>
  <div>
    <Navigator id="navigator1" :title="pageTitle" left='back' :right="right" :rightTitle="rightTitle"></Navigator>
    <iframe id="framepage1" name="framepage1" :src="$route.query.to" frameborder="0"></iframe>
  </div>
</template>
<script>
  import Navigator from '@/components/navigator'
  import {baseUrl, brandId, clientId} from '@/config/config'
  export default {
    data () {
      return {
        pageTitle: this.$route.query.title || this.title,
        right: '',
        rightTitle: ''
      }
    },
    // http://xi.help.ciwong.com/?brandId=524726977
    props: ['title'],
    components: {
      Navigator
    },
    watch: {
      '$route' (val) {
        this.updatePage()
        this.$router.go(0)
      }
    },
    methods: {
      updatePage () {
        if (this.pageTitle === '我的成绩') {
          this.rightTitle = '学习记录'
          let url = baseUrl + 'v1712_chuju/learningRecord/index.html?isOnline=1&page=1&pageSize=40&pageType=2' + '&clientId=' + clientId + '&brandId=' + brandId + '&accessToken=' + this.$store.getters.userInfo.accessToken
          this.right = '/framePage?title=学习记录&to=' + encodeURIComponent(url)
        } else {
          this.right = ''
          this.rightTitle = ''
        }
        document.getElementById('framepage1').style.height = window.innerHeight - document.getElementById('navigator1').offsetHeight - 5 + 'px'
        var title
        try {
          title = window.frames['framepage1'].document.title
        } catch (error) {
          title = false
        }
        if (title) this.pageTitle = title
      }
    },
    mounted () {
      this.updatePage()
    }
  }
</script>
<style scoped>
  iframe{width:100%; height: 95%;}
</style>
