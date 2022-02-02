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
        class="like-btn"
        icon="good-job-o"
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
  methods: {}
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
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>