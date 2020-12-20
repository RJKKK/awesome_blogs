// @ts-ignore
import {post} from "../untils/axios_extend.tsx";
import {loginForm} from "./reqInterface";
import {LoginRes} from './resInterface'
export const loginApi = async (data:loginForm)=>{
    const res = await post<LoginRes>('auth/login', data)
    return res.data
}
