import request from '../utils/request';

// 省份列表
// /sys/university/province
export const getProvince = query => {
    return request({
        url: '/sys/university/province',
        method: 'get',
        data: query,
        isLogin: true
    })
}

// 市区列表
// /sys/university/city/{provinceId}
export const getCity = query => {
    return request({
        url: `/sys/university/city/${query}`,
        method: 'get',
        data: query,
        isLogin: true
    })
}

// 高校分类
// /sys/university/classify
export const getSchoolType = query => {
    return request({
        url: '/sys/university/classify',
        method: 'get',
        data: query,
        isLogin: true
    })
}

// 高校列表
// /sys/university/list
export const schoolList = query => {
    return request({
        url: '/sys/university/list',
        method: 'post',
        data: query,
        isLogin: true
    })
}

// 添加高校
// /sys/university/add
export const createSchool = query => {
    return request({
        url: '/sys/university/add',
        method: 'post',
        data: query,
        isLogin: true
    })
}

// 删除高校
// /sys/university/delete/{id}
export const deleteSchool = id => {
    return request({
        url: `/sys/university/delete/${id}`,
        method: 'delete',
        isLogin: true
    })
}