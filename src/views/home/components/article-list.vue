<template>
    <!-- 文章列表组件 -->
    <div class="article-list">
        <!-- 下拉刷新组件 PullRefresh  -->
        <van-pull-refresh v-model="isFefreshLoading" :success-text="refreshSuccessText" :success-duration="1000" @refresh="onRefresh">
            <!-- List列表组件：瀑布流滚动加载,用于展示长列表 -->
            <van-list v-model="loading" :finished="finished"
                finished-text="没有更多了"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                @load="onLoad">
                <article-item v-for="(article, index) in list" :key="index" :article="article"/>
                <!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.title" /> -->
            </van-list>
        </van-pull-refresh>        
    </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
name:'ArticleList',
components:{
    ArticleItem
},
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
    error: false,    // 控制列表加载失败的提示状态
    isFefreshLoading: false,  // 控制下拉刷新的loading状态
    refreshSuccessText: ''   // 下拉刷新成功提示文本
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
    // 当下拉刷新的时候会调用该函数
    onRefresh(){
        // 1、请求获取数据
        getArticles({
           channel_id: this.channel.id,   // 频道id
           timestamp: Date.now(),  // 下拉刷新, 每次获取最新时间的数据
           with_top: 1    // 是否包含置顶
       }).then( res=> {
            /**测试代码：模拟刷新失败的情况
               if(Math.random() > 0.5){
                  JSON.parse('results')
            } */
           // 2、将数据追加到列表的顶部
           const { results } = res.data.data          
            //console.log('results',results)
           this.list.unshift(...results)
           // 3、关闭下拉刷新的laoding状态
            this.isFefreshLoading = false
            // 更新下拉刷新成功提示的文本
            this.refreshSuccessText = `刷新成功,更新了${results.length}条数据`
       }).catch((err)=>{
           this.refreshSuccessText = '刷新失败，请重试！'
           this.isFefreshLoading = false
       })  
        
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
    // 百分比单位是相对于父元素的
    //height: 100%;
    // vh视口单位,不受父元素影响。1vh = 可视窗口高度的百分之一 
    height: 79vh;
    overflow: auto;

}
</style>
