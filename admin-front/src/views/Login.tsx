import React, {useState} from 'react'
import styled from "styled-components";
import {Form, Input,Button} from 'antd'
import useMyForm from "../hook/useMyForm";
import {loginForm} from "../api/reqInterface";
import {account as rAccount, password as rPassword} from "../untils/FormValidation";
const Style = styled('div')`
 .login{
        margin:0;
        background-color: #29f1c3;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        min-height:100vh;
    }
    .row{
        width: 400px;
        //margin:.6rem 0;
        //position: relative;
        // display:flex;
        // justify-content:center;
        // align-items:center;
        // flex-direction:column;
        // min-height:100vh;
    }
    //.row input{
    //    font-size:1rem;
    //    border: 1px green solid;
    //    border-radius:4px;
    //    box-sizing:border-box;
    //    padding:.8rem 1rem;
    //    box-shadow:0px 1px 2px rgba(0,0,0,.25);
    //    width: 100%;
    //    outline:none;
    //    // placeholder:' ';
    //}
    //.row label{
    //    position:absolute;
    //    left:0px;
    //    padding-left:1rem;
    //    padding-top:.8rem;
    //    transition:all .3s ease-in-out;
    //}
    //.row input:focus + label{
    //    transform:translatex(calc(-100% - 1rem));
    //}
    //.row input:not(:focus):not(:placeholder-shown) + label{
    //    color:rgba(0,0,0,0)
    //}
`
export default function Login() {

   const [password,setPassword] = useState<string>('')
    const [account,setAccount] = useState<string>('')
    const [form] = Form.useForm()
    const toLogin = ()=>{
       form.validateFields().then(()=>{
           console.log('提交了')
       }).catch(()=>{console.log('未通过验证')})
    }
    return (
        <Style>
            <Form className="login" form={form}>
                <h2>管理员登入</h2>
                <div className="row">
                    <Form.Item name={'account'} rules={rAccount} label={'账号'}>
                        <Input type="text" id='username'
                               onChange={e=>setAccount(e.target.value)}
                               value={account}/>
                        {/*<label htmlFor="username">用户名</label>*/}
                    </Form.Item>

                </div>

                <div className="row">
                    <Form.Item name={'password'} className="row" rules={rPassword} label={'密码'}>
                        <Input type="password" id='pwd'
                               onChange={e=>setPassword(e.target.value)}
                               value={password}
                        />
                        {/*<label htmlFor="pwd">密码</label>*/}
                    </Form.Item>

                </div>

                <Button onClick={toLogin}>登录</Button>
            </Form>
        </Style>
    )
}

