import axios from 'axios' // 使用 Vuex 必须先加载

// 再次创建一个实例 防止加载之前的会走拦截器
// 用来回去新的 token
const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net' // 接口的基准路径
})

// 导出
export default request
