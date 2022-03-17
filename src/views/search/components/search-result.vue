<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败,请点击重试"
    >
      <van-cell v-for="item in list" :key="item.id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { searchResult } from '@/api/suggestion'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false // 控制是否报错
    }
  },
  methods: {
    async onLoad() {
      try {
        const params = { q: '黑' }
        const { data } = await searchResult(params)
        this.list.push(...data.data)
        this.loading = false
        if (Math.random() > 0.5) {
          JSON.parse('adafafafa')
        }
        // 判断是否还有数据
        if (this.list.length > 90) {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style>
</style>