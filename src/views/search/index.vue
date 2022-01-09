<template>
  <div class="search-container">
    <!-- 搜索栏 Start -->
      <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
        <form action="/">
            <van-search v-model="searchText" show-action
                background="#5babfb" placeholder="请输入搜索关键词"
                @search="onSearch"  @cancel="onCancel">
            </van-search>
        </form>
    <!-- 搜索栏 End -->

    <!-- 搜索历史记录 Start -->
    <search-history />
    <!-- 搜索历史记录 End -->

    <!-- 联想建议 Start -->
    <search-suggestion />
    <!-- 联想建议 End -->

    <!-- 历史记录 Start -->
    <search-result />
    <!-- 历史记录 End -->

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
        searchText:''
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSearch(val) {
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
