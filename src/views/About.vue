<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a-button type="dashed" icon="plus" @click="add">Dialog</a-button>
    <a-button type="dashed" icon="plus" @click="hello">Hello</a-button>
    <a-button type="dashed" icon="minus" @click="hello2">Hello2</a-button>
    <a-button type="primary"  @click="getZhiHuDaily">知乎日报</a-button>
  </div>
</template>
<script>
import Home from './Home'
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
      this.$api.test.helloWorld(param).then(res => {
        if (res.data) {
          alert(res.data)
        }
      }).catch(error => {
        alert(error)
      })
    },
    hello2 () {
      var param = 'hello2'
      this.$api.test.helloWorld2(param).then(res => {
        if (res.data) {
          alert(res.data)
        }
      }).catch(error => {
        alert(error)
      })
    },
    getZhiHuDaily () {
      this.$request.get('http://news-at.zhihu.com/api/4/news/latest').then(res => {
        if (res.data) {
          alert(res.data)
        }
      }).catch(error => {
        alert(error)
      })
    }
  }
}
</script>
