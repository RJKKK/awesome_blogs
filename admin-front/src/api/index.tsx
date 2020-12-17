import {post} from "../untils/axios_extend";
import {loginForm} from "./reqInterface";
import {LoginRes} from './resInterface'
export const login = async (data:loginForm)=>{
    const res = await post<LoginRes>('auth/login', data)
    return res.data
}
