<template>
  <!-- 编辑头像组件 -->
  <div class="update-photo">
    <img class="img" :src="img" ref="img">

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm">完成</div>
    </div>
  </div>
</template>

<script>
// 引入cropperjs处理图片裁剪 https://github.com/fengyuanchen/cropperjs
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
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

    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const image = this.$refs.img
    const cropper = new Cropper(image, {
      viewMode: 1,  // 限制裁剪框不超过画布的大小。
      dragMode: 'move',   // 定义裁剪框的初始纵横比
      aspectRatio: 1 ,     // 显示比例 默认16 / 9
      autoCropArea: 1 ,     // 自动截取比例
      cropBoxMovable: false,  // 裁剪框是否可移动
      cropBoxResizable: false, // 裁剪框是否可缩放
      background: false,      // 是否显示默认背景
      moveble: true         // 图片是否可移动
    });
    console.log(cropper)
  },
  methods: {},
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
