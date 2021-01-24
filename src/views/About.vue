<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a-button type="dashed" icon="plus" @click="add">Dialog</a-button>
    <a-button type="dashed" icon="plus" @click="hello">Hello</a-button>
  </div>
</template>
<script>
import Home from './Home'
export default {
  name: 'about',
  components: {
    Home
  },
  data() {
    return {
      num: 0
    }
  },
  methods: {
    add() {
      this.$dialog(Home, {
        record: {},
        on: {
          ok() {
            console.log('ok 回调')
          },
          cancel() {
            console.log('cancel 回调')
          },
          close() {
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
    hello() {
      this.$api.get(helloWorld)
    }
  }
}
</script>