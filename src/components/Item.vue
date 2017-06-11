<template lang="pug">
  div.demoItem(:style="{'order': itemProps.order, 'flex-grow': itemProps.flexGrow, 'flex-shrink': itemProps.flexShrink, 'flex-basis': itemProps.flexBasis, 'align-self': itemProps.alignSelf}")
    div.demoPropItem(style="display: flex; justify-content: space-between;")
      span.numBg {{ no }}
      button.deleteBtn(@click="itemOnClick()") X

    div.demoPropItem
      span.itemPropText order:
      input(type='number', v-model="itemProps.order")

    div.demoPropItem
      span.itemPropText flex-grow:
      input(type='number', v-model="itemProps.flexGrow", min='0')

    div.demoPropItem
      span.itemPropText flex-shrink:
      input(type='number', v-model="itemProps.flexShrink", min='0')

    div.demoPropItem
      span.itemPropText flex-basis:
      input(v-model="itemProps.flexBasis", v-on:input="updateFlexBasis($event.target.value)" lazy)

    div.demoPropItem
      span.itemPropText align-self:
      select(v-model="itemProps.alignSelf")
        option(alignSelf) auto
        option flex-start
        option flex-end
        option center
        option baseline
        option stretch
</template>

<script>
import EventHub from './EventHub'

export default {
  data () {
    return {
      itemProps: {
        order: 0,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        alignSelf: 'auto',
      },
    }
  },

  props: {
    no: {
      type: Number,
      default: 1,
    },
    uid: {
      type: String,
    },
  },

  methods: {
    itemOnClick () {
      EventHub.$emit('item-delete', this.uid)
    },
    updateFlexBasis (value) {
      const number = +value.replace(/[^\d.]/g, '')

      if (value === 'auto') return 'auto'
      if (isNaN(number)) return this.itemProps.flexBasis
      if (value.slice(-1) === '%') return `${number}%`

      return `${number}px`
    },
  },

  // filters: {
  //   flexBasisDisplay: {
  //     write(val, oldVal) {
  //       const number = +val.replace(/[^\d.]/g, '')
  //
  //       if (val === 'auto') return 'auto'
  //       if (isNaN(number)) return oldVal
  //       if (val.slice(-1) === '%') return `${number}%`
  //
  //       return `${number}px`
  //     },
  //   },
  // },
}
</script>

<style lang="scss">
$bgLength: 20px;

.demoItem {
  &:nth-child(6n) {
    background-color: #8370F4;
  }
  &:nth-child(6n+1) {
    background-color: #E46C49;
  }
  &:nth-child(6n+2) {
    background-color: #37B0D3;
  }
  &:nth-child(6n+3) {
    background-color: #68B33D;
  }
  &:nth-child(6n+4) {
    background-color: #E46775;
  }
  &:nth-child(6n+5) {
    background-color: #CFC731;
  }
}

.demoItem {
  min-width: 100px;
  margin-left: 3px;
  background-color: white;
  box-shadow: 1px 1px 10px #969696;

  .demoPropItem {
    margin: 10px 5px;

    .deleteBtn {
      font-size: 17px;
      line-height: 1;
      color: #fff;
      width: 20px;
      height: 20px;
      background: 0 0;
      border: none;
    }

    .numBg {
      display: inline-block;
      font-size: 17px;
      color: white;
      text-align: center;
      width: $bgLength;
      height: $bgLength;
    }

    .itemPropText {
      display: block;
      color: white;
    }

    input, select {
      width: 90%;
      font-size: 20px;
    }
  }
}
</style>
