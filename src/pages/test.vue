<template>
  <div class="page-test bg-white">
    <button class="btn-bg" @click="clickOnce">click once {{count}}</button>

    <input type="text" v-model="vForm.name.model" placeholder="请输入您的姓名，最小长度5位">
    <span class="c-red">{{vForm.name.errorTip}}</span>

    <input type="text" v-model="vForm.mobile.model" maxlength="11" placeholder="请输入您的手机号">
    <span class="c-red">{{vForm.mobile.errorTip}}</span>

    <button id="testRem" class="btn-bg" @click="check()">validate</button>

    <p class="drag-btn" ref="dragEl">drag</p>
    <div class="wrap">
      <ul class="swipe-list" ref="swipeEl">
        <li class="swipe-item" v-for="(item, index) in news" :key="index">swipe {{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as tool from '../service/tool'
import Touch from '../service/Touch.js'
import * as animation from '../service/animation'

export default {
  data () {
    return {
      // 点击次数
      count: 0,
      // 表单字段
      vForm: {
        name: {
          model: '',
          err: 'name error',
          rule: 'name|len5',
          errorTip: ''
        },
        mobile: {
          model: '',
          err: 'mobile error',
          rule: 'mobile',
          errorTip: ''
        }
      },
      // swipe 测试数据
      news: ['1', '2', '3']
    }
  },
  mounted () {
    tool.logger('test $$')
    tool.logger(tool.$$('.btn-bg'))
    tool.logger('test $')
    tool.logger(tool.$('.btn-bg'))

    // 640 设计稿设置字体
    tool.$('#testRem').style.fontSize = window.rem.px2rem(30, 640) + 'rem'

    this.initDrag()
    this.initSwipe()
  },
  methods: {
    clickOnce () {
      tool.once(() => {
        this.count++
        tool.logger('test once')
      })
    },
    check () {
      const pass = this.$validate(this.vForm, (err, pass, key) => {
        this.vForm[key].errorTip = pass ? '' : err
      })
      console.log('pass: ', pass)
    },
    initDrag () {
      const dragEl = this.$refs.dragEl
      // 当前位置
      let currX = 0
      let currY = 0
      /* eslint-disable no-new */
      new Touch(dragEl, {
        drag (dX, dY, end) {
          // 拖拽的距离
          console.log(dX, dY, end)

          // 总共需要移动的距离
          const moveX = currX + dX
          const moveY = currY + dY

          // 动画
          animation.translate(dragEl, {
            x: moveX + 'px',
            y: moveY + 'px'
          })

          // 拖拽结束后记录当前位置
          if (end === 'end') {
            currX = moveX
            currY = moveY
          }
        }
      })
    },
    initSwipe () {
      const swipeEl = this.$refs.swipeEl
      const len = this.news.length
      const swipeWidth = swipeEl.offsetWidth / len
      let swipeIndex = 0

      /* eslint-disable no-new */
      new Touch(swipeEl, {
        swipe (dX, dY) {
          swipeIndex++
          if (swipeIndex > len - 1) swipeIndex = 0
          animation.translate(swipeEl, {
            x: -swipeWidth * swipeIndex + 'px'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_global.scss';

.page-test {
  min-height: 100%;
  padding: rem(30);

  .btn-bg {
    margin-bottom: rem(10);
  }

  .drag-btn {
    width: rem(100);
    height: rem(100);
    background: pink;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .wrap {
    overflow: hidden;
  }
  .swipe-list {
    height: rem(300);
    background: #ccc;
    width: 300%;
    transition: transform 0.5s ease;
  }
  .swipe-item {
    height: 100%;
    background: green;
    width: 33.33333333%;
    @extend %fl;

    &:first-of-type {
      background: red;
    }
    &:last-of-type {
      background: blue;
    }
  }
}
</style>
