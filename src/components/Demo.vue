<template lang="pug">
  div.demo-container(:style='demoContainerStyle')
    span.title
      h2 {{ title }}
      button.add-btn(@click='addItem') 添加元素

    div.divider

    div#demo(:style='demoStyle')
      CompDemoItem(
        v-for='(uid, index) in demoItems',
        :key='uid',
        :num='index',
        :uid='uid'
        :itemProps='demoItemProps[uid]'
      )
</template>

<script>
import EventHub from './EventHub'
import CompDemoItem from './Item'
import { genOneUid, getValidDemoWidth } from '@/utils/'

export default {
  name: 'Demo',

  components: {
    CompDemoItem,
  },

  data () {
    return {
      title: 'Demo',
      demoItems: [],
      demoItemProps: {},
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

    try {
      this.demoItems = JSON.parse(demoItems)
      this.demoItemProps = JSON.parse(demoItemProps)
    } catch (e) {
      this.demoItems = JSON.parse(decodeURIComponent(demoItems))
      this.demoItemProps = JSON.parse(decodeURIComponent(demoItemProps))
    }

    EventHub.$on('item-delete', (theUID) => {
      this.demoItems = this.demoItems
        .filter(item => theUID !== item)

      this.demoItemProps = Object.entries(this.demoItemProps)
        .filter(([ key ]) => theUID !== key)
        .reduce((acc, [ key, val ]) => ({ ...acc, [key]: val }), {})
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
        uid: genOneUid(this.demoItems),
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

      this.demoItems.push(uid)
      this.demoItemProps = {
        ...this.demoItemProps,
        [uid]: itemProps,
      }
    },
  },

  watch: {
    demoItems (newVal) {
      this.$router.push({
        query: {
          ...this.$route.query,
          demoItems: JSON.stringify(newVal),
        },
      })
    },
    demoItemProps: {
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
