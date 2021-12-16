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
// 批量添加科目
export const createBatchSubject = query => {
    return request({
        url: '/sys/history/examNew/subject/add/batch',
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
//     "current": 1,
//   "levelOneName": "string",
//   "levelTwoName": "string",
//   "size": 10,
//   "type": 0
    return request({
        url: '/sys/history/examNew/menu/list',
        method: 'post',
        data: query,
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
// 批量添加菜单
export const createBatchMenu = query => {
    return request({
        url: '/sys/history/examNew/menu/addOrUpdate/batch',
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
        url: '/sys/history-exam-v2/list',
        method: 'post',
        data: query,
        isLogin: true
    })
}

// 主办方tag列表

export const getSponsorList = query => {
    return request({
        url: '/sys/history/examNew/menu/tag',
        method: 'post',
        data: query,
        isLogin: true
    })
}

// 科目下拉列表
// /sys/history/examNew/subject/selectors
export const getSubjectSelectors = query => {
    return request({
        url: '/sys/history/examNew/subject/selectors',
        method: 'get',
        data: query,
        isLogin: true
    })
}

// 上传文件
export const uploadImage = query => {
    return request({
        url: '/sys/file/imageUpload',
        method: 'post',
        data: query,
        name: 'file',
        isLogin: true
    })
}

// 新增历史考题
export const createHistoryExam = query => {
    return request({
        url: '/sys/history-exam-v2/save',
        method: 'post',
        data: query,
        isLogin: true
    })
}

// 删除历史考题
export const deleteHistoryExam = query => {
    return request({
        url: `/sys/history-exam-v2/delete/${query.id}`,
        method: 'delete',
        isLogin: true
    })
}

// 审核
export const updateAuditStatus = query => {
    return request({
        url: '/sys/history-exam-v2/updateAuditStatus',
        method: 'post',
        data: query, 
        isLogin: true
    })
}

