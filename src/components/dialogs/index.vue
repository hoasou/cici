<template>
  <div class="g-dialogs">
    <mu-circular-progress v-if="!!loading" :size="30" color="green"/>

    <mu-toast v-if="TOAST.msg != ''" :message="TOAST.msg + ''" @close="toastClose"/>

    <mu-dialog :open="DIALOG.content != ''" :title="DIALOG.title" @close="cancel">
      <div v-html="DIALOG.content"></div>
      <mu-flat-button slot="actions" primary v-if="DIALOG.cancelShow==true" @click="cancel" :label="DIALOG.cancelTxt"/>
      <mu-flat-button slot="actions" primary @click="confirm" :label="DIALOG.confirmTxt"/>
    </mu-dialog>
    <div class="dialogs-bg" v-if="dialogsBg"></div>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
      }
    },
    methods: {
      toastClose () {
      },
      confirm () {
        this.DIALOG.confirmFn && this.DIALOG.confirmFn()
        this.DIALOG_CLOSE()
      },
      cancel () {
        this.DIALOG.cancelFn && this.DIALOG.cancelFn()
        this.DIALOG_CLOSE()
      },
      ...mapActions(['DIALOG_CLOSE'])
    },
    computed: {
      dialogsBg () {
        return !!this.loading || this.TOAST.msg || this.DIALOG.content
      },
      ...mapState(['loading']),
      ...mapGetters(['TOAST', 'DIALOG'])
    },
    mounted () {
      console.log(this.loading)
    }
  }
</script>
<style lang="scss">
.g-dialogs{
  .mu-toast{
    text-align: center; left:50%; top: 50%; bottom: auto; width: auto; max-width: 95%; display: inline-block; transform: translate(-50%, -50%);background: rgba(0, 0, 0, .8); border-radius: 5px; height: auto; white-space: normal;line-height: 0.5rem; padding: 0.2rem 0.4rem;
  }
  .mu-circular-progress{
    text-align: center; left:50%; bottom: 50%; position: fixed; transform: translate(-50%, -50%);
  }
  .dialogs-bg{ width: 100%; height: 100%; position: fixed; left: 0; top: 0; z-index: 999; background: rgba(255, 255, 255, 0);}
}
</style>

