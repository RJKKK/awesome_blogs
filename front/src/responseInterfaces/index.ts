import { loginForm} from "../formInterfaces";

export interface LoginRes {
   token:string
}
export interface UserInfoRes {
   account:string
   avatar:string
   username:string
   email:string
}
export interface LoginResApiFunction{
   (data:any):Promise<LoginRes>
}
