/**
 * 处理时间格式的包：https://dayjs.gitee.io/docs/zh-CN/display/format
 * 安装dayjs ： npm install dayjs
 */
import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包, dayjs默认语言是英文
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')  // dayjs默认语言是英文

// 定义一个全局过滤器,然后就可以在任何组件中使用了
Vue.filter('formDate', value => {
    return dayjs().to(dayjs(value))
})



// dayjs()获取当前时间
// console.log(dayjs().format('YYYY-MM-DD'))
// console.log(dayjs().to(dayjs('2015'))) // 2年以前
