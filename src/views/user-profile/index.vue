<template>
    <!-- 我的-用户资料 -->
  <div class="user-profile">
    <!-- 标题 -->
    <van-nav-bar @click-left="$router.back()" class="page-nav-bar" title="个人信息" left-arrow></van-nav-bar>
    <!-- 上传头像 hidden设置隐藏-->
    <input type="file" hidden ref="file" @change="onFileChange">
    <!-- 个人信息 -->
    <div>
      <!-- 上传头像  @click触发上传头像事件 input type="file" -->
      <van-cell title="头像" is-link center @click="$refs.file.click()">
        <van-image class="avatar" fit="cover" round
        :src="user.photo" />
      </van-cell>
      <van-cell @click="isUpdateNameShow = true" title="昵称" :value="user.name" is-link/>
      <van-cell @click="isUpdateGenderShow = true" title="性别" :value="user.gender === 0 ? '男':'女' " is-link/>
      <van-cell @click="isBirthdayShow = true" title="生日" :value="user.birthday" is-link/>
    </div>
    <!-- 个人信息END -->
    <!-- 编辑昵称弹窗 Start -->
    <van-popup v-model="isUpdateNameShow" position="right" :style="{ height: '100%', width:'100%' }">
      <update-name v-if="isUpdateNameShow" @close="isUpdateNameShow = false" v-model="user.name" />
    </van-popup>
    <!-- 编辑昵称弹窗 END -->

    <!-- 编辑性别弹窗 Start -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <update-gender v-if="isUpdateGenderShow" @close="isUpdateGenderShow = false" v-model="user.gender" />
    </van-popup>
    <!-- 编辑性别弹窗 END -->

    <!-- 编辑生日弹窗 Start -->
    <van-popup v-model="isBirthdayShow" position="bottom">
      <update-birthday v-if="isBirthdayShow" @close="isBirthdayShow = false" v-model="user.birthday" />
    </van-popup>
    <!-- 编辑生日弹窗 END -->

    <!-- 编辑头像弹窗 Start -->
    <van-popup v-model="isPhotoShow" position="bottom" style="height: 100%">
      <update-photo v-if="isPhotoShow" :img="img" @close="isPhotoShow = false" @update-photo="user.photo = $event" />
    </van-popup>
    <!-- 编辑头像弹窗 END -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'   // 编辑昵称组件
import UpdateGender from './components/update-gender'   // 编辑性别组件
import UpdateBirthday from './components/update-birthday'    // 编辑生日组件
import UpdatePhoto from './components/update-photo'    // 编辑头像组件
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: {},
  data() {
    return {
      user: {       // 用户个人信息
        birthday:''  
      },
      isUpdateNameShow: false,  // 控制昵称弹窗
      isUpdateGenderShow: false,   // 控制编辑性别弹窗
      isBirthdayShow: false,       // 控制编辑生日弹窗
      isPhotoShow: false,         // 控制编辑头像弹窗
      img: null,              // 预览的头像
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadUserProfile()
  },
  methods: {
    // 获取个人信息
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
        this.user.birthday = data.data.birthday.split('T')[0]    // 1983-04-10。 原来格式birthday: "1983-04-10T16:00:00.000Z"
        console.log('用户个人信息=>',data.data)
      }catch(err) {
        this.$toast('请求数据错误！')
      }
    },
    // 选择头像
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取 blob 数据
      this.img = window.URL.createObjectURL(file)
      console.log('选择的img=>',this.img)
      // 展示预览图片弹出层
      this.isPhotoShow = true
      // file-input 如果选了同一个文件不会触发 change 事件。解决办法就是每次使用完毕,把它的value清空
      this.$refs.file.value = ''
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
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
