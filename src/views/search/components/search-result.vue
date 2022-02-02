<template>
    <!-- 历史记录 -->
  <div class="search-result">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="加载搜索结果失败，请点击重试！"
        >
        <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchRearch } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
      searchText: {
          type: String,
          required: true
      }
  },
  data() {
    return {
        list: [],      // 存储搜索结果
        loading: false,    // 控制加载中 loading状态
        finished: false,   // 控制数据加载结束的状态
        page: 1,           // 页码
        per_page: 15,     // 每页数量
        error: false,    // 展示加载失败的状态
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
   async onLoad() {
     try {
       // 1、请求获取数据
        const { data } = await getSearchRearch({
            page: this.page,     // 页码
            per_page: this.per_page,  // 每页数量
            q: this.searchText    // 搜索关键词
        })
        // 2、将数据添加到数组列表中
       const { results } = data.data
       // 数组的展开操作符,它会把数组元素一个一个拿出来
       this.list.push(...results)
        // 3、将本次加载中的loading关闭
        this.loading = false
        // 4、判断是否还有数据。如果有,则更新获取下一个数据的页码; 如果没有,则将加载中状态finished设置为结束
        if(results.length) {
          this.page++
        } else{
          this.finished = true
        }        
        console.log('搜索结果==>',results)
     } catch(err) {
       this.error = true  // 展示加载失败提示状态
       this.loading = false   // 请求失败了,loading关闭 
     }  
    },
  },
};
</script>

<style scoped lang="less">
</style>
