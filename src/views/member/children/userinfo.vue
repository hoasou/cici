<template>
  <div class="m-setup">
    <Navigator title="个人信息" left='back' right=''></Navigator>
    <mu-list>
      <mu-list-item title="头像">
        <mu-icon slot="right" value="navigate_next"/>
      </mu-list-item>
      <mu-list-item title="名字">
        <mu-icon slot="right" value="navigate_next"/>
      </mu-list-item>
      <mu-list-item title="账号" afterText="v2.11.301">
      </mu-list-item>
      <mu-list-item title="修改密码">
        <mu-icon slot="right" value="navigate_next"/>
      </mu-list-item>
      <mu-list-item title="已绑定手机号">
        <mu-icon slot="right" value="navigate_next"/>
      </mu-list-item>
      <mu-list-item title="班级">
        <mu-icon slot="right" value="navigate_next"/>
      </mu-list-item>
      <mu-list-item title="学校">
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
  .m-setup{
    .mu-list{ padding: 0 0.2rem;}
    .mu-item{border-bottom: 1px solid #e7e7e7;
      p{text-align: right;}
    }
  }
</style>
