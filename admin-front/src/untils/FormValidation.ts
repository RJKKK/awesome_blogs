import { Rule } from "antd/lib/form/index";

export const password: Rule[] = [
    { required: true, message: '请输入密码', validateTrigger: 'onBlur' },
    { min: 6, max: 20, message: '密码长度为6到20位' }
]
export const account: Rule[] = [
    { required: true, message: '请输入账号', validateTrigger: 'onBlur' },
    { min: 3, max: 20, message: '账号长度为3到20位', }
]
export const email:Rule[] = [
    { required: true, message: '请输入邮箱', validateTrigger: 'onBlur' },
    {type:'email',message: '请输入正确的邮箱地址'},
]
export const name:Rule[] = [
    { min: 0, max: 20, message: '用户昵称最多20个字符'}
]