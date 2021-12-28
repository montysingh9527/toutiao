<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录" />
    <van-form @submit="onSubmit">
      <van-field name="手机号" placeholder="请输入手机号" left-icon="smile-o">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field name="验证码" placeholder="请输入验证码">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button class="send-sms-code" round size="small" type="default"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSubmit() {},
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
  .login-btn-wrap{
      padding: 53px 33px ;
      .login-btn{
          background-color: #6db4fb;
          border: none;
      }
  }
}
</style>