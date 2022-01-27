<template>
    <!-- 文章详情—点赞组件 -->
  <van-icon @click="onLike" :name="value===1 ? 'good-job':'good-job-o'" />
</template>

<script>
import { addLike, deleteLike} from '@/api/user'
export default {
  name: 'LikeArticle',
  components: {},
  props: {
      value: {
          type: Number,
          required: true
      },
      // 文章id
      artId: {  
          type: [Number, String],
          required: true
      }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
     async onLike(){
          try {
            let attitudeStatus = -1
            // 判断当前是否点赞  0-不喜欢，1-点赞，-1-无态度
            if(this.value === 1){
                // 已点赞，则取消点赞
               await deleteLike(this.artId)
            }else{
                // 未点赞，添加点赞
               await addLike(this.artId)
               attitudeStatus = 1
            }
            // 提交父组件更新状态。自定义事件修改数据并不是立即的
            this.$emit('input', attitudeStatus)
            this.$toast.success(attitudeStatus === 1 ? '点赞成功' : '已取消点赞')
          } catch(err) {
              if(err.response === 401){
                  this.$toast.fail('你还未登录，请登录后重试！')
              } 
              this.$toast.fail('操作失败，请重试！')
          }
      }
  },
};
</script>

<style scoped lang="less">
.collected {
    .van-icon {
        color: #ffa500;
    }
}
</style>
