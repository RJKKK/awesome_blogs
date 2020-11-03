import {post} from "../untils/fetchData";
import {LoginRes,UserInfoRes,LoginResApiFunction} from "../responseInterfaces";
export const loginApi:LoginResApiFunction= async (data) => {
    const res = await post<LoginRes>('auth/login', data)
    return res.data
}