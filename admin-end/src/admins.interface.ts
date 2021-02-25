export enum Role {
  notSuper,
  isSuper
}
export interface Admins {
  username?:string
  account:string
  password?:string
  email?:string
  tel?:number
  // avatar?:string
  // role?:Role,
  // auths?:number[],
}
