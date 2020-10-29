import {ValidationRule} from "ant-design-vue/types/form/form";

export const password:ValidationRule[] = [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {min: 6, max: 20,message: '密码长度为6到20位'}
]
export const account:ValidationRule[] = [
    { required: true, message: '请输入账号', trigger: 'blur' },
    {min: 3, max: 20,message: '账号长度为3到20位',}
]