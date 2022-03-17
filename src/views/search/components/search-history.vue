<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDeleteShow">
        <span @click="$emit('clear-histories', [])">全部删除</span>&nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </template>
      <van-icon v-else @click="isDeleteShow = true" name="delete" />
    </van-cell>
    <van-cell v-for="(item, index) in searchHistorys" @click="onItemClick(item, index)"  :title="item" :key="index">
      <van-icon v-if="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistorys: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onItemClick(item, index) {
      if (this.isDeleteShow) {
        // 删除状态,删除历史记录数据
        this.searchHistorys.splice(index, 1)
      } else {
        // 非删除状态,直接进入搜索
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style>
</style>