<template>
<!-- 首页文章列表项 -->
  <div>
      <!--方法1、  :to="'/article/' + article.art_id"
          方法2、  :to="`/article/${article.art_id}`"
          方法3、  
          :to="{
             name:'article'  // 根据路由名称进行跳转
             params: { articleId: article.art_id }  // 属性名：路由路径中设计的动态参数名称
          }"
       -->
      <van-cell :to="{ name:'article', params:{ articleId: article.art_id }}" class="article-item">
          <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
          <div slot="label">
              <div v-if="article.cover.type === 3" class="cover-wrap">
                  <div class="cover-item" v-for="(img,index) in article.cover.images" :key="index">
                        <van-image class="cover-item-img" fit="cover" :src="img"/>
                  </div>                  
              </div>
              <div class="label-info-wrap">
                  <span>{{ article.aut_name }}</span>
                  <span>{{ article.comm_count }}评论</span>
                  <span>{{ article.pubdate | formDate }}</span>
              </div>
          </div>  
        <!-- 一个图片侧边展示 -->
        <van-image v-if="article.cover.type === 1" slot="default" 
        class="right-cover" fit="cover"
        :src="article.cover.images[0]"/>
      </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
      article: {
          type: Object,
          required: true
      }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {},
};
</script>

<style scoped lang="less">
.article-item {
    .title {
        font-size: 32px;
        color: #3a3a3a;
    }
    .van-cell__value {
        flex: unset;
        width: 232px;
        height: 146px;
        padding-left: 25px;
    }
    .right-cover {
        width: 232px;
        height: 146px;
    }
    .label-info-wrap span {
        font-size: 22px;
        color: #b4b4b4;
        margin-right: 25px;
    }
    .cover-wrap {
        display: flex;
        padding: 30px 0;
        .cover-item {
            flex: 1;
            height: 146px;
            // 最后一个图片不设置padding-right
            &:not(:last-child){
                padding-right: 4px;
            }
            .cover-item-img {
                width: 100%;
                height: 146px;
            }
        }
    }
}
</style>
