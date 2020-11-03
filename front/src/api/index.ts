import {post} from "../untils/fetchData";
import {LoginRes,LoginResApi} from "../responseInterfaces";
export const loginApi:LoginResApi= async (data) => {
    const res = await post<LoginRes>('auth/login', data)
    return res.data
}