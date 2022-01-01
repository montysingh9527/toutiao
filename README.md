# toutiao头条Vant练习

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
### API地址
```
http://toutiao-app.itheima.net/v1_0/channels
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
      propList: ['*']
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