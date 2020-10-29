import Axios, {AxiosPromise} from "axios";
const normalReq = Axios.create({
    baseURL:'',
    timeout:3000
})
export function get<T>(url:string,params:any,data:any):AxiosPromise<T>{
    return normalReq.get<T>(url,{params,data})
}
export function post() {

}