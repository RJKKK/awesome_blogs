import React, {useState,useEffect} from 'react'
import {Form} from 'antd'
import * as params from "../untils/FormValidation";
// import {useEffectOnce} from 'react-use';

export function useMyForm<T extends Object, S extends Object | null>
(formData: T, apiFunction: Function | null,getData?: (data: S) => void) {
    const [state, _setState] = useState<T>(formData)
    const [form] = Form.useForm<T>()
    const handleSubmit = () => {
        form.validateFields().then( async () => {
            if (apiFunction) {
                const res = await apiFunction(state)
                console.log(res)
                if (res) {
                    getData && getData(res)
                }
            }
        }).catch(err => console.log(err))
    }
    // useEffect(()=>{
    //     handleSubmit()
    // },[])
    const setState = (tag:string,e:React.ChangeEvent<HTMLInputElement>)=>{
        _setState({...state,[tag]:e.target.value})
    }
    return {form,state,setState,handleSubmit}
}
