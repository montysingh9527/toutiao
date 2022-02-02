<template>
    <!-- 文章评论列表组件 -->
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comments.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="text-height">
        <van-tag type="primary">{{ commentFloor }}楼</van-tag>
        <div class="user-name">{{ comments.aut_name }}</div>
      </div>
      <van-button
        @click="onLiking(comments)"
        :class="['like-btn', comments.is_liking ? 'isliking' : '']"
        :icon="comments.is_liking ? 'good-job' : 'good-job-o'"
      >{{ comments.like_count || '赞' }}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ comments.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ comments.pubdate | formDate}}</span>
        <van-button
          class="reply-btn"
          round
        >回复 {{ comments.reply_count }}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addLiking, deleteLiking } from '@/api/comment'
export default {
  name: 'CommentItem',
  components: {},
  props: {
      comments: {
          type: Object,
          required: true
      }, 
      // 楼层显示
      commentFloor: {
          type: Number,
          required: true
      }     
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
      // 点赞评论
     async onLiking(){         
         try{
           // 判断是否已点赞评论
            if(this.comments.is_liking){
               // 如果已点赞，则取消点赞评论
                await deleteLiking(this.comments.com_id)
                this.comments.like_count--
            } else {
              // 如果没有点赞，则点赞评论 将comments.is_liking 设置为true
                await addLiking(this.comments.com_id)
                this.comments.like_count++
            }
            this.comments.is_liking = !this.comments.is_liking
            // this.comment.like_count += this.comment.is_liking ? 1 : -1
            // this.$toast.success(this.comment.is_liking ? '点赞成功' : '取消点赞')
         } catch(err) {
            this.$toast('点赞失败请重试！')
         }     
      }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text-height{
        display: inherit;
    }
    .user-name {
      color: #406599;
      font-size: 26px;
      margin: 0 10px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    &.isliking .van-icon{
        color: #ffa500;
    }
    .van-icon {
      font-size: 30px;      
    }
  }
}
</style>