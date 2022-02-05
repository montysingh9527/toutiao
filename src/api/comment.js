/**
 * 文章详情——评论模块
 */
 import request from '@/utils/request'

/**
 * 获取文章评论列表
 */
export const getComments = params => {
    return request({
        method: 'GET',
        url: '/v1_0/comments',
        params
    })
}

/**
 * 文章详情—用户点赞评论
 */
 export const addLiking = target => {
    return request({
      method: 'POST',
      url: '/v1_0/comment/likings',
      data: {
        target
      }
    })
  }
  
  /**
   * 文章详情—用户发布文章评论
   */
   export const deleteLiking = target => {
    return request({
      method: 'DELETE',
      url: `/v1_0/article/likings/${target}`,
      data
    })
  }

  /**
   * 文章详情—用户发布文章评论
   */
   export const addComment = data => {
    return request({
      method: 'POST',
      url: '/v1_0/comments',
      data
    })
  }
