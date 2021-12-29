<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="手机号"
        placeholder="请输入手机号"
        left-icon="smile-o"
        :rules="[{ required: false }]"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: false }]"
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
        mobile: '', // 手机号
        code: '', // 验证码
      },
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
      // 3、提交表单请求登录
      try {
        const res = await login(user);
        console.log("登录成功", res);
      } catch (err) {
        if (err.response.status === 400) {
          console.log("手机号或验证码错误");
        } else {
          console.log("登录失败", err);
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