<template lang="pug">
  div.demo-item(:style='itemStyle')

    div.demo-prop-item.title
      span.num-bg {{ num }}
      button.delete-btn(@click='itemOnClick') X

    div.demo-prop-item
      span.item-prop-text order:
      input(type='number', v-model.number='itemProps.order')

    div.demo-prop-item
      span.item-prop-text flex-grow:
      input(type='number', v-model.number='itemProps.flexGrow', min='0')

    div.demo-prop-item
      span.item-prop-text flex-shrink:
      input(type='number', v-model.number='itemProps.flexShrink', min='0')

    div.demo-prop-item
      span.item-prop-text flex-basis:
      input(
        ref='basisInput',
        :value='itemProps.flexBasis',
        @change='updateFlexBasis($event.target.value)'
      )

    div.demo-prop-item
      span.item-prop-text align-self:
      select(v-model='itemProps.alignSelf')
        option(v-for='opt in alignSelfArr') {{ opt }}
</template>

<script>
import EventHub from './EventHub'

export default {
  name: 'Item',

  data () {
    return {
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
    num: {
      type: Number,
      isRequired: true,
    },
    uid: {
      type: String,
      isRequired: true,
    },
    itemProps: {
      order: {
        type: Number,
        default: 0,
      },
      flexGrow: {
        type: Number,
        default: 0,
      },
      flexShrink: {
        type: Number,
        default: 1,
      },
      flexBasis: {
        type: [ Number, String ],
        default: 'auto',
      },
      alignSelf: {
        type: String,
        default: 'auto',
        validator (val) {
          return this.alignSelfArr.includes(val)
        },
      },
    },
  },

  computed: {
    itemStyle () {
      return {
        'order': this.itemProps.order,
        'flex-grow': this.itemProps.flexGrow,
        'align-self': this.itemProps.alignSelf,
        'flex-basis': this.itemProps.flexBasis,
        'flex-shrink': this.itemProps.flexShrink,
      }
    },
  },

  methods: {
    itemOnClick () {
      EventHub.$emit('item-delete', this.uid)
    },
    updateFlexBasis (value) {
      let tmpVal = this.itemProps.flexBasis
      const number = value.replace(/[^\d.]/g, '')

      if (value === 'auto') {
        tmpVal = 'auto'
      } else if (value.slice(-1) === '%') {
        tmpVal = `${number}%`
      } else if (number !== '') {
        tmpVal = `${number}px`
      }

      this.itemProps.flexBasis = tmpVal
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
