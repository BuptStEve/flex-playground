<template lang="pug">
  div(:style="{'flex': '100' - width}").container
    span.title
      h2 {{ title }}
    div.divider

    ul#ctrl
      li.ctrlItem
        h3 Demo 宽度设置：{{ width }}%
        input(style='width: 450px', type='range', min='20', max='75', v-model="width" @change="widthOnChange" lazy)

      li.ctrlItem
        h3 弹性容器的属性说明
        ul
          li flex-flow: flex-direction 和 flex-wrap 的缩写形式;
          li flex-direction: 设置主轴方向，确定弹性子元素的排列方式;
          li flex-wrap: 当弹性子元素超出弹性容器范围时是否换行;
          li justify-content: 主轴上的对齐方式;
          li align-items: 侧轴上的对齐方式;
          li align-content: 当侧轴上有空间时，侧轴的对齐方式;

      li.ctrlItem
        h3 弹性容器属性设置
        div.demoProps
          div.containerPropItem
            span flex-direction
            div.ctrlPropItem
              input(type='radio', id='fd-row', value='row', v-model="demoProps.fd")
              label(for='fd-row') row
            div.ctrlPropItem
              input(type='radio', id='fd-row-reverse', value='row-reverse', v-model="demoProps.fd")
              label(for='fd-row-reverse') row-reverse
            div.ctrlPropItem
              input(type='radio', id='fd-column', value='column', v-model="demoProps.fd")
              label(for='fd-column') column
            div.ctrlPropItem
              input(type='radio', id='fd-column-reverse', value='column-reverse', v-model="demoProps.fd")
              label(for='fd-column-reverse') column-reverse
            div.oneMoreThing
              span.oneMoreThingText 第一个为默认值！
          div.containerPropItem
            span flex-wrap
            div.ctrlPropItem
              input(type='radio', id='fw-nowrap', value='nowrap', v-model="demoProps.fw")
              label(for='fw-nowrap') nowrap
            div.ctrlPropItem
              input(type='radio', id='fw-wrap', value='wrap', v-model="demoProps.fw")
              label(for='fw-wrap') wrap
            div.ctrlPropItem
              input(type='radio', id='fw-wrap-reverse', value='wrap-reverse', v-model="demoProps.fw")
              label(for='fw-wrap-reverse') wrap-reverse
          div.containerPropItem
            span justify-content
            div.ctrlPropItem
              input(type='radio', id='jc-flex-start', value='flex-start', v-model="demoProps.jc")
              label(for='jc-flex-start') flex-start
            div.ctrlPropItem
              input(type='radio', id='jc-flex-end', value='flex-end', v-model="demoProps.jc")
              label(for='jc-flex-end') flex-end
            div.ctrlPropItem
              input(type='radio', id='jc-center', value='center', v-model="demoProps.jc")
              label(for='jc-center') center
            div.ctrlPropItem
              input(type='radio', id='jc-space-between', value='space-between', v-model="demoProps.jc")
              label(for='jc-space-between') space-between
            div.ctrlPropItem
              input(type='radio', id='jc-space-around', value='space-around', v-model="demoProps.jc")
              label(for='jc-space-around') space-around
          div.containerPropItem
            span align-items
            div.ctrlPropItem
              input(type='radio', id='ai-stretch', value='stretch', v-model="demoProps.ai")
              label(for='ai-stretch') stretch
            div.ctrlPropItem
              input(type='radio', id='ai-flex-start', value='flex-start', v-model="demoProps.ai")
              label(for='ai-flex-start') flex-start
            div.ctrlPropItem
              input(type='radio', id='ai-flex-end', value='flex-end', v-model="demoProps.ai")
              label(for='ai-flex-end') flex-end
            div.ctrlPropItem
              input(type='radio', id='ai-center', value='center', v-model="demoProps.ai")
              label(for='ai-center') center
            div.ctrlPropItem
              input(type='radio', id='ai-baseline', value='baseline', v-model="demoProps.ai")
              label(for='ai-baseline') baseline
          div.containerPropItem
            span align-content
            div.ctrlPropItem
              input(type='radio', id='ac-stretch', value='stretch', v-model="demoProps.ac")
              label(for='ac-stretch') stretch
            div.ctrlPropItem
              input(type='radio', id='ac-flex-start', value='flex-start', v-model="demoProps.ac")
              label(for='ac-flex-start') flex-start
            div.ctrlPropItem
              input(type='radio', id='ac-flex-end', value='flex-end', v-model="demoProps.ac")
              label(for='ac-flex-end') flex-end
            div.ctrlPropItem
              input(type='radio', id='ac-center', value='center', v-model="demoProps.ac")
              label(for='ac-center') center
            div.ctrlPropItem
              input(type='radio', id='ac-space-between', value='space-between', v-model="demoProps.ac")
              label(for='ac-space-between') space-between
            div.ctrlPropItem
              input(type='radio', id='ac-space-around', value='space-around', v-model="demoProps.ac")
              label(for='ac-space-around') space-around

      li.ctrlItem
        h3 弹性子元素的属性说明
        ul
          li order: 子元素间的排列顺序;
          li flex-grow: 扩展比率，算法为当前元素的值为分子，所有元素的该值作为分母，来分配多余的空间（数值越大扩展越多）;
          li flex-shrink: 收缩比率，算法同上，按比率收缩（数值越大收缩越多）;
          li flex-basis: 伸缩前的默认大小值，相当于 width/height 属性;
          li align-self: 作用于当前子元素，覆盖 container 的 align-items 属性;
</template>

<script>
import EventHub from './EventHub'

export default {
  name: 'Ctrl',

  data () {
    return {
      title: 'Ctrl',
      width: 60,
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

  methods: {
    widthOnChange () {
      EventHub.$emit('ctrl-width-change', Number(this.width))
    },
  },
}
</script>

<style lang="scss">
#ctrl {
  display: flex;
  flex-flow: column wrap;
  align-content: column;
  list-style: none;
  padding: 0;
  margin: 0;

  .ctrlItem {
    flex: 1;

    .demoProps {
      display: flex;
      flex-flow: wrap;

      .containerPropItem {
        display: flex;
        flex: 1 1 auto;
        flex-flow: column;
        margin-bottom: 10px;

        .oneMoreThing {
          display: flex;
          flex: 1;

          .oneMoreThingText {
            align-self: flex-end;
          }
        }
      }
    }
  }
}
</style>
