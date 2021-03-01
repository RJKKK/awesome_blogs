export interface loginForm extends Object{
    account: string
    password: string
}
export interface registerForm extends Object{
    password:string
    account:string
    email:string
    name?:string
}
