<template>
  <div class="page-list bg-white">
    <h2>路由列表</h2>

    <div v-for="item in routesObj" :key="item.title">
      <h3 class="tac c-theme">{{item.title}}</h3>

      <div class="common-row common-row-arrow" v-for="(obj, index) in item.routes" :key="index">
        <router-link v-if="!obj.children" :to="obj.path">
          {{index + 1}}. {{obj.meta}}
          <span class="c-gray" v-if="obj.desc"> - {{obj.desc}}</span>
        </router-link>

        <router-link v-if="obj.children && !obj.children[0].children" :to="obj.path + '/' + obj.children[0].path">{{obj.meta}}</router-link>

        <router-link v-if="obj.children && obj.children[0].children" :to="obj.path + '/' + obj.children[0].path + '/' + obj.children[0].children[0].path">{{obj.meta}}</router-link>
      </div>
    </div>

    <div class="dpr">
      <p class="p">dpr: {{dpr}}</p>
      <p>width: {{width}}</p>
      <p>height: {{height}}</p>
      <p>viewport: {{viewport}}</p>
    </div>
  </div>
</template>

<script>
import {
  routeData
} from '../router'
import * as utils from '../service/utils'

export default {
  data () {
    // 过滤不显示的路由
    const hideReg = /^(\*|\/|\/list)$/
    const otherRoutes = routeData[0].routes.filter((item, index) => {
      return !hideReg.test(item.path)
    })
    routeData[0].routes = otherRoutes

    return {
      routesObj: routeData,
      dpr: window.devicePixelRatio,
      width: '',
      height: '',
      viewport: ''
    }
  },
  mounted () {
    var docEl = document.documentElement

    this.width = docEl.getBoundingClientRect().width || docEl.clientWidth
    this.height = window.innerHeight
    this.viewport = utils.$('meta[name=viewport]').content
  }
}
</script>

<style lang="scss">
@import '../scss/_global.scss';

.page-list {
  min-height: 100%;
  padding: rem(30);

  a {
    @extend %db;
  }

  .dpr,
  h3 {
    padding-top: rem(30);
  }
  .test {
    width: rem(375);
    background: #000;
  }
}
</style>
