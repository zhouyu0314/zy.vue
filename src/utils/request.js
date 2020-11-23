import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'
import router from '../router'
let count = 0;

// create an axios instance
const service = axios.create({
    // url = base url + request url
    // baseURL: process.env.VUE_APP_BASE_API,
    baseURL: "",
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 500000 // request timeout
});

// // 请求拦截器
// service.interceptors.request.use(
//     async config => {
        // let person = store.getters.person;
        // //首先验证用户是否启用加密狗验证
        // if(isNotNull(person.useDongle) && person.useDongle === "1"){
        //     const resultMap = await store.dispatch('user/checkDongle',person);
        //     if(!resultMap.flag){
        //         return Promise.reject(resultMap);
        //     }
        // }
        //
        // // do something before request is sent
        // if(config.hasOwnProperty("type")){//非application/json格式
        //     let params = new URLSearchParams();
        //     for (let key in config.data) {
        //         params.append(key, config.data[key]);
        //     }
        //     config.data = params;
        //     config.headers = {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     };
        // } else {
        //     config.data = JSON.stringify(config.data);
        //     config.headers = {
        //         'Content-Type': 'application/json;charset=UTF-8',
        //     };
        // }
        //
        // //根据端口找到对应区域
        // config.headers.area = store.getters.area;
        // //将用户id放入head里面，用于后台redis获取当前操作用户
        // config.headers.userID = isNotNull(store.getters.person.id)?store.getters.person.id:"";
        //
        // //查看token是否存在
        // const hasToken = getToken();
        // if(hasToken){
        //     config.headers.token = hasToken;
        //     if(config.url !== "/system/tryGetNewToken"){
        //         let param = {};
        //         param.token = hasToken;
        //         param.area = store.getters.area;
        //         param.historyUrl = config.url;//记录url地址
        //         const resultMap = await store.dispatch('user/getNewToken',param);
        //         if(resultMap.flag === "success"){
        //             setToken(resultMap.data);
        //             config.headers.token = resultMap.data;
        //         }
        //     }
        // }

//         //如果url包含ip地址则不进行拼接，直接访问
//         if(config.url.indexOf('http')===-1){
//             config.url = _baseUrl + config.url;
//         }
//         return config
//     },
//     error => {
//         // do something with request error
//         console.log(error); // for debug
//         return Promise.reject(error)
//     }
// );

// 响应拦截器
// service.interceptors.response.use(
//     response => {
//         const res = response.data;
//         if(res.hasOwnProperty("flag") && res.flag === "success"){
//             count = 0;
//             return res
//         }else if(res.hasOwnProperty("flag") && res.flag === "token_error"){//token错误，处理
//             //标识，防止页面中多个访问多次返回登录页
//             if(count === 0){
//                 if(getToken()){
//                     removeToken();
//                 }
//                 count += 1;
//                 //跳转到登录页
//                 router.push({  name: '/login', params: res });
//             }
//             return new Promise(()=>{});
//         }else{
//             count = 0;
//             if(res.flag !== "not_tip"&&res.flag !== "system_err"){
//                 Message({
//                     message: res.message,
//                     type: 'error',
//                     duration: 5 * 1000
//                 })
//             }
//             if(res.flag==='system_err'){
//                 MessageBox({
//                     message: res.message,
//                     title:'请联系管理员解决：',
//                     type:'error'
//                 })
//             }
//             //如果后台调取第三方接口异常
//             if(res.flag==="interface_exc"){
//                 //打印接口报错信息到控制台
//                 console.log('%c接口异常：'+res.message,'font-size:16px;color:red;background:yellow');
//             }
//             //返回报错对象
//             return Promise.reject(res)
//         }
//     },
//     error => {
//         console.log(error); // for debug
//         let msg = error.message;
//         if(error.flag === "token_error" || (isNotNull(error.response) && isNotNull(error.response.status) && error.response.status === 500) ){
//             msg = error.message || error.response.data.message;
//             //如果因为token引起的报错，则清除token信息，否则会一直访问
//             if(getToken()){
//                 removeToken();
//             }
//             //跳转到登录页
//             router.push({  name: '/login', params: { flag: "token_error",message:msg } });
//             return new Promise(()=>{});
//         }
//         //未连接到服务器，请联系管理员！
//         Message({
//             message: (msg === "Network Error")?'未连接到服务器，请联系管理员！':msg,
//             type: 'error',
//             duration: 5 * 1000
//         });
//
//         return Promise.reject(msg);
//
//     }
// );

export default service
