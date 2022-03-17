<template>
  <div class="my-container">
    <!-- 登录头部 -->
    <div v-if="user" class="header user-info">
      <div class="base-info" v-if="userInfo">
        <div class="left">
          <van-image
            v-if="userInfo.avatar"
            round
            fit="cover"
            class="avator"
            :src="userInfo.avatar"
          />
          <van-image
            v-else
            round
            fit="cover"
            class="avator"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <span class="text">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-status" v-if="userInfo">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <div class="phone">
          <i class="toutiao toutiao-shouji"></i>
        </div>
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- ceil导航 -->
    <van-cell title="消息通知" is-link />
    <input type="file" hidden ref="file" @change="onFileChange" />
    <van-cell title="小智同学" is-link @click="onFile" />
    <van-cell
      v-if="user"
      clickable
      @click="onLogout"
      class="logout-cell"
      title="退出登录"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'My',
  computed: {
    ...mapState(['user'])
  },
  data() {
    return {
      userInfo: null
    }
  },
  created() {
    // 如果用户登录,加载用户信息
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (error) {}
    },
    onLogout() {
      // 退出提示
      // 在组件中需要使用this.$dialog来调用弹框组件
      this.$dialog
        .confirm({
          title: '确认退出吗?'
        })
        .then(() => {
          // 确认退出: 清楚登录状态(缓存清掉和vuex中的数据)
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // 取消执行这里的代码
        })
    },
    // 添加图片
    onFile() {
      this.$refs.file.click()
    },
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      const data = window.URL.createObjectURL(file)
      console.log(data)
      // 基于文件对象获取blod数据
    }
  }
}
</script>

<style lang="less" scope>
.my-container {
  .header {
    height: 361px;
    background-color: #2187ff;
  }
  .not-login {
    display: flex;
    align-items: center;
    justify-content: center;
    .login-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 140px;
      height: 170px;
      .phone {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 120px;
        background-color: #fff;
        border-radius: 50%;
        .toutiao {
          font-size: 60px;
          color: #2187ff;
        }
      }
      .text {
        margin-top: 10px;
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 76px 32px 32px;
      height: 231px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avator {
          width: 130px;
          height: 130px;
          border: 2px solid #fff;
        }
        .text {
          margin-left: 23px;
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-status {
      display: flex;
      align-items: center;
      height: 130px;
      .data-item {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  // 导航
  .grid-nav {
    margin-bottom: 10px;
    .grid-item {
      height: 141px;
      .toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        font-size: 38px;
        color: #ff9d1d;
      }
      .text {
        font-size: 28px;
      }
    }
  }
  // 退出登录按钮
  .logout-cell {
    margin-top: 10px;
    text-align: center;
    color: #eb5253;
  }
}
</style>