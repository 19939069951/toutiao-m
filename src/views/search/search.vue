<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="onFocus"
        @cancel="onCancel"
      />
    </form>
    <!-- 搜索结果-->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggestion>
    <!-- 搜索历史记录 -->
    <search-history v-else :search-historys="searchHistorys" @search="onSearch" @clear-histories="searchHistorys = []"></search-history>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/stroage'
export default {
  name: 'Search',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      searchText: '',
      searchHistorys: getItem('HISTORY') || [], // 搜索历史
      isResultShow: false // 控制搜索结果的展示
    }
  },
  watch: {
    searchHistorys(val) {
      setItem('HISTORY', val)
    }
  },
  methods: {
    onSearch(val) {
      // 输入框回车时触发
      // 让文本框的数据修改为点击的数据
      this.searchText = val
      // 记录搜索历史记录,不能有重复历史记录,最新排在最前面
      const index = this.searchHistorys.indexOf(val)
      if (index !== -1) {
        this.searchHistorys.splice(index, 1)
      }
      this.searchHistorys.unshift(val)
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    },
    onFocus() {
      // input输入框获取焦点时触发
      this.isResultShow = false
    }
  }
}
</script>

<style lang="less" scope>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>