<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">
        <span class="title-text-left">我的频道</span>
        <span class="title-text-right">点击进入频道</span>
      </div>
      <van-button
        class="edit-btn"
        type="danger"
        @click="isEdit = !isEdit"
        plain
        round
        size="mini"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="channel.id"
        @click="onMyChannel(channel, index)"
      >
        <van-icon
          v-show="isEdit && channel.id !== 0"
          slot="icon"
          name="clear"
        ></van-icon>
        <span
          slot="text"
          :class="{ active: index === activeIndex }"
          class="text"
          >{{ channel.name }}</span
        >
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">
        <span class="title-text-left">推荐频道</span>
        <span class="title-text-right">点击标签添加频道</span>
      </div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="value in recommendChannel"
        icon="plus"
        :key="value.id"
        :text="value.name"
        @click="onAddChannel(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { allChannelList } from '@/api/home'
import { mapState } from 'vuex'
import { setItem } from '@/utils/stroage'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      totalChannels: [], // 所有频道信息
      isEdit: false // 控制编辑按钮的状态
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannel() {
      //   const channelsList = []
      //   this.totalChannels.forEach((ele) => {
      //     const ret = this.myChannels.find((item) => {
      //       return item.id === ele.id
      //     })
      //     console.log(ret)
      //     // 如果我的频道中不包括该频道,则收集到推荐频道中
      //     if (!ret) {
      //       channelsList.push(ele)
      //     }
      //   })
      //   return channelsList
      // }
      // 简化版
      return this.totalChannels.filter((ele) => {
        return !this.myChannels.find((item) => item.id === ele.id)
      })
    }
  },
  created() {
    this.getTotalChannel()
  },
  methods: {
    async getTotalChannel() {
      // 获取所有频道列表
      try {
        const { data } = await allChannelList()
        this.totalChannels = [...this.myChannels, ...data.data]
      } catch (error) {}
    },
    onAddChannel(channel) {
      // 添加频道标签
      // 判断是否登录,如果登录传给后端,未登录存储到缓存
      if (this.user) {
        // 登录的操作
      } else {
        // 未登录的操作
        setItem('channels', this.myChannels)
      }
      this.$emit('addChanel', channel)
    },
    onMyChannel(channel, index) {
      if (this.isEdit) {
        if (channel.id === 0) {
          this.$toast('固定频道不能删除!')
          return
        }
        // 编辑状态,执行删除频道
        if (index <= this.activeIndex) {
          // 让激活的频道的索引-1
          this.$emit('update-active', this.activeIndex - 1, true)
        }
        this.myChannels.splice(index, 1)
      } else {
        // 非编辑状态,执行切换频道
        this.$emit('update-active', index, false)
      }
    }
  }
}
</script>

<style lang="less" scope>
.channel-edit {
  padding: 85px 0;
  .title-text {
    .title-text-left {
      padding-right: 25px;
      font-size: 32px;
      color: #333;
    }
    .title-text-right {
      font-size: 24px;
      color: #c6c6c6;
    }
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 24px;
    line-height: 24px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 28px;
        color: #222;
      }
    }
  }
  .my-grid {
    .van-grid-item__content {
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
      .van-grid-item__text,
      .text {
        margin-top: 0;
        line-height: 100%;
        font-size: 28px;
      }
    }
    .van-icon-clear {
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 20px;
      color: #cacaca;
      z-index: 2;
    }
  }
  .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        padding-left: 0;
        padding-right: 0;
        flex-direction: row;
        .van-icon {
          padding-right: 4px;
          font-size: 28px;
        }
        .van-grid-item__text {
          margin-top: 0;
          line-height: 100%;
        }
      }
    }
  }
}
</style>