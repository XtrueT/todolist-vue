import axios from 'axios';

//创建axios实例
let Axios_server = axios.create({
    timeout:1500 ,//请求超时时间
    baseURL:'https://api.apiopen.top'
})

//请求拦截
Axios_server.interceptors.request.use(
    config =>{
        //判断登录与token的存在// sessionStorage.setItem('token', data["token"]);
        const auth_token = " Flask " + window.sessionStorage.access_token;
        // config.headers.common['Authorization'] = auth_token;
        config.headers = {
            'Content-Type':'application/json',
            'Authorization': auth_token
        }
        return config;
    },
    error =>{
        if(error.request){
            let {message} = error.request.data;
            alert(message);
            return error.request.data;
        }
        return Promise.reject(error)
    }
)
//响应拦截
Axios_server.interceptors.response.use(
    response =>{
        let {token} = response.data;
        // console.log(message);
        // console.log(token);
        // console.log(data);
        if (token){
            sessionStorage.setItem('access_token', token);
        }
        return response.data;
    },
    error =>{
        if(error.response){
            return error.response.data;
        }
        else{        
            return Promise.reject(error.request);
        }
    }
)
//并发axios.all([])
//处理响应回调axios.spread(callback)

export {Axios_server};