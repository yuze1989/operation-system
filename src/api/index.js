import request from '../utils/request';

//登录获取验证码
export const getLoginCode = query => {
    return request({
        url: '/sys/auth/imgValidateCode',
        method: 'post',
        params: query
    });
};

//登录
export const Login = query => {
    return request({
        url: '/sys/auth/login',
        method: 'post',
        data: query
    });
};



