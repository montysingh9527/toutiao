<template>
    <!-- 编辑性别组件 -->
  <div class="update-gender">
        <!-- 选择框   默认选中值:default-index -->
      <van-picker title="性别" show-toolbar :columns="columns" :default-index="value"
        @confirm="onUpdateGender"  @cancel="$emit('close')"  @change="onChangeGender"/>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  components: {},
  props: {
      value: {    // 父组件 v-model 的值
          type: Number,
          require: true
      }
  },
  data() {
    return {
        columns: ['男', '女'],   // 性别选择项
        numGender: this.value    // 选择的索引值 性别，0-男，1-女
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
      // 更新性别
    async onUpdateGender() {
        this.$toast.loading({
            loading: '更新性别中...',
            forbidClick: true,    // 禁止背景点击
            duration: 0    // 持续展示
        })
         try{
             updateUserProfile({
                gender: this.numGender
             })
             // 更新个人信息视图
             this.$emit('input', this.numGender)
             // 关闭编辑性别弹窗
             this.$emit('close')
             this.$toast.success('更新性别成功!')
         }catch(err){
             this.$toast.fail('更新性别失败！')
         }        
      },
      // @change 选项改变时触发	单列：Picker 实例，选中值，选中值对应的索引
      onChangeGender(picker, value, index){
          this.numGender = index
        //   console.log(value)
        //   console.log(index)
      }
  },
};
</script>

<style scoped lang="less">
</style>
