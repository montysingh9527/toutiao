<template>
  <!-- 编辑头像组件 -->
  <div class="update-photo">
    <img class="img" :src="img" >

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm">完成</div>
    </div>
  </div>
</template>

<script>
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
  methods: {},
};
</script>

<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
   .img {
     max-width: 100%;
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
