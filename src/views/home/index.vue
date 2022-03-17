<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar fixed class="page-nav-bar">
      <van-button
        slot="title"
        type="info"
        round
        to="/search"
        size="small"
        class="search-btn"
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- tabs animated:切换动画,swipeable: 手势滑动 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 文章列表 -->
        <article-list :channel="item"></article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="channelShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道弹出层 -->
    <van-popup
      v-model="channelShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit :my-channels="channels" :active-index="active" @addChanel="onAddChannel" @update-active="onChangeActive"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { channel } from '@/api/home'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
export default {
  name: 'Home',
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      channels: [], // 频道列表
      channelShow: false // 频道弹窗
    }
  },
  created() {
    this.getChannel()
  },
  methods: {
    async getChannel() {
      try {
        const { data } = await channel()
        this.channels = data.data.slice()
      } catch (error) {
        this.$toast('频道获取失败')
      }
    },
    onChangeActive(index, channelShow = true) {
      this.active = index
      this.channelShow = channelShow
    },
    onAddChannel(channel) {
      this.channels.push(channel)
    }
  }
}
</script>

<style lang="less" scope>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
      color: #fff;
    }
  }
  .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      height: 82px;
      z-index: 1;
    }
    .van-tabs__nav {
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 0;
    }
    .van-tab {
      min-width: 200px;
      flex: unset;
      font-size: 30px;
      color: #777;
      border-right: 1px solid #edeff3;
    }
    .van-tab:last-child {
      border-right: none;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      bottom: 8px;
      background-color: #3296fa;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 66px;
      height: 82px;
      line-height: 82px;
      background-color: #fff;
      opacity: 0.902;
      .toutiao {
        font-size: 36px;
      }
    }
    .placeholder {
      flex-shrink: 0;
      width: 64px;
      height: 82px;
    }
  }
}
</style>