<template>
  <!-- 文章评论列表 -->
  <!-- 是否在初始化时立即执行滚动位置检查	:immediate-check -->
  <div class="comment-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :immediate-check="false"
        >
        <!--文章评论列表组件 types:评论类型'a'/'b'   :comment-floor：计算楼层  -->
        <comment-item :types="types" @reply-click="$emit('reply-click', $event)" v-for="(item, index) in list" :key="index" :comments="item" :comment-floor="list.length - index"/>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: "CommentList",
  components: {
      CommentItem
  },
  props: {
      artId: {
          type: [Number, String],
          required: true
      },
      // 文章评论列表
      list: {
        type: Array,
        default: () => []   // 设置默认值
      },
      // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
      types: {
        type: String,
        default: 'a',  // 默认为a
        // 自定义验证函数
        validator(value) {
          return ['a', 'c'].includes(value) // 这个值必须匹配下列字符串中的一个
        }
      }
  },
  data() {
    return {
        // list: [],   // 文章评论列表
        loading: false,     // loading状态
        finished: false,    // 加载完成状态
        offset: null,  // 获取下一页数据的标记
        limit: 10,  // 每页数据
        error: false,
    };
  },
  computed: {},
  watch: {},
  created() {
      // 当你收到初始化onLoad是,它不会自动开始初始的loading。所以要手动开启初始loading
      this.loading = true
      this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        // 1、请求获取文章评论数据
        const { data } = await getComments({
            type: this.types,      // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
            source: this.artId ,        // 源id，文章id或评论id
            offset: this.offset ,        // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
            limit: this.limit	// 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        // 2、将数据添加到列表中 将total_count重命名为totalCount
        // const { results, total_count:totalCount } = data.data
        // 2、将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        // 把文章评论的总数量传递给父组件
        this.$emit('onload-success', data.data)
        // 3、将loading设置为false
        this.loading = false;
        // 4、判断是否还有数据
        if(results.length){
            // 4.1、有数据获取下一页数据
            this.offset = data.data.last_id
        } else {
            // 4.2、 没有就将finished设置为结束
            this.finished = true
        }
        console.log('文章的评论=>',data)
      } catch(err) {
          this.error = true;
          this.loading = false
      }
    },
  },
};
</script>

<style scoped lang="less">
</style>
