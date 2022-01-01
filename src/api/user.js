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

/**
 * 发送短信验证码
 * 注意：每个手机号码每分钟只能发送1次
 */
 export const sendSms = moblie => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${moblie}`,
  })
}

/**
 * 获取用户信息
 */
 export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user',
    // 发送请求头数据,该接口需要授权才能访问
    // 注意：token的数据格式：Bearer token数据, Bearer后面有个空格
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

