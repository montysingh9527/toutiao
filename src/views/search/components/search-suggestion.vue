<template>
    <!-- 联想建议 -->
  <div class="search-suggestion">
      <van-cell icon="search" v-for="(item, index) in suggestions" :key="index" :title="item"></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'    // 按需加载lodash
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText:{
        type: String,
        required: true
     }
  },
  data() {
    return {
        suggestions: []   // 联想建议数据列表
    };
  },
  computed: {},
  watch: {
      searchText: {
          // 当searchText发生改变时就会调用。注意handler()函数名称是固定的
         // 使用lodash中debounce方法解决防抖,解决输入一个文字就会发起请求。解决后:在时间范围内输入文字只会发起一次请求
        // debounce方法：参数1：一个函数。参数2：延迟时间,单位是毫秒。返回值：防抖之后的函数
          handler: debounce(function (val){
              this._getSearch(val)
          }, 500),
          // 该回调将会在侦听开始之后被立即调用,解决首次输入不监听情况
          immediate: true
      }
  },
  created() {},
  methods: {
      _getSearch(q){
          getSearchSuggestions(q).then( res=> {
          this.suggestions = res.data.data.options
          console.log('res',res.data.data.options)
      })
      }      
  },
};
</script>

<style scoped lang="less">
</style>
