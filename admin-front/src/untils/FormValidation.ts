import { Rule } from "antd/lib/form/index";

export const password: Rule[] = [
    { required: true, message: '请输入密码', validateTrigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为6到20位' }
]
export const account: Rule[] = [
    { required: true, message: '请输入账号', validateTrigger: 'blur' },
    { min: 3, max: 20, message: '账号长度为3到20位', }
]
