import { post } from "../untils/fetchData";
import ResApiFunction,{ LoginRes, UserInfoRes } from "../responseInterfaces";
export const loginApi = async function (data) {
    const res = await post<LoginRes>('auth/login', data)
    return res.data
}


