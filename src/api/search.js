/**
 * 文章搜索请求模块
 */
 import request from '@/utils/request'

 // 请求获取获取联想建议内容（自动补全）
 export const getSearchSuggestions = q => {
   return request({
     method: 'GET',
     url: 'v1_0/suggestion',
     params: {
         q
     }
   })
 }

