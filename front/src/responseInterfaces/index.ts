import { loginForm } from "../formInterfaces";

export interface LoginRes {
   token: string
}
export interface UserInfoRes {
   account: string
   avatar: string
   username: string
   email: string
}
 interface ResApiFunction {
   Function(data: any): Promise<LoginRes>;
    Function(data: any): Promise<UserInfoRes>
}

export default ResApiFunction
