import { Interface } from "readline";


interface Admin {
    account:string
    password:string
    status:boolean
    //是否为超级管理员
    type:boolean
    username:string
    auth:  number[]
    createTime:number
    updateTime:number
    //暂时未用到
    tel:number
}