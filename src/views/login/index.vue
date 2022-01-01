<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        left-icon="smile-o"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
            <!-- time倒计时 CountDown -->
            <van-count-down v-if="isCountDownShow"
                :time="1000 * 6" format="ss s"
                @finish="isCountDownShow = false"/>
          <van-button v-else class="send-sms-code" round size="small" type="default" 
          native-type="button"
           @click="onSendSms" 
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
      <van-divider>账号：13611111111 密码：246810</van-divider>
      <van-divider>如果收不到验证码，请使用万能验证码：246810</van-divider>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user';
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '13611111111', // 手机号
        code: '246810', // 验证码
      },
      // 表单验证
      userFormRules: {
          mobile:[{
              required: true,
              message: '手机号不能为空'
          },{
              pattern: /^1[2|3|4|5|7|8|9]\d{9}$/,
              message: '手机号格式错误'
          }],
          code: [{
              required: true,
              message: '验证码不能为空'
          },{
              pattern: /^\d{6}$/,
              message: '验证码格式错误'
          }],
      },
      isCountDownShow: false    // 是否展示验证码倒计时
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    async onSubmit() {
      // 1、获取表单数据
      const user = this.user;
      // 2、表单验证

    //   在组件中必须通过this.$toast 来调用Toast组件
    this.$toast.loading({
        message: '登录中...',
        forbidClick: true,   // 禁用背景点击
        duration: 2000  // 持续时间,默认是2000。如果是0则持续展示
    });
      // 3、提交表单请求登录
      try {
        const res = await login(user);
        // 将提交登录数据存储到Vuex中，这里存储用户数据
        this.$store.commit('setUser',res.data.data)
        console.log("登录成功", res);
        this.$toast.success('登录成功');
        // 登录成功,跳转回原来的页面。back()的方式不严谨
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误');
        } else {
          this.$toast.fail('登录失败,请稍后再试');
        }
      }
      // 4、根据请求响应结果处理后续操作
    },
    // 发送验证码
    async onSendSms(){
        // 1、校验手机号
        try{
           await this.$refs.loginForm.validate('mobile')
        }catch(err){
            this.$toast.fail('手机号码输入错误');
            return
        }
        // 2、验证通过，显示倒计时
        this.isCountDownShow = true
        // 3、请求发送验证码 
        sendSms(this.user.mobile).then(res=>{
            console.log('验证码res',res)
            this.$toast('发送验证码成功')
        }).catch(err=>{
            // 发送失败，关闭倒计时
            this.isCountDownShow = false
            if(err.response.status === 404){
                this.$toast('手机号码不正确')
            }else{
                this.$toast('429发送次数受限,请稍后再试')
            }
            console.log('验证码err',err.response.status)
        })
    }
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-code {
    width: 165px;
    height: 46px;
    line-height: 46px;
    font-size: 12px;
    color: #666;
    background-color: #ededed;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>