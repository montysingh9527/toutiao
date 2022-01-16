<template>
    <!-- 搜索历史记录 -->
  <div class="search-history">
      <van-cell title="搜索历史记录">
          <div v-if="isDeleteShow">            
            <span>全部删除</span>
            &nbsp;&nbsp;
            <span @click="isDeleteShow = false">完成</span>
          </div>
          <van-icon v-else name="delete-o" @click="isDeleteShow = true" />          
      </van-cell>
      <van-cell v-for="(item, index) in searchHistories" :key="index" :title="item">
          <van-icon v-show="isDeleteShow" name="close" />
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
    return {
      isDeleteShow: false     // 控制删除按钮显示状态
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {},
};
</script>

<style scoped lang="less">
</style>
