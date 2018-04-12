<template>
  <div>
    <img src="../assets/logo.png" alt="">

    <h1>hello vuer!</h1>

    <div>
      <p>dpr: {{dpr}}</p>
      <p>width: {{width}}</p>
      <p>height: {{height}}</p>
      <p>viewport: {{viewport}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dpr: window.devicePixelRatio,
      width: '',
      height: '',
      viewport: ''
    }
  },
  mounted () {
    const docEl = document.documentElement

    this.width = docEl.getBoundingClientRect().width || docEl.clientWidth
    this.height = window.innerHeight
    this.viewport = document.querySelector('meta[name=viewport]').content
  }
}
</script>
