// @ts-ignore
import {post,get} from "../untils/axios_extend.tsx";
import {loginForm, registerForm} from "./reqInterface";
import {LoginRes,registerRes} from './resInterface'
const md5 = require('md5')
export const loginApi = async (data:loginForm)=>{
    const {password} = data
    const res = await post<LoginRes>('auth/login', {...data,password:md5(password)})
    return res.data
}
export const registerApi = async (data:registerForm)=>{
    const {password} = data
    const res = await post<registerRes>('auth/register', {...data,password:md5(password)})
    return res.data
}
