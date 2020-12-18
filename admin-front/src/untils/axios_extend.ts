import Axios from "axios";
import { message } from 'antd'
import {Switch} from '../App'

const normalReq = Axios.create({
    baseURL: '/api',
    timeout: 3000,
})
export function get<T>(url: string, params: any, data: any) {
    return normalReq.get<T>(url, { params, data })
}
export function post<T>(url: string, data: any) {
    return normalReq.post<T>(url, data)
}
normalReq.interceptors.request.use(config => {
    // Switch(true)
    // config.headers = { ...config.headers, Authorization: `Bearer ${getToken()}` }
    return config
})
normalReq.interceptors.response.use(res => {
    if (res.data.err !== 0) {
        message.error(res.data.msg, 1)
    }
    // Switch.value = false
    // Switch(false)
    return res.data
}, err => {
    // Switch.value = false
    // Switch(false)
    console.log(err.response)
    if (err.response.status === 401) {
        message.error(err.response.data.msg, 1)
    }
    if(err.response.status === 404){
        message.error('未知接口或接口地址错误', 1)
}
    else message.error(err.response.data.msg || err.response.data, 1)
})
