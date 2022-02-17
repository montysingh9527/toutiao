<template>
  <!-- 编辑头像组件 -->
  <div class="update-photo">
    <img class="img" :src="img" ref="img">

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
// 引入cropperjs处理图片裁剪 https://github.com/fengyuanchen/cropperjs
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

import { updateUserPhoto } from '@/api/user'
export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
      img: {
          type: [String, Object],
          require: true
      }
  },
  data() {
    return {  
      cropper: null
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,  // 限制裁剪框不超过画布的大小。
      dragMode: 'move',   // 定义裁剪框的初始纵横比
      aspectRatio: 1 ,     // 显示比例 默认16 / 9
      // autoCropArea: 1 ,     // 自动截取比例
      cropBoxMovable: false,  // 裁剪框是否可移动
      cropBoxResizable: false, // 裁剪框是否可缩放
      background: false,      // 是否显示默认背景
      moveble: true         // 图片是否可移动
    });
    // console.log(cropper)
  },
  methods: {
    onConfirm() {
      // 基于服务端的裁切使用 getData 方法获取裁切参数
      // console.log(this.cropper.getData())

      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(blob => {
         this.updateUserPhoto(blob)
      })
    },
    async updateUserPhoto(blob){
       this.$toast.loading({
            loading: '更新头像中...',
            forbidClick: true,    // 禁止背景点击
            duration: 0    // 持续展示
        })
      try {
        // 如果接口要求 Content-Type	application/json 则传递普通 JavaScript 对象
        // updateUserPhoto({ photo: blob })

        // 如果接口要求 Content-Type 是multipart/form-data 则必须传递 FormData对象
        const formData = new FormData()
        formData.append('photo', blob, blob.type)
        const { data } = await updateUserPhoto(formData)
        console.log("更新头像update-photo==>", data)
        // 关闭弹出层
        this.$emit('close')
        // 更新视图头像
        this.$emit('update-photo', data.data.photo)
        this.$toast.success('更新头像成功。')
      }catch({ response }) {
        if (response.status === 401) {
          this.$toast.fail('请登录后重试！')
        } else if (response.status === 507) {
          this.$toast.fail('数据库异常，图片保存失败')
        }
      }
    }
  },
};
</script>

<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
   .img {
     max-width: 100%;
     display: block;
   }
   .toolbar {
     position: fixed;
     left: 0;
     right: 0;
     bottom: 0;
     display: flex;
     justify-content: space-between;
     .cancel, .confirm {
       width: 90px;
       width: 90px;
       font-size: 30px;
       display: flex;
       justify-content: center;
       align-items: center;
       color: #fff;
     }
   }
}
</style>
