<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a-button type="dashed" icon="plus" @click="add">Dialog</a-button>
    <a-button type="dashed" icon="plus" @click="hello">Hello</a-button>
    <a-button type="dashed" icon="minus" @click="hello2">Hello2</a-button>
    <a-button type="primary"  @click="getZhiHuDaily">知乎日报</a-button>
    <a-button type="info"  @click="hello3">防抖</a-button>
  </div>
</template>
<script>
import Home from './Home'
import Vue from 'vue'
import storage from 'store'
export default {
  name: 'about',
  components: {
    Home
  },
  data () {
    return {
      num: 0
    }
  },
  created () {
    // var that = this
    // 全局挂载debounce 和throttle到该vue模块方法中，参数如下
    // [options.leading=false] (boolean): 指定在延迟开始前调用。
    // [options.maxWait] (number): 设置 func 允许被延迟的最大值。
    // [options.trailing=true] (boolean): 指定在延迟结束后调用
    // https://www.lodashjs.com/docs/lodash.throttle
    this.hello = this.$debounce(this.hello, 1000, { maxwait: 3000, leading: true, trailing: false })
    this.hello3 = this.$debounce(this.hello3, 1000, { leading: false, trailing: true })
    this.hello2 = this.$throttle(this.hello2, 1000, { leading: false, trailing: true })
  },
  methods: {
    add () {
      this.$dialog(Home, {
        record: {},
        on: {
          ok () {
            console.log('ok 回调')
          },
          cancel () {
            console.log('cancel 回调')
          },
          close () {
            console.log('close 回调')
          }
        }
      },
      {
        titile: '新增',
        width: 700,
        centered: true,
        maskClosable: false
      })
    },
    hello () {
      var param = 'hello'
      Vue.ls.set('hello', 'hello', 7 * 24 * 60 * 60 * 1000)// 存储到localstorage
      this.$api.test.helloWorld(param).then(res => {
        if (res.data) {
          console.log(res.data)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    hello2 () {
      var param = 'hello2'
      storage.set('hello2', 'hello2', 7 * 24 * 60 * 60 * 1000)
      this.$api.test.helloWorld2(param).then(res => {
        if (res.data) {
          console.log(res.data)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getZhiHuDaily () {
      this.$request.get('http://news-at.zhihu.com/api/4/news/latest').then(res => {
        if (res.data) {
          console.log(res.data)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 标准防抖用法
    // hello3: _.debounce(function () {
    //   console.log('hello3')
    // }, 1000),

    hello3 () {
      console.log('hello3')
    }
  }

}
</script>
