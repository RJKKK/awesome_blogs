// @ts-ignore
import {post} from "../untils/axios_extend.tsx";
import {loginForm, registerForm} from "./reqInterface";
import {LoginRes,registerRes} from './resInterface'
export const loginApi = async (data:loginForm)=>{
    const res = await post<LoginRes>('auth/login', data)
    return res.data
}
export const registerApi = async (data:registerForm)=>{
    const res = await post<registerRes>('auth/register', data)
    return res.data
}