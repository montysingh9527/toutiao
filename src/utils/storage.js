/**
 * 封装本地存储操作模块 
 */

// 存储localStorage数据
export const setItem = (key, val) => {
    // 将数组、对象类型的数据转换为 JSON 格式字符串进行存储
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    window.localStorage.setItem(key, val)
}

// 获取localStorage数据
export const getItem = (key) => {
    const data = window.localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }
}

// 删除localStorage数据
export const removeItem = key => {
    window.localStorage.removeItem(key)
}