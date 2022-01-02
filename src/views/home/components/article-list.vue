<template>
    <!-- 文章列表组件 -->
    <div class="article-list">
        <!-- List列表组件：瀑布流滚动加载,用于展示长列表 -->
        <van-list v-model="loading" :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad">
            <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
        </van-list>
    </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
name:'ArticleList',
components:{},
props:{
    channel: {
        type: Object,
        required: true
    }
},
  data() {
    return {
    list: [],    // 存储列表数据的数组
    loading: false,  // 控制加载中 loading状态
    finished: false,  // 控制数据加载结束的状态
    timestamp: null,  // 请求获取下一页数据的时间戳
    error: false    // 控制列表加载失败的提示状态
    }
  },
computed:{},
watch:{},
created() {},
methods: {
    // 初始化或滚动到底部的时候回触发调用onload
    async onLoad() {
      try{
        // 1、请求获取数据
       const { data } = await getArticles({
           channel_id: this.channel.id,   // 频道id
           timestamp: this.timestamp || Date.now(),  // 请求数据的页码,Date.now()当前最新事件戳 ,this.timestamp 请求之后数据的时间戳 
           with_top: 1    // 是否包含置顶
       })
        // 2、把请求结果数据放到list数组中
       const { results } = data.data
       // 数组的展开操作符,它会把数组元素一个一个拿出来
       this.list.push(...results)
    //    console.log('results',data)       
       // 3、本次数据加载结束之后要把加载状态设置为结束,loading关闭以后才能触发下一次的加载更多
       this.loading = false
       // 4、判断数据是否全部加载完成。如果没有数据了,把finished设置为true,之后不再触发加载更多
       if(results.length){
           // 更新获取下一页数据的时间戳
           this.timestamp = data.data.pre_timestamp
       } else {
           // 没有数据了,将finished设置为true,不再loading加载更多
           this.finished = false
       }
      } catch (err){
          this.error = true  // 展示错误提示状态
          this.loading = false   // 请求失败了,loading关闭      
      }
    },
  }
}
</script>

<style scoped lang="less">

</style>
