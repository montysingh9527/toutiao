<template>
  <div class="search-container">
    <!-- 搜索栏 Start -->
      <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
        <form class="search-form" action="/">
            <van-search v-model="searchText" show-action
                background="#5babfb" placeholder="请输入搜索关键词"
                @search="onSearch"  @cancel="onCancel" @focus="isResultShow = false">
            </van-search>
        </form>
    <!-- 搜索栏 End -->

    <!-- 搜索结果 Start -->
    <!-- isResultShow如果有搜索结果 则展示 -->
    <search-result v-if="isResultShow" :search-text="searchText" />
    <!-- 搜索结果 End -->

    <!-- 联想建议 Start -->
    <!-- searchText如果有输入搜索内容 则展示 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"/>
    <!-- 联想建议 End -->

    <!-- 搜索历史记录 Start -->
    <search-history v-else :search-histories="searchHistories" @search="onSearch" @deleteAllText="searchHistories = []" />
    <!-- 搜索历史记录 End -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
export default {
  name: 'SearchPage',
  components: {
    SearchResult,
    SearchSuggestion,
    SearchHistory
  },
  props: {},
  data() {
    return {
        searchText:'',   // 搜索文字
        isResultShow: false,    // 控制搜索结果的展示
        searchHistories: [] // 搜索的历史记录数据
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    // 执行搜索
    onSearch(val) {
      this.searchText = val  // 更新文本框内容
       console.log('val',val);
      // 存储搜索历史记录。要求:不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.isResultShow = true  // 展示搜索结果
     
    },
    onCancel() {
      this.$router.back()
    },
  },
};
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
        color: #fff;
    }
  .search-form {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
  }
}

</style>
