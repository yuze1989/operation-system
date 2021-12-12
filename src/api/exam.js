import request from '../utils/request';

// 获取科目列表
export const getSubjectList = query => {
    console.log('query', query)
    return request({
        url: '/sys/history/examNew/subject/list',
        method: 'post',
        data: {
            current: query.current,
            size: 10
        },
        isLogin: true
    })
}

// 新增科目
export const createSubject = query => {
    return request({
        url: '/sys/history/examNew/subject/add',
        method: 'post',
        data: query,
        isLogin: true
    })
}

// 修改科目
export const editSubject = query => {
    return request({
        url: '/sys/history/examNew/subject/edit',
        method: 'post',
        data: query,
        isLogin: true
    })
}

// 删除科目
export const deleteSubject = query => {
    console.log(query)
    return request({
        url: `/sys/history/examNew/subject/${query.id}`,
        method: 'delete',
        // data: query,
        isLogin: true
    })
}

// 菜单配置
// 获取菜单列表
// type是考试类型 0-模考 1-高考
export const getMenuList = query => {
    console.log(query)
    return request({
        url: `/sys/history/examNew/menu/${query.type}`,
        method: 'get',
        isLogin: true
    })
}

// 添加菜单
export const createMenu = query => {
    return request({
        url: '/sys/history/examNew/menu/add',
        method: 'post',
        data: query,
        isLogin: true
    })
}

// 删除菜单
export const deleteMenu = query => {
    console.log(query)
    return request({
        url: `/sys/history/examNew/menu/${query.id}`,
        method: 'delete',
        isLogin: true
    })
}


// 历年考题
// 历年考题列表
export const getHistoryList = query => {
    return request({
        url: '/sys/history/examNew/list',
        method: 'post',
        data: query,
        isLogin: true
    })
}