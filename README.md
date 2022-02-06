# toutiao头条Vant练习

## 创建
```
vue create toutiao
```
## 安装
```
npm install
```

### 运行
```
npm run serve
```
### 移动端 REM 适配 postcss-pxtorem/lib-flexible
```
Vant 中的样式默认使用 px 作为单位，如果需要使用 rem 单位，推荐使用以下两个工具：
- postcss-pxtorem 是一款 postcss 插件，用于将单位转化为 rem
- lib-flexible 用于设置 rem 基准值

一、使用 lib-flexible 动态设置 REM 基准值（html 标签的字体大小）
1、安装：npm i amfe-flexible
2、然后在 main.js 中加载执行该模块
import 'amfe-flexible'

二、使用 postcss-pxtorem 将 px 转为 rem。（注意：该插件不能转换行内样式中的 px，例如 <div style="width: 200px;"></div>）
1、安装：npm i postcss-pxtorem@5.1.1
2、然后在项目根目录中创建 .postcssrc.js 文件，配置PostCSS
/**
 * PostCSS 配置文件
 */
module.exports = {
  // 配置要使用的 PostCSS 插件
  plugins: {
    // 配置使用 autoprefixer 插件
    // 作用：生成浏览器 CSS 样式规则前缀
    // VueCLI 内部已经配置了 autoprefixer 插件
    // 所以又配置了一次，所以产生冲突了
    // 'autoprefixer': { // autoprefixer 插件的配置
    //   // 配置要兼容到的环境信息
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    // 配置使用 postcss-pxtorem 插件
    // 作用：把 px 转为 rem
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],
      // 配置不需要转换的资源
      exclude: 'github-markdown'
    }
  }
}
```

### Toast 轻提示组件
```
引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法，便于在组件内调用。

在组件中必须通过this.$toast 来调用Toast组件
    this.$toast.loading({
        message: '登录中...',
        forbidClick: true,   // 禁用背景点击
        duration: 2000  // 持续时间,默认是2000。如果是0则持续展示
    });
Toast 默认采用单例模式，即同一时间只会存在一个 Toast
this.$toast.success('登录成功');
this.$toast.fail('登录失败,请稍后再试');
this.$toast('登录成功');
```

### 设置全局请求拦截器
```
// 添加请求拦截器
request.interceptors.request.use((config) => {
  // 请求发起会经过这里。 config:本次请求的配置对象
  const { user } = store.state // Vuex中用户数据token
  if (user && user.token) {
    config.headers.Authorization=`Bearer ${user.token}`
  }
  // 注意：这里务必要返回config配置对象,否则请求就停在这里出不去了
  return config;
},(err) =>  {
  // 如果请求出错(还没有发出去)会进入这里
  console.log('请求拦截器拦截错误--->', err)
  return Promise.reject(err);
});
```

### List 列表组件 ：用于展示文章列表数据
```
详情参考：https://youzan.github.io/vant/#/zh-CN/list
List 列表组件：瀑布流滚动加载，用于展示长列表。

List 组件通过 loading 和 finished 两个变量控制加载状态，
当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 设置成 true，此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可。
若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

- load 事件：
  - List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
  - 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。
- loading 属性：控制加载中的 loading 状态
  - 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
  - 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件
- finished 属性：控制加载结束的状态
  - 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
  - 所有数据加载结束，finished 为 true，此时不会触发 load 事件

```

### van-popup 弹出层组件 
```
弹出层是懒渲染：只有在第一次展示的时候才会渲染里面的内容,之后它的关闭和显示都是在切换内容的显示和隐藏
```