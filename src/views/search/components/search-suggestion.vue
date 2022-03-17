<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="item in suggList"
      :key="item.id"
      @click="$emit('search', item.name)"
    >
      <div slot="title" v-html="highlight(item.name)"></div>
    </van-cell>
  </div>
</template>

<script>
import { suggestionList } from '@/api/suggestion'
// 按需加载好处: 只会把使用到的成员打包到结果中
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggList: [] // 搜索建议数据
    }
  },
  watch: {
    searchText: {
      // 当searchText发生变化时,就会调用handler函数(注意handler是固定的)
      // 优化前的处理方法:
      // handler(value) {
      //   console.log(value)
      //   this.loadSuggestionList(value)
      // },

      // 优化后处理方法 debounce函数: 参数1: 一个函数, 参数2: 延迟时间,单位是毫秒, 返回值:防抖之后的函数
      handler: debounce(function (value) {
        this.loadSuggestionList(value)
      }, 200),
      immediate: true // 该回调会在侦听开始之后立即被调用
    }
  },
  methods: {
    async loadSuggestionList(q) {
      try {
        const { data } = await suggestionList(q)
        this.suggList = data.data
      } catch (error) {}
    },
    highlight(val) {
      const highText = `<span class="active">${this.searchText}</span>`
      // 正则表达式中 // 中间的内容都会当做匹配字符来使用,而不是数据变量
      // 如果需要根据数据变量动态创建正则表达式,则手动 new RexExp
      // 参数1: 匹配模式字符串,他会根据这个字符串创建正则对象
      // 参数2: 匹配模式,要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return val.replace(reg, highText)
    }
  }
}
</script>

<style lang="less" scope>
.search-suggestion {
  span.active {
    color: blue;
  }
}
</style>