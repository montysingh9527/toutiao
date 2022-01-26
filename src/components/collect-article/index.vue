<template>
     <!-- 文章详情—收藏组件 -->
  <van-icon @click="onCollect" :name="value ? 'star':'star-o'" :loading="loading" />
</template>

<script>
import { addCollect, deleteCollect} from '@/api/user'
export default {
  name: 'CollectArticle',
  components: {},
  props: {
      value: {
          type: Boolean,
          required: true
      },
      // 文章id
      artId: {  
          type: [Number, String],
          required: true
      }
  },
  data() {
    return {
        loading: false  // 收藏时显示加载
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
     async onCollect(){
         this.loading = true   
          try {
            // 判断当前是否收藏
            if(this.value){
                // 已收藏，则取消收藏
               await deleteCollect(this.artId)
            }else{
                // 未收藏，添加收藏
               await addCollect(this.artId)
            }
            // 提交父组件更新状态。自定义事件修改数据并不是立即的
            this.$emit('input', !this.value)
            this.$toast(!this.value ? '收藏成功' : '已取消收藏')
          } catch(err) {
              this.$toast.fail('操作失败，请重试！')
          }
          this.loading = false
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
