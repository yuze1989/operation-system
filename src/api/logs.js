import request from '../utils/request';

//操作模块列表
export const getModuleList = query => {
    return request({
        url: '/sys/operate-log/moduleList',
        method: 'post',
        data: query,
        isLogin: true
    })
}
//操作类型列表
export const getTypeList = query => {
    return request({
        url: '/sys/operate-log/typeList',
        method: 'post',
        data: query,
        isLogin: true
    })
}
//操作日志列表
export const getLogs = query => {
    return request({
        url: '/sys/operate-log/list',
        method: 'post',
        data: query,
        isLogin: true
    })
}
