<template lang="pug">
  div
    h1 {{ title }}

    div#container
      CompDemo(:demoProps='demoProps')
      div.divider
      CompCtrl(:demoProps='demoProps')
</template>

<script>
import CompDemo from './Demo'
import CompCtrl from './Ctrl'

export default {
  data () {
    return {
      title: 'Flex Playground',
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
    const { demoProps = '{}' } = this.$route.query

    this.demoProps = {
      ...this.demoProps,
      ...JSON.parse(demoProps),
    }
  },

  components: {
    CompDemo,
    CompCtrl,
  },
}
</script>

<style lang="scss">
body {
  color: black;
  background-color: #F9F9F9;

  font: 100% Helvetica, sans-serif;

  h1, h2 {
    text-align: center;

    color: #0bf;
  }

  #container {
    display: flex;

    min-height: 500px;
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
</style>
