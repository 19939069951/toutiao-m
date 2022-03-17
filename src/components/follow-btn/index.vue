<!--
 * @Description: 关注用户公共button
 * @Author: Li Guangyin
 * @Date: 2022-03-17 13:50:40
 * @LastEditTime: 2022-03-17 13:56:22
-->
<template>
  <van-button
      v-if="isFollowed"
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      @click="onFollow"
      icon="plus"
      :loading="loading"
      >关注</van-button
    >
    <van-button v-else :loading="loading" @click="onFollow" class="follow-btn" round size="small"
      >已关注</van-button
    >
</template>

<script>
export default {
  name: 'FollowButton',
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onFollow() { // 关注取消关注
      this.article.is_followed = !this.article.is_followed
    }
  }
}
</script>

<style>
</style>