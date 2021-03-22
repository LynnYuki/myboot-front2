<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  created () {
    console.log(process.env.VUE_APP_HOST)
    console.log(process.env.NODE_ENV)
  }
}
</script>
<style lang="less">
body{
  padding: 0;
  margin:0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

//隐藏video标签的全部按钮

//全屏按钮
video::-webkit-media-controls-fullscreen-button{
  display: none;
}

//播放按钮
video::-webkit-media-controls-play-button{
  display: none;
}

//进度条
video::-webkit-media-controls-timeline{
  display: none;
}

//观看的当前时间
video::-webkit-media-controls-current-time-display{
  display: none;
}

//剩余时间
video::-webkit-media-controls-time-remaining-display{
  display: none;
}

//音量按钮
video::-webkit-media-controls-mute-button{
  display: none;
}

video::-webkit-media-controls-toggle-closed-captions-button{
  display:none;
}


//音量控制条
video::-webkit-media-controls-volume-slider{
  display: none;
}

//所有控件
video::-webkit-media-controls-enclosure{
  display: none;
}
</style>
