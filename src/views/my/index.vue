<template>
  <div class="my-container">
    <div v-if="!user" class="header not-login" >
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录|注册</span>
      </div>
    </div>

    <!-- 已登录状态布局 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
            <van-image class="avatar" :src="userInfo.photo" fit="cover" round />
            <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- grid导航 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 消息通知、小智同学、退出登录 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" class="md9" is-link />
    <van-cell @click="onLogout" v-if="user" title="退出登录" class="lgout-cell" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: "MyIndex",
  components: {},
  props: {},
  data() {
    return {
      userInfo: {}  // 用户信息
    };
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    // 如果用户登录了,则请求用户信息
    if(this.user){
      this.loadUserInfo()
    }
  },
  methods: {
    onLogout(){
      // 退出登录提示
      this.$dialog.confirm({
        title: '确认退出吗？',
        }).then(() => {
          // 确认退出：清除登录状态(vuex容器中的user + localStorage本地存储的user)
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          console.log('取消')
        });
    },
    async loadUserInfo(){
      try{
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log('user',this.userInfo)
      } catch (err){
        this.$toast('获取用户数据失败')
      }
    }
  },
};
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover; // 图片完整填充屏幕
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  // 已登录样式
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;  // 将padding和boorder都计算在盒子内
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  // grid-nav 历史收藏
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .lgout-cell {
    text-align: center;
    color: #d86262;
  }
  .md9 {
    margin-bottom: 9px;
  }

}
</style>
