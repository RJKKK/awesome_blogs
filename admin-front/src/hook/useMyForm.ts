import React,{useState} from 'react'
import {Form} from 'antd'
import * as params from "../untils/FormValidation";
import {useLifecycles} from 'react-use';

export default function useMyForm<T extends Object , S > (formData:T) {
    const rulesObj = {}
    console.log(formData)
   // @ts-ignore
     Object.keys(formData).forEach((val) => rulesObj[val] = params[val] || [])
    console.log(rulesObj)
    return {...Form.useForm(),rulesObj}

}
