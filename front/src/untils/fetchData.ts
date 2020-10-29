import Axios from "axios";
import {Modal} from 'ant-design-vue'
const normalReq = Axios.create({
    baseURL:'/api',
    timeout:3000
})
export function get<T>(url:string,params:any,data:any){
    return normalReq.get<T>(url,{params,data})
}
export function post<T>(url:string,data:any){
    return normalReq.post<T>(url,data)
}
// normalReq.interceptors.request.use(config=>{
//     return config
// })
// normalReq.interceptors.response.use(res=>{
//
// })
