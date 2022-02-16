<template>
    <!-- 编辑生日组件 -->
  <div class="update-birthday">
    <!-- 时间选择框 
       currentDate：双向绑定了日期选择器，设置日期选择器的默认值，同步日期选择器选择的值
       confirm：点击完成按钮时触发的事件
       cancel：点击取消按钮时触发的事件
    -->
    <van-datetime-picker @cancel="$emit('close')" @confirm="onUpdateBirthday"  
    v-model="currentDate" type="date" title="选择年月日"
    :min-date="minDate" :max-date="maxDate" />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  components: {},
  props: {
      value: {    // 父组件 v-model 的值 1990-11-20
          type: String,    
          require: true
      }
  },
  data() {
    return {
        minDate: new Date(1980, 0, 1),   // 允许选择的最小值（最小时间）
        maxDate: new Date(),             // 允许选择的最大时间,当前时间
        currentDate: new Date(this.value), // new Date('1990-11-20') Tue Nov 20 1990 08:00:00 GMT+0800 (中国标准时间) 
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
      // 更新生日
    async onUpdateBirthday() {
        this.$toast.loading({
            loading: '更新生日中...',
            forbidClick: true,    // 禁止背景点击
            duration: 0    // 持续展示
        })
         try{
             // 转换日期 Tue Nov 20 1990 00:00:00 GMT+0800 (中国标准时间) 转换为 1990-11-20
             const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
             updateUserProfile({
                birthday: currentDate
             })
             // 更新个人信息视图
             this.$emit('input', currentDate)
             // 关闭编辑生日弹窗
             this.$emit('close')
             this.$toast.success('更新生日成功。')
         }catch(err){
             this.$toast.fail('更新生日失败！')
         }        
      },
  },
};
</script>

<style scoped lang="less">
</style>
