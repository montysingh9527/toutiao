<template>
  <!-- 回复评论组件 -->
  <div class="comment-reply">
      <van-nav-bar :title="comments.reply_count > 0 ? `${comments.reply_count}条回复` : '没有回复'">
          <van-icon @click="$emit('close')" slot="left" name="cross" />
      </van-nav-bar>
      <div class="scroll-wrap">
        <!-- 评论列表 -->
        <comment-item :comments="comments" />
        <van-cell title="全部回复" />
        <!-- 评论回复列表 -->
        <comment-list :art-id="comments.com_id" types="c" :list="commentList" />
      </div>
      <!-- 发布评论 -->
      <div class="post-wrap">
        <van-button @click="isPostShow = true" class="post-btn" size="small" round>写评论</van-button>
      </div>
      <!-- 发布评论组件 -->
      <van-popup v-model="isPostShow" position="bottom">
        <comment-post :targetId="comments.com_id" @post-success="onPostSuccess" />  
      </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item'   // 评论列表
import CommentList from './comment-list'   // 回复列表
import CommentPost from './comment-post'    // 回复评论
export default {
  name: 'CommentReply',
  components: {
      CommentItem,
      CommentList,
      CommentPost
  },
  props: {
      comments: {
          type: Object,
          required: true
      }
  },
  data() {
    return {
      isPostShow: false,
      commentList: []   // 回复评论列表
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onPostSuccess(data) {
      console.log(data)
      // 更新回复的数量
      this.comments.reply_count++
      // 关闭弹层
      this.isPostShow = false
      // 将最新回复的内容展示到列表的顶部
      this.commentList.unshift(data.new_obj)
    }
  },
};
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
