<template>
    <!-- 搜索历史记录 -->
  <div class="search-history">
      <van-cell title="搜索历史记录">
          <span>全部删除</span>
          <span>完成</span>
          <van-icon name="delete-o" />          
      </van-cell>
      <van-cell title="单元格" value="内容">
          <van-icon name="close" />
      </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
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
</style>
