<template lang="pug">
  div(:style="{'flex': width}").container
    span.title
      h2(style="display: inline-block; width: 100%;") {{ title }}
      button(style="position: absolute; margin: 30px 0 0 -100px; font-size: 23px; color: #0bf; background: 0 0; border: none; outline: none;", @click="addItem()") 添加元素

    div.divider

    div#demo(:style="{'flex-direction': demoProps.fd, 'flex-wrap': demoProps.fw, 'justify-content': demoProps.jc, 'align-items': demoProps.ai, 'align-content': demoProps.ac}")
      comp-demo-item(v-for="(n, index) in items", :key="n", :no="index", :uid="n")
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
      let theNum = -1

      this.items.forEach((el, index) => {
        if (el === theUID) {
          theNum = index
          return
        }
      })

      this.items.splice(theNum, 1)
    })
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

<style lang="scss">
.container {
  display: flex;
  flex-flow: column;
  padding: 5px;
}

.title {
  flex: 0 1 auto;
}

#demo {
  flex: 1;
  box-shadow: 1px 1px 10px #969696;
  display: flex;
  background-color: #e1e1e1;
  border-radius: 10px;
  padding: 5px;
  min-height: 750px;
}
</style>