<template>
    <!-- 编辑昵称组件 -->
  <div class="update-name">
      <!-- 顶部 -->
      <van-nav-bar title="编辑昵称" left-text="取消" right-text="完成"
       @click-left="$emit('close')" @click-right="onUpdateName" />
        <!-- 输入框 -->
      <div class="field-warp">
        <van-field v-model.trim="message" rows="2" autosize type="textarea"
        maxlength="11"  placeholder="请输入昵称..."  show-word-limit/>
      </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  components: {},
  props: {
      value: {    // 父组件 v-model 的值
          type: String,
          require: true
      }
  },
  data() {
    return {
        message: this.value  // 输入的昵称
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
      // 更新昵称
    async onUpdateName(){
        this.$toast.loading({
            loading: '更新昵称中...',
            forbidClick: true,    // 禁止背景点击
            duration: 0    // 持续展示
        })
         try {
           const localName = this.message
           if (!localName.length){   
               this.$toast('昵称不能为空')
               return
           }
           await updateUserProfile({
              name: localName
            })           
            // 更新个人信息视图
            this.$emit('input',localName)
            // 关闭编辑昵称弹窗
            this.$emit('close')
            this.$toast('更新昵称成功')
         }catch(err){
             this.$toast.fail('更新昵称失败！')
         }
        
      }
  },
};
</script>

<style scoped lang="less">
.update-name {
    .field-warp {
        padding: 10px;
    }
}
</style>
