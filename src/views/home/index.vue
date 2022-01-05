<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" type="info" size="small" icon="search" round>搜索</van-button>
    </van-nav-bar>
    
    <!-- 频道列表 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画，通过 swipeable 属性可以开启滑动切换标签页。-->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="channels.name" v-for="channels in channelsList" :key="channels.id">
        <!-- 文章列表组件 -->
        <article-list :channel="channels"/>
      </van-tab>
      <!-- 添加占位符充当内容区域：解决滑动到最后更多图标遮挡文字 -->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup v-model="isChannelEditShow"
     closeable position="bottom" 
     :style="{height: '100%'}">
     <channel-edit :channelsEdit="channelsList" :activeId="active" @update-active="onUpdateActive"/>
     </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
export default {
  name: "HomeIndex",
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data() {
    return {
      active: 0,  // 激活的标签项，其实就是索引
      channelsList: [], // 频道数据
      isChannelEditShow: false   // 控制编辑弹出层展示
    };
  },
  computed: {},
  watch: {},
  created() {
    this._getUserChannels()
  },
  methods: {
    _getUserChannels() {
      getUserChannels().then(res=>{
        this.channelsList =  res.data.data.channels
      }).catch(err=>{
        this.$toast('获取用户频道数据失败',err)
      })
    },
    // 接收子组件传递过来的index 和 布尔值
    onUpdateActive(index, isChannelEditShow = true) {
      // 更新激活的频道项
      this.active = index
      // 是否关闭编辑弹窗，看子组件onMyChannelClick()方法传过来的布尔值
      this.isChannelEditShow = isChannelEditShow
    }
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  // 要想改变组件自带的样式属性，添加 /deep/
  /deep/.van-nav-bar__title {
      max-width: unset;
  }
  .page-nav-bar{
    background-color: #3296fa;
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
  // /deep/ 深度操作符
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #808080;
    }
    .van-tab--active {
      color: 	#FF6347;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: .9;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
    // 添加占位符充当内容区域：解决滑动到最后更多图标遮挡文字 
    .placeholder {
      flex-shrink: 0; // flex-shrink不参与flex布局计算
      width: 66px;
      height: 82px;
    }
  }
}
</style>
