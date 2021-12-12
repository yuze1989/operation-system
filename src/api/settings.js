import request from '../utils/request';

// 系统设置

// APP版本升级模块列表
export const getUpdateList = query => {
    return request({
        url: '/sys/version-update/list',
        method: 'post',
        data: query,
        isLogin: true
    })
}

// 新增版本信息
export const createVersions = query => {
    let {id, ...params} = query
    let url = id ? '/sys/version-update/modify' : '/sys/version-update/add'
    console.log(params, url)
    return request({
        url,
        method: 'post',
        data: query,
        isLogin: true
    })
}

// 删除版本信息
export const deleteVersion = query => {
    console.log('deleteVersion', query)
    return request({
        url: `/sys/version-update/${query.id}`,
        method: 'post',
        isLogin: true
    })
}

// 版本详情信息
export const getVersionDetail = query => {
    console.log('getVersionDetail', query)
    return request({
        url: `/sys/version-update/detail/${query.id}`,
        method: 'get',
        isLogin: true
    })
}