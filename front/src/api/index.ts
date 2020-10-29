import {post} from "../untils/fetchData";
import {loginForm} from "../formInterfaces";
export const loginApi = async (data:loginForm)=>{
    const res = await post('auth/login',data)
    return res.data
}