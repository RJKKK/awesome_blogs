import React,{useState} from 'react'
import {Form} from 'antd'
import * as params from "../untils/FormValidation";
import {useLifecycles} from 'react-use';

export default function useMyFrom<T extends Object, S extends Object | null> (formData:T) {
    let rulesObj = {}
    // @ts-ignore
    Object.keys(formData).forEach(val => rulesObj[val] = params[val] || [])
    useLifecycles(()=>{
        const [form] = Form.useForm()
    })


    const [model,SetModel] = useState<T>(formData)

}
