<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        type="number"
        maxlength="11"
        :rules="userFormRules.mobile"
        name="mobile"
        placeholder="请输入手机号"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        :rules="userFormRules.code"
        name="code"
        type="number"
        maxlength="6"
        placeholder="请输入验证码"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!--time: 倒计时时间  -->
          <van-count-down v-if="isCountDownShow" @finish="isCountDownShow = false" :time="1000 * 60" format="ss s" />
          <van-button
            v-else
            class="send-msg"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, codes } from '@/api/user'
export default {
  name: 'Login',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false // 是否显示倒计时
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 获取验证码
    async onSendSms() {
      // 1.先验证手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        console.log(err)
        return null
      }
      // 2.验证通过,显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await codes(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        console.log(err)
        this.isCountDownShow = false
        this.$toast('发送太频繁,请稍后重试')
      }
    },
    // 登录
    async onSubmit(values) {
      // 万能账号验证码 13911111111 246810
      console.log('submit', values)
      const user = this.user
      // 在组件中必须通过this.$toast 来调用toast组件
      this.$toast.loading({
        message: '登录中...',
        duration: 0, // 持续展示 toast
        forbidClick: true // 禁用背景点击
      })
      try {
        const res = await login(user)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        // 登录成功跳转到原来页面
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败,请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .van-form {
    .toutiao {
      font-size: 37px;
    }
    .send-msg {
      width: 156px;
      height: 46px;
      line-height: 46px;
      background-color: #ededed;
      .van-button__content {
        font-size: 22px;
        .van-button__text {
          font-size: 24px;
          color: #666;
        }
      }
    }
    .login-btn-wrap {
      margin: 53px 33px;
      background-color: #6db4fb;
      .van-button {
        border: none;
      }
    }
  }
}
</style>
