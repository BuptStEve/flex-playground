<template lang="jade">
  div
    //- img(class="logo", src="./assets/logo.png")
    h1 {{ title }}
    div#app
      comp-demo(:width="demoWidth", :demo-props="demoProps")
      div.divider
      comp-ctrl(:demo-props.sync="demoProps")
</template>

<script>
  import CompDemo from './components/demo.vue'
  import CompCtrl from './components/ctrl.vue'

  export default {
    data () {
      return {
        title: 'Flex Demo',
        demoWidth: 60,
        demoProps: {
          fd: 'row',
          fw: 'nowrap',
          jc: 'flex-start',
          ai: 'stretch',
          ac: 'stretch'
        }
      }
    },
    components: {
      CompDemo,
      CompCtrl
    },
    events: {
      'ctrlWidthChange' (theWidth) {
        this.demoWidth = theWidth
      }
    }
  }
</script>

<style lang="stylus">
  font-stack = Helvetica, sans-serif

  body
    font 100% font-stack
    background-color: #F9F9F9;
    color black
    h1, h2
      color #0bf
      text-align center
    h3
      color #0bf
    .divider
      border 1px dashed #999
    button
      cursor pointer

  #app
    display flex
    min-height: 500px;
    // border 2px solid
</style>
