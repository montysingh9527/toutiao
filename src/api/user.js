import request from '@/utils/request'
// 使用 Vuex 必须先加载
// import store from '@/store'

// 登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
