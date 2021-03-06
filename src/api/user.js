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


/**
 * 获取用户频道列表
 */
 export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels',
  })
}

/**
 * 文章详情—关注用户
 */
 export const addFollow = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data:{
      target
    }
  })
}

/**
 * 文章详情—取消关注用户
 */
 export const deleteFollow = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`,
  })
}

/**
 * 文章详情—用户收藏文章
 */
 export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

/**
 * 文章详情—用户取消收藏文章
 */
 export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`,
  })
}

/**
 * 文章详情—用户点赞文章
 */
 export const addLike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

/**
 * 文章详情—用户取消点赞文章
 */
 export const deleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`,
  })
}

/**
 * 我的-个人用户资料
 */
 export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile',
  })
}

/**
 * 我的-更新用户个人资料
 */
 export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

/**
 * 我的-更新用户头像
 */
 export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
