<template lang="pug">
  div.demo-container(:style="demoContainerStyle")
    span.title
      h2 {{ title }}
      button.add-btn(@click="addItem") 添加元素

    div.divider

    div#demo(:style="demoStyle")
      CompDemoItem(
        v-for="(n, index) in items",
        :key="n",
        :no="index",
        :uid="n"
      )
</template>

<script>
import uuid from 'uuid'
import CompDemoItem from './Item'
import EventHub from './EventHub'

export default {
  data () {
    return {
      title: 'Demo',
      items: [uuid.v1()],
    }
  },

  props: {
    width: {
      type: Number,
      default: 60,
    },
    demoProps: {
      fd: {
        type: String,
        default: 'row',
      },
      fw: {
        type: String,
        default: 'nowrap',
      },
      jc: {
        type: String,
        default: 'flex-start',
      },
      ai: {
        type: String,
        default: 'stretch',
      },
      ac: {
        type: String,
        default: 'stretch',
      },
    },
  },

  created () {
    EventHub.$on('item-delete', (theUID) => {
      this.items = this.items
        .filter(item => theUID !== item)
    })
  },

  computed: {
    demoContainerStyle () {
      return { flex: this.width }
    },
    demoStyle () {
      return {
        'flex-direction': this.demoProps.fd,
        'flex-wrap': this.demoProps.fw,
        'justify-content': this.demoProps.jc,
        'align-items': this.demoProps.ai,
        'align-content': this.demoProps.ac,
      }
    },
  },

  methods: {
    addItem () {
      this.items.push(uuid.v1())
    },
  },

  components: {
    CompDemoItem,
  },
}
</script>

<style lang="scss" scoped>
.demo-container {
  display: flex;

  flex-flow: column;

  .title {
    position: relative;

    display: inline-block;

    width: 100%;

    flex: 0 1 auto;
  }

  .add-btn {
    position: absolute;
    right: 0;
    bottom: 0;

    color: #0bf;
    border: none;
    outline: none;
    background: 0 0;

    font-size: 23px;
  }

  #demo {
    display: flex;

    min-height: 750px;
    margin: 5px;
    padding: 5px;

    border-radius: 10px;
    background-color: #e1e1e1;
    box-shadow: 1px 1px 10px #969696;

    flex: 1;
  }
}
</style>
