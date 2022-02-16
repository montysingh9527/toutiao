<template>
    <!-- 我的-用户资料 -->
  <div class="user-profile">
    <!-- 标题 -->
    <van-nav-bar @click-left="$router.back()" class="page-nav-bar" title="个人信息" left-arrow></van-nav-bar>
    <!-- 个人信息 -->
    <div>
      <van-cell title="头像" is-link>
        <van-image class="avatar" fit="cover" round
        :src="user.photo" />
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link/>
      <van-cell title="性别" :value="user.gender === 0 ? '男':'女' " is-link/>
      <van-cell title="生日" :value="user.birthday" is-link/>
    </div>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  components: {},
  props: {},
  data() {
    return {
      user: {       // 用户个人信息
        birthday:''  
      },
      
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
        this.user.birthday = data.data.birthday.split('T')[0]    // 1983-04-10。 原来格式birthday: "1983-04-10T16:00:00.000Z"
        console.log('用户个人信息=>',data.data)
      }catch(err) {
        this.$toast('请求数据错误！')
      }
    }
  },
};
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
