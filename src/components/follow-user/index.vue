<template>
    <!-- 文章详情—关注组件 -->
    <van-button @click="onFollow" v-if="isFollowed" class="follow-btn" round size="small">已关注</van-button>
    <van-button @click="onFollow" v-else class="follow-btn" type="info" color="#3296fa" size="small" icon="plus" round>关注</van-button>   
 
</template>

<script>
import { addFollow, deleteFollow} from '@/api/user'
export default {
  name: 'FollowUser',
  components: {},
  model: {
      prop: 'isFollowed', // 默认是value
      event:'update-is-followed' // 默认是input
  },
  props: {
      isFollowed: {
          type: Boolean,
          required: true
      },
      userId: {
          type: [Number, String, Object],
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
    // 文章详情关注用户
    async onFollow(){
      try{
        // 判断关注状态
        if(this.isFollowed){
          // 已关注 则取消关注
         await deleteFollow(this.userId)
         this.$toast('已取消关注！')
          // this.articles.is_followed = false
        } else {
          // 未关注 则关注
         await addFollow(this.userId)
         this.$toast.success('关注成功。')
          // this.articles.is_followed = true
        }
        // 更新关注状态 
        // this.articles.is_followed = !this.articles.is_followed
        // this.$emit('input',!this.value)
        this.$emit('update-is-followed',!this.isFollowed)
      }catch(err){
        let message = '请稍后重试！'
        if(err.response && err.response.status === 400){
          message = '你不能关注你自己！'
        } else if(err.response && err.response.status === 401){
          message = '请登录后再关注！'
        }
        this.$toast(message)
        console.log(err.response)
      }
    }
  },
};
</script>

<style scoped lang="less">
</style>
