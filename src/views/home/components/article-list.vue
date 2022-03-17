<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      success-text="刷新成功"
      success-duration="2000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item v-for="item in list" :key="item.id" :article="item"></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { channelList } from '@/api/home'
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      refreshing: false, // 控制下拉刷新状态
      list: [], // 存储列表数据
      loading: false, // 控制加载中loading状态
      finished: false, // 控制数据加载结束的状态
      error: false // 控制列表加载失败的提示状态
    }
  },
  methods: {
    // onLoad() { // 初始化后触发一次load事件,用于加载第一屏的数据,如果一次请求的数据较少,会再调用一次直到数据充满屏幕
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     // 加载状态结束
    //     this.loading = false
    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
    async onLoad() {
      // 获取列表数据
      try {
        const { data } = await channelList({ id: this.channel.id })
        this.list.push(...data.data.data)
        this.loading = false
        if (data.data.length) {
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        const { data } = await channelList({ id: this.channel.id })
        this.list.unshift(...data.data.data)
        this.loading = false
        this.refreshing = false
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scope>
.article-list{
  height: 80vh;
  overflow-y: auto;
}
</style>