import axios from 'axios';
import { ElMessage } from "element-plus";
const service = axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {'content-type': 'application/json'}
});

service.interceptors.request.use(
    config => {
        if(config.isLogin){
            config.headers['SYS_TOKEN'] = localStorage.getItem('token');
        }
        return config;
    },
    error => {
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            console.log(response);
            if(response.data.code == 200){
                return response.data;
            }else{
                ElMessage.error(response.data.msg)
            }
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
