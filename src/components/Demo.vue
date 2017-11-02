<template lang="pug">
  div.demo-container(:style='demoContainerStyle')
    span.title
      h2 {{ title }}
      button.add-btn(@click='addItem') 添加元素

    div.divider

    div#demo(:style='demoStyle')
      CompDemoItem(
        v-for='(uid, index) in items',
        :key='uid',
        :num='index',
        :uid='uid'
        :itemProps='itemProps[uid]'
      )
</template>

<script>
import uuid from 'uuid'
import EventHub from './EventHub'
import CompDemoItem from './Item'
import { getValidDemoWidth } from '@/utils/'

export default {
  name: 'Demo',

  components: {
    CompDemoItem,
  },

  data () {
    return {
      title: 'Demo',
      items: [],
      itemProps: {},
      width: 50,
    }
  },

  props: {
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
    const { uid, itemProps } = this.getOneItem()
    const defaultItems = JSON.stringify([uid])
    const defaultItemProps = JSON.stringify({ [uid]: itemProps })
    const {
      demoWidth = 50,
      demoItems = defaultItems,
      demoItemProps = defaultItemProps,
    } = this.$route.query

    this.width = getValidDemoWidth(demoWidth)
    this.items = JSON.parse(demoItems)
    this.itemProps = JSON.parse(demoItemProps)

    EventHub.$on('item-delete', (theUID) => {
      this.items = this.items
        .filter(item => theUID !== item)
    })

    EventHub.$on('ctrl-width-change', (width) => {
      this.width = width
    })
  },

  computed: {
    demoContainerStyle () {
      return { flex: this.width }
    },
    demoStyle () {
      return {
        'flex-wrap': this.demoProps.fw,
        'align-items': this.demoProps.ai,
        'align-content': this.demoProps.ac,
        'flex-direction': this.demoProps.fd,
        'justify-content': this.demoProps.jc,
      }
    },
  },

  methods: {
    getOneItem () {
      return {
        uid: uuid.v1(),
        itemProps: {
          order: 0,
          flexGrow: 0,
          flexShrink: 1,
          flexBasis: 'auto',
          alignSelf: 'auto',
        },
      }
    },
    addItem () {
      const { uid, itemProps } = this.getOneItem()

      this.items.push(uid)
      this.itemProps = {
        ...this.itemProps,
        [uid]: itemProps,
      }
    },
  },

  watch: {
    items (newVal) {
      this.$router.push({
        query: {
          ...this.$route.query,
          demoItems: JSON.stringify(newVal),
        },
      })
    },
    itemProps: {
      deep: true,
      handler (newVal) {
        this.$router.push({
          query: {
            ...this.$route.query,
            demoItemProps: JSON.stringify(newVal),
          },
        })
      },
    },
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
