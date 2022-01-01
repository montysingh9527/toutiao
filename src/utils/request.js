import axios from 'axios' // 使用 Vuex 必须先加载
import store from '@/store/index'

// 再次创建一个实例 防止加载之前的会走拦截器
// 用来回去新的 token
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 接口的基准路径
})

// 添加请求拦截器
request.interceptors.request.use((config) => {
  // 请求发起会经过这里。 config:本次请求的配置对象
  const { user } = store.state
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


// 导出
export default request
