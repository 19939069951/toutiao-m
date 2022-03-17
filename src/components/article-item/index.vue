<template>
<!-- :to="`/article/${article.id}`" -->
<!-- :to="{name: 'Article',params:{articleId: article.id}}" -->
  <van-cell class="article-item" :to="'/article/'+article.id">
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.imgType === 3">
        <div class="cover-item" v-for="ele in article.imgType" :key="ele">
          <van-image class="cover-item-img" fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.name }}</span>
        <span>{{ article.count }}评论</span>
        <span>{{ article.time | relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="article.imgType === 1"
      slot="default"
      class="right-cover"
      fit="cover"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scope>
.article-item{
  .title{
    font-size: 32px;
    color: #3a3a3a;
    font-weight: 500;
  }
  .van-cell__title{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .label-info-wrap{
    span{
      margin-right: 25px;
      font-size: 22px;
      color: #b4b4b4;
    }
  }
  .cover-wrap{
    display: flex;
    align-items: center;
    padding: 30px 0;
    .cover-item{
      flex: 1;
      height: 146px;
      &:not(:last-child){
        padding-right: 4px;
      }
      .cover-item-img{
        height: 146px;
        width: 100%;
      }
    }
  }
  .van-cell__value{
    padding-left: 25px;
    flex: unset;
    width: 232px;
    height: 146px;
  }
  .right-cover{
    width: 232px;
    height: 146px;
  }
}
</style>