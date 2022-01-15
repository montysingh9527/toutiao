<template>
    <!-- 搜索历史记录 -->
  <div class="search-history">
      <van-cell title="搜索历史记录">
          <span>全部删除</span>
          <span>完成</span>
          <van-icon name="delete-o" />          
      </van-cell>
      <van-cell v-for="(item, index) in searchHistories" :key="index" :title="item">
          <van-icon name="close" />
      </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
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
</style>
