import {post} from "../untils/fetchData";
import {loginForm} from "../formInterfaces";
import {LoginRes} from "../responseInterfaces";
export const loginApi:(data:loginForm)=>Promise<LoginRes> = async (data) => {
    const res = await post<LoginRes>('auth/login', data)
    return res.data
}