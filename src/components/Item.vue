<template lang="pug">
  div.demo-item(:style='itemStyle')

    div.demo-prop-item.title
      span.num-bg {{ no }}
      button.delete-btn(@click='itemOnClick') X

    div.demo-prop-item
      span.item-prop-text order:
      input(type='number', v-model.number='order')

    div.demo-prop-item
      span.item-prop-text flex-grow:
      input(type='number', v-model.number='flexGrow', min='0')

    div.demo-prop-item
      span.item-prop-text flex-shrink:
      input(type='number', v-model.number='flexShrink', min='0')

    div.demo-prop-item
      span.item-prop-text flex-basis:
      input(
        ref='basisInput',
        :value='flexBasis',
        @change='updateFlexBasis($event.target.value)'
      )

    div.demo-prop-item
      span.item-prop-text align-self:
      select(v-model='alignSelf')
        option(v-for='opt in alignSelfArr') {{ opt }}
</template>

<script>
import EventHub from './EventHub'

export default {
  name: 'Item',

  data () {
    return {
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      alignSelf: 'auto',
      alignSelfArr: [
        'auto',
        'flex-start',
        'flex-end',
        'center',
        'baseline',
        'stretch',
      ],
    }
  },

  props: {
    no: {
      type: Number,
      isRequired: true,
    },
    uid: {
      type: String,
      isRequired: true,
    },
  },

  computed: {
    itemStyle () {
      return {
        'order': this.order,
        'flex-grow': this.flexGrow,
        'flex-shrink': this.flexShrink,
        'flex-basis': this.flexBasis,
        'align-self': this.alignSelf,
      }
    },
  },

  methods: {
    itemOnClick () {
      EventHub.$emit('item-delete', this.uid)
    },
    updateFlexBasis (value) {
      let tmpVal = this.flexBasis
      const number = value.replace(/[^\d.]/g, '')

      if (value === 'auto') {
        tmpVal = 'auto'
      } else if (value.slice(-1) === '%') {
        tmpVal = `${number}%`
      } else if (number !== '') {
        tmpVal = `${number}px`
      }

      this.flexBasis = tmpVal
      this.$refs.basisInput.value = tmpVal
    },
  },
}
</script>

<style lang="scss">
$bgLength: 20px;

.demo-item {
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

.demo-item {
  min-width: 100px;
  margin-left: 3px;

  border-radius: 5px;
  background-color: white;
  box-shadow: 1px 1px 10px #969696;

  .demo-prop-item {
    margin: 10px 5px;

    &.title {
      display: flex;

      justify-content: space-between;
    }

    .delete-btn {
      width: 20px;
      height: 20px;

      color: #fff;
      border: none;
      background: 0 0;

      font-size: 17px;
      line-height: 1;
    }

    .num-bg {
      display: inline-block;

      width: $bgLength;
      height: $bgLength;

      text-align: center;

      color: white;

      font-size: 17px;
    }

    .item-prop-text {
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
