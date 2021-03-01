export enum Role {
  notSuper,
  isSuper
}
export interface Admins {
  name?:string
  account:string
  password?:string
  email?:string
  tel?:number
  avatar?:string
  role?:Role,
  auths?:number[],
}
