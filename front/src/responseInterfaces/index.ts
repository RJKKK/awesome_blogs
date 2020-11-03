import {loginForm} from "../formInterfaces";

export interface LoginRes {
   token:string
}
export interface LoginResApi{
   (data:loginForm):Promise<LoginRes>
}
