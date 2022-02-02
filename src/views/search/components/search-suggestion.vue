<template>
    <!-- 联想建议 -->
  <div class="search-suggestion">
      <van-cell @click="$emit('search', item)" icon="search" v-for="(item, index) in suggestions" :key="index">
        <div slot="title" v-html="highlight(item)"></div>  
      </van-cell>
      <!-- 双花括号绑定会直接输出纯文本内容 -->
      <!-- <div>{{ htmlStr }}</div> -->

      <!-- 使用v-html指令可以绑定渲染带有html标签的字符串 -->
      <!-- <div v-html="htmlStr"></div> -->
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
        suggestions: [],   // 联想建议数据列表
        // htmlStr: 'Hello <span style="color: red">World</span>'
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
      },
      highlight(item) {
          const highlightStr = `<span class="active">${ this.searchText }</span>`
            
          // 正则表达式中间的内容都会当做匹配字符来使用,而不是数据变量
          // 如果需要根据数据变量动态创建正则表达式,则手动 new RegExp
        //   RegExp 正则表达式构造函数：参数1:匹配模式字符串,它会根据这个字符串创建正则对象。参数2:匹配模式,要写到字符串中
          const reg = new RegExp(this.searchText, 'gi')           
          try{ 
              if(item){
                return item.replace(reg, highlightStr)  // replace不会修改原始字符串,而是返回一个新的字符串
              }
            }catch(err){
              console.log('搜索关键词' + err)
          }         
      }      
  },
};
</script>

<style scoped lang="less">
.search-suggestion {
    /deep/ span.active {
        color: rgb(189, 6, 6);
    }
}
</style>
