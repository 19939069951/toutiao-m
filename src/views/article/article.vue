<template>
  <div class="article">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- 加载完成--文章详情 -->
      <div v-else-if="article !== null && article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            :src="article.auth_photo"
            fit="cover"
          ></van-image>
          <!-- src="https://img.yzcdn.cn/vant/cat.jpeg" -->
          <div class="user-name" slot="title">{{ article.auth_name }}</div>
          <div class="publish-date" slot="label">
            {{ article.pupdate | relativeTime }}
          </div>
          <van-button
            v-if="article.is_followed"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            @click="onFollow"
            icon="plus"
            >关注</van-button
          >
          <van-button
            v-else
            @click="onFollow"
            class="follow-btn"
            round
            size="small"
            >已关注</van-button
          >
        </van-cell>
        <!-- 文章内容 -->
        <div class="article-content" ref="article-content">
          {{ article.content }}
        </div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <!-- <van-button class="comment-btn" type="default"></van-button> -->
          <van-goods-action>
            <van-goods-action-button
              type="info"
              text="评论"
              @click="onClickButton"
            />
            <van-goods-action-icon icon="comment-o" @click="onClickIcon" />
            <van-goods-action-icon icon="star-o" @click="onClickIcon" />
            <van-goods-action-icon icon="good-job-o" @click="onClickIcon" />
            <van-goods-action-icon icon="share-o" @click="onClickIcon" />
          </van-goods-action>
        </div>
      </div>
      <!-- 加载失败:404 -->
      <div v-else-if="errorStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除!</p>
      </div>
      <!-- 加载失败:其他位置错误,如网络原因或服务端异常 -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败!</p>
        <van-button class="retry-btn" round @click="getArticleDetail"
          >点击重试</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { articleDetail } from '@/api/home'
import { ImagePreview } from 'vant'
export default {
  name: 'Article',
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      article: null, // 文章数据
      loading: true, // 加载中
      errorStatus: 0 // 失败状态
    }
  },
  created() {
    this.getArticleDetail(this.articleId)
  },
  methods: {
    async getArticleDetail(id) {
      this.loading = true
      try {
        const { data } = await articleDetail(id)
        if (Math.random() > 0.5) {
          JSON.parse('dadafwew')
        }
        // 数据驱动视图这件事不是立即的
        this.article = data.data
        // 初始化图片点击预览
        // this.$nextTick(()=>{
        //   this.previewImage
        // })
        setTimeout(this.previewImage, 0)
      } catch (error) {
        if (error.response && error.response === 404) {
          this.errorStatus = 404
        }
      }
      this.loading = false
    },
    previewImage() {
      // 处理图片预览
      // 得到所有的img节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((element, index) => {
        images.push(element.src)
        element.onclick = () => {
          ImagePreview({
            // 预览的图片地址数组
            images,
            // 起始位置,从0开始
            startPosition: index
          })
        }
      })
    },
    onFollow() {
      // 关注取消关注
      this.article.is_followed = !this.article.is_followed
    }
  }
}
</script>

<style lang="less" scope>
.article {
  .page-nav-bar {
    height: 98px;
  }
  .main-wrap {
    padding: 16px;
    height: calc(100vh - 98px);
    box-sizing: border-box;
    .article-detail {
      .article-title {
        font-size: 28px;
      }
      .user-info {
        .avatar {
          margin-right: 20px;
          width: 64px;
          height: 64px;
        }
        .user-name {
          font-size: 26px;
        }
        .publish-date {
          font-size: 16px;
        }
        .follow-btn {
          height: 64px;
          width: 150px;
        }
      }
      .article-content {
        padding: 10px;
        font-size: 24px;
      }
    }
    .error-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      .text {
        font-size: 28px;
      }
      .retry-btn {
        height: 64px;
        font-size: 24px;
      }
    }
  }
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 80px;
    background-color: antiquewhite;
  }
}
</style>