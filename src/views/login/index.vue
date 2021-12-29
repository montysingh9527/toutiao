<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="手机号"
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
        name="验证码"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button class="send-sms-code" round size="small" type="default"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user';
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
              pattern: /^1[2|3|4|5|8|9]\d{9}$/,
              message: '手机号格式错误'
          }],
          code: [{
              required: true,
              message: '验证码不能为空'
          },{
              pattern: /^\d{6}$/,
              message: '验证码格式错误'
          }],
      }
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
        console.log("登录成功", res);
        this.$toast.success('登录成功');
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误');
        } else {
          this.$toast.fail('登录失败,请稍后再试');
        }
      }
      // 4、根据请求响应结果处理后续操作
    },
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