<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button class="search-btn" slot="title" type="info" size="small" icon="search" round>搜索</van-button>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "HomeIndex",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {},
};
</script>

<style scoped lang="less">
.home-container {
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
}
</style>
