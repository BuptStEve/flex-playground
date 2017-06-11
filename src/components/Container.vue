<template lang="pug">
  div
    h1 {{ title }}
    div#container
      CompDemo(:width="demoWidth", :demo-props="demoProps")
      div.divider
      CompCtrl(:demo-props.sync="demoProps")
</template>

<script>
import CompDemo from './Demo'
import CompCtrl from './Ctrl'
import EventHub from './EventHub'

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
        ac: 'stretch',
      },
    }
  },

  created () {
    EventHub.$on('ctrl-width-change', (width) => {
      this.demoWidth = width
    })
  },

  components: {
    CompDemo,
    CompCtrl,
  },
}
</script>

<style lang="scss">

$font-stack: Helvetica, sans-serif;

body {
  font: 100% font-stack;
  background-color: #F9F9F9;
  color: black;

  h1, h2 {
    color: #0bf;
    text-align: center;
  }

  h3 {
    color: #0bf;
  }

  .divider {
    border: 1px dashed #999;
  }

  button {
    cursor: pointer;
  }
}

#container {
  display: flex;
  min-height: 500px;
}

</style>
