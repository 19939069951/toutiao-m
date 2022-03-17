<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- tabbar 开启路由模式之后,v-modle="active" 就失去效果了,因为路径没变,所以active就失去效果了-->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/question">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">{{$store.state.user ? '我的' : '未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
    }
  }
}
</script>

<style lang="less" scope>
.layout-container{
  .layout-tabbar{
    .toutiao{
      font-size: 40px;
    }
    span.text{
      font-size: 20px;
    }
  }
}
</style>
