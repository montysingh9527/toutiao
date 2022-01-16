<template>
    <!-- 搜索历史记录 -->
  <div class="search-history">
      <van-cell title="搜索历史记录">
          <div v-if="isDeleteShow">   
            <!--触发父组件的方法 @deleteAllText="searchHistories = []" -->
            <span @click="$emit('deleteAllText')">全部删除</span>
            &nbsp;&nbsp;
            <span @click="isDeleteShow = false">完成</span>
          </div>
          <van-icon v-else name="delete-o" @click="isDeleteShow = true" />          
      </van-cell>
      <van-cell @click="deleteText(item, index)" v-for="(item, index) in searchHistories" :key="index" :title="item">
          <van-icon v-show="isDeleteShow" name="close" />
      </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {    
    // Prop数据是受父组件数据影响的：
    // 1、如果是普通数据(数字、字符串、布尔值)绝对不能修改,即便改了也不会传递给父组件
    // 2、如果是引用类型数据(数组、对象)可以修改,例如[].push(xxx),对象.xxx=xxx ; 不能重新赋值 xxx=[]
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false     // 控制删除按钮显示状态
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    deleteText(item, index){
      if(this.isDeleteShow){
        // 如果是删除状态,则按索引删除一个元素
        this.searchHistories.splice(index, 1)
      } else {
        // 如果不是删除状态,点击则将文字赋值到输入框,直接搜索,触发父组件@search="onSearch"
        this.$emit('search', item)
      }
    }
  },
};
</script>

<style scoped lang="less">
</style>
