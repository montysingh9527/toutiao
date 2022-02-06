<template>
  <!-- 回复评论组件 -->
  <div class="comment-reply">
      <van-nav-bar :title="comments.reply_count > 0 ? `${comments.reply_count}条回复` : '没有回复'">
          <van-icon @click="$emit('close')" slot="left" name="cross" />
      </van-nav-bar>
      <!-- 评论列表 -->
      <comment-item :comments="comments" />
      <van-cell title="全部回复" />
      <!-- 评论回复列表 -->
      <comment-list :art-id="comments.com_id" types="c" />
  </div>
</template>

<script>
import CommentItem from './comment-item'   // 评论列表
import CommentList from './comment-list'   // 回复列表
export default {
  name: 'CommentReply',
  components: {
      CommentItem,
      CommentList
  },
  props: {
      comments: {
          type: Object,
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
