<template lang="pug">
  div.ctrl-container(:style='ctrlContainerStyle')
    span.title
      h2 {{ title }}
    div.divider

    ul#ctrl
      li.ctrl-item
        h3 Demo 宽度设置：{{ `${demoWidth}%` }}
        input.width-input(type='range', min='20', max='75', v-model.number.lazy='demoWidth' @change='widthOnChange')

      li.ctrl-item
        h3 弹性容器的属性说明
        ul
          li(v-for='desc in containerDescArr') {{ desc }}

      li.ctrl-item
        h3 弹性容器属性设置
          span.one-more-thing 第一个为默认值！

        div.demo-props
          div.container-prop-item(v-for='item in containerFlexPropArr')
            span {{ item.name }}
            div.ctrl-prop-item(v-for='value in item.itemValues')
              input(
                type='radio',
                :id='`${item.prefix}-${value}`',
                value='value',
                :checked='demoProps[item.prefix] === value'
                @change='propOnChange({ [item.prefix]: value })'
              )
              label(:for='`${item.prefix}-${value}`') {{ value }}

      li.ctrl-item
        h3 弹性子元素的属性说明
        ul
          li(v-for='desc in itemDescArr') {{ desc }}
</template>

<script>
import EventHub from './EventHub'
import { getValidDemoWidth } from '@/utils/'

export default {
  name: 'Ctrl',

  data () {
    return {
      title: 'Ctrl',
      demoWidth: 50,
      containerDescArr: [
        `flex-flow: flex-direction 和 flex-wrap 的缩写形式;`,
        `flex-direction: 设置主轴方向，确定弹性子元素的排列方式;`,
        `flex-wrap: 当弹性子元素超出弹性容器范围时是否换行;`,
        `justify-content: 主轴上的对齐方式;`,
        `align-items: 侧轴上的对齐方式;`,
        `align-content: 当侧轴上有空间时，侧轴的对齐方式;`,
      ],
      containerFlexPropArr: [
        {
          prefix: 'fd',
          name: 'flex-direction',
          itemValues: [
            'row',
            'row-reverse',
            'column',
            'column-reverse',
          ],
        },
        {
          prefix: 'fw',
          name: 'flex-wrap',
          itemValues: [
            'nowrap',
            'wrap',
            'wrap-reverse',
          ],
        },
        {
          prefix: 'jc',
          name: 'justify-content',
          itemValues: [
            'flex-start',
            'flex-end',
            'center',
            'space-between',
            'space-around',
          ],
        },
        {
          prefix: 'ai',
          name: 'align-items',
          itemValues: [
            'stretch',
            'flex-start',
            'flex-end',
            'center',
            'baseline',
          ],
        },
        {
          prefix: 'ac',
          name: 'align-content',
          itemValues: [
            'stretch',
            'flex-start',
            'flex-end',
            'center',
            'space-between',
            'space-around',
          ],
        },
      ],
      itemDescArr: [
        `order: 子元素间的排列顺序;`,
        `flex-grow: 扩展比率，算法为当前元素的值为分子，所有元素的该值作为分母，来分配多余的空间（数值越大扩展越多）;`,
        `flex-shrink: 收缩比率，算法同上，按比率收缩（数值越大收缩越多）;`,
        `flex-basis: 伸缩前的默认大小值，相当于 width/height 属性;`,
        `align-self: 作用于当前子元素，覆盖 container 的 align-items 属性;`,
      ],
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
    const { demoWidth = 50 } = this.$route.query
    this.demoWidth = getValidDemoWidth(demoWidth)
  },

  computed: {
    ctrlContainerStyle () {
      return { flex: 100 - this.demoWidth }
    },
  },

  methods: {
    widthOnChange () {
      EventHub.$emit('ctrl-width-change', this.demoWidth)
    },
    propOnChange (prop) {
      EventHub.$emit('props-change', { ...this.demoProps, ...prop })
    },
  },

  watch: {
    demoWidth (newVal) {
      this.$router.push({
        query: {
          ...this.$route.query,
          demoWidth: newVal,
        },
      })
    },
  },
}
</script>

<style lang="scss">
#ctrl {
  display: flex;

  margin: 0;
  padding: 10px;

  list-style: none;

  flex-flow: column wrap;
  align-content: column;

  .one-more-thing {
    margin-left: 10px;

    color: #000;

    font-size: 16px;
  }

  .ctrl-item {
    flex: 1;

    .width-input {
      width: 450px;
    }

    .demo-props {
      display: flex;

      flex-flow: wrap;

      .container-prop-item {
        display: flex;

        margin-bottom: 10px;

        flex: 1 1 auto;
        flex-flow: column;
      }
    }
  }
}
</style>
