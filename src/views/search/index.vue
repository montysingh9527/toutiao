<template>
  <div class="search-container">
    <!-- 搜索栏 Start -->
      <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
        <form action="/">
            <van-search v-model="searchText" show-action
                background="#5babfb" placeholder="请输入搜索关键词"
                @search="onSearch"  @cancel="onCancel" @focus="isResultShow = false">
            </van-search>
        </form>
    <!-- 搜索栏 End -->

    <!-- 搜索结果 Start -->
    <!-- isResultShow如果有搜索结果 则展示 -->
    <search-result v-if="isResultShow" />
    <!-- 搜索结果 End -->

    <!-- 联想建议 Start -->
    <!-- searchText如果有输入搜索内容 则展示 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" />
    <!-- 联想建议 End -->

    <!-- 搜索历史记录 Start -->
    <search-history v-else />
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
        isResultShow: false    // 控制搜索结果的展示
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSearch(val) {
        this.isResultShow = true  // 展示搜索结果
      console.log(val);
    },
    onCancel() {
      this.$router.back()
    },
  },
};
</script>

<style scoped lang="less">
.search-container {
    .van-search__action {
        color: #fff;
    }
}

</style>
