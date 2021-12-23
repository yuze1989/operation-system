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

// 新获取省市区
export const areaList = query => {
    return request({
        url: `/sys/common/areaList?pid=${query.pid}`,
        method: 'get',
        // data: query,
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
// 编辑高校   
// 高校详情
// /sys/university/detail/{id}
export const schoolDetail = id => {
    return request({
        url: `/sys/university/detail/${id}`,
        method: 'get',
        isLogin: true
    })
}

// 更新高校
// /sys/university/modify
export const updateSchool = query => {
    return request({
        url: '/sys/university/modify',
        method: 'post',
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

// 高校分类模块
// 列表
export const schoolCategory = query => {
    return request({
        url: '/sys/dict/list',
        method: 'post',
        data: query,
        isLogin: true
    })
}

// 删除高校分类
export const deleteSchoolCategory = id => {
    return request({
        url: `/sys/dict/${id}`,
        method: 'post',
        isLogin: true
    })
}

// 修改高校分类
export const modifySchoolCategory = query => {
    return request({
        url: `/sys/dict/modify`,
        method: 'post',
        data: query,
        isLogin: true
    })
}

// 新增高校分类
export const createSchoolCategory = query => {
    return request({
        url: '/sys/dict/add',
        method: 'post',
        data: query,
        isLogin: true
    })
}