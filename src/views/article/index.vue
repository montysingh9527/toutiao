<template>
    <!-- 首页文章列表-帖子详情页 -->
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="头条">
      <van-icon slot="left" name="arrow-left"  @click="$router.back()"/>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中...</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="articles.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articles.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" :src="articles.aut_photo" slot="icon" fit="cover" round />
          <div slot="title" class="user-name">{{ articles.aut_name }}</div>
          <div slot="label" class="publish-date">{{articles.pubdate | formDate }}</div>
          <!-- <van-button @click="onFollow" v-if="articles.is_followed" class="follow-btn" round size="small">已关注</van-button>
          <van-button @click="onFollow" v-else class="follow-btn" type="info" color="#3296fa" size="small" icon="plus" round>关注</van-button>
          -->
          <!-- 关注组件：模板中的$event是事件参数；@update-is-followed更新状态
          当我们传递给子组件的数据既要使用还要修改。
            传递：props  :is-followed="articles.is_followed"
            修改：自定义事件   @update-is-followed="articles.is_followed = $event"
            可以简写方式：在组件上使用v-model
                value="articles.is_followed"
                @input="articles.is_followed = $event"
                如果需要修改v-model的规则名称,可以通过子组件的model属性来配置修改
              一个组件上只能使用一次v-model,如果有多个数据需要实现类似于v-model的效果，可以使用属性 .sync修饰符
          -->
          <follow-user class="follow-btn" v-model="articles.is_followed" :user-id="articles.aut_id" />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 引入github-markdown的样式markdown-body  ref用于获取img节点-->
        <div ref="article-content" class="article-content markdown-body" v-html="articles.content"></div>
        <van-divider>正文结束</van-divider>

        <!-- 文章评论列表组件   reply-click:为孙子组件comment-item传递-->
        <comment-list :list="commentList" :artId="articles.art_id" @onload-success="totalCommentCount = $event.total_count" @reply-click="onReplyClick" />

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button @click="isPostShow = true" class="comment-btn" type="default" size="small" round>写评论</van-button>
          <van-icon name="comment-o" :info="totalCommentCount" color="#777" />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <!-- 收藏组件 -->
          <collect-article :class="{ collected : articles.is_collected }" v-model="articles.is_collected" :art-id="articles.art_id"/>
          <!-- 点赞组件 art-id文章id-->
          <like-article :class="{ liked : articles.attitude === 1 }" v-model="articles.attitude" :art-id="articles.art_id" />
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 文章评论 组件 -->
        <van-popup v-model="isPostShow" position="bottom" >
          <comment-post :targetId="articles.art_id" @post-success="onPostSuccess" />
        </van-popup>
        <!-- /文章评论-->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="_getArticleById" class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 回复评论组件     -->
    <!-- 弹出层是懒渲染的：只有在第一次展示的时候才会渲染里面的内容,之后它的关闭和显示都是在切换内容的显示和隐藏 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height:100%;">
      <!-- v-if 条件渲染: true 渲染元素节点，false 不渲染 -->
       <comment-reply v-if="isReplyShow" :comments="currentComment" @close="isReplyShow = false" />
    </van-popup>
    <!-- /回复评论 -->
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant';   // ImagePreview 图片预览组件
import FollowUser from '@/components/follow-user'         // 关注作者组件
import CollectArticle from '@/components/collect-article'  // 文章收藏组件
import LikeArticle from '@/components/like-article'      // 文章点赞组件
import CommentList from './components/comment-list'      // 文章评论列表组件
import CommentPost from './components/comment-post'      // 文章评论组件
import CommentReply from './components/comment-reply'    // 评论回复组件
export default {
  name: 'articleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  // 给所有的后代组件提供数据。注意：不要滥用
  provide: function() {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      articles:{},  // 文章详情数据
      loading: true, // 加载中的loading状态
      errStatus: 0,   // 失败的状态码
      totalCommentCount: 0,  // 评论总数量
      isPostShow: false,   // 文章评论弹窗
      commentList: [],  // 评论列表
      isReplyShow: false, // 回复评论弹窗
      currentComment: {},  // 当前点击回复的评论项
    };
  },
  computed: {},
  watch: {},
  created() {
    this._getArticleById()
  },
  methods: {
    // 获取文章详情数据
    _getArticleById(){
      this.loading = true  // 发起请求前使用loading加载中
      getArticleById(this.articleId).then(res=>{
       this.articles = res.data.data
       // 初始化图片点击预览。数据驱动视图不是立即的
       setTimeout(()=>{
        // console.log(this.$refs['article-content']) 
        // 图片预览
        this.previewImage()
       }, 0)
        console.log('文章详情=>',res.data.data)
      }).catch(err=>{        
        if (err.response && err.response.status === 404){
          this.errStatus = 404
        }
        this.$toast(`${err.response.data.message}`)
        console.log('文章详情err',err.response)
      }).finally(()=> {
        this.loading = false   // 无论成功还是失败都关闭loading
      })
    },
    // 图片预览
    previewImage(){
      // 得到所有的img节点
      const articleContent = this.$refs['article-content']
      const img = articleContent.querySelectorAll('img')
      let imgs = []  // 所有img地址
      img.forEach((img,index) => {
        console.log('img',img.src)
        imgs.push(img.src)
        // 给每个img注册点击事件,在处理函数中调用预览
        img.onclick = ()=>{
          ImagePreview({        // ImagePreview 图片预览组件 
          images: imgs, // 预览的图片地址数组
          startPosition: index, // 开始位置,从0开始
        });
        }
      });
    },
    // 发布文章评论
    onPostSuccess(data) {
      // 关闭弹窗
      this.isPostShow = false   
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj)
      // 更新评论总数
      this.totalCommentCount = this.commentList.length
    },
    // 回复评论
    onReplyClick(comments) {
      this.currentComment = comments
      // 回复评论弹窗展示
      this.isReplyShow = true
    }
  },
};
</script>

<style scoped lang="less">
@import '../../styles/github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    // 收藏后按钮颜色
    .collected {
      color: #ffa500;
    }
    .liked {
      color: #ffa500;
    }
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
