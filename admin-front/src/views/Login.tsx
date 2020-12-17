import React, {useState} from 'react'
import styled from "styled-components";
import {Form,Input} from 'antd'
import useMyForm from "../hook/useMyForm";
import {loginForm} from "../api/reqInterface";
import {account} from "../untils/FormValidation";
export default function Login() {
    const Style = styled('div')`
 #login{
        margin:0;
        background-color: #29f1c3;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        min-height:100vh;
    }
    .row{
        width: 600px;
        margin:.6rem 0;
        position: relative;
        // display:flex;
        // justify-content:center;
        // align-items:center;
        // flex-direction:column;
        // min-height:100vh;
    }
    .row input{
        font-size:1rem;
        border: 1px green solid;
        border-radius:4px;
        box-sizing:border-box;
        padding:.8rem 1rem;
        box-shadow:0px 1px 2px rgba(0,0,0,.25);
        width: 100%;
        outline:none;
        // placeholder:' ';
    }
    .row label{
        position:absolute;
        left:0px;
        padding-left:1rem;
        padding-top:.8rem;
        transition:all .3s ease-in-out;
    }
    .row input:focus + label{
        transform:translatex(calc(-100% - 1rem));
    }
    .row input:not(:focus):not(:placeholder-shown) + label{
        color:rgba(0,0,0,0)
    }
`
    const [form] = Form.useForm()
    // @ts-ignore
    return (
        <Style>
            <Form id="login" form={form}>
                <h2>管理员登入</h2>
                <Form.Item name={'account'} className="row"  >
                    <Input type="text" id='username'/>
                </Form.Item>
                <label htmlFor="username">用户名</label>
                <Form.Item name={'password'} className="row">
                    <Input type="password" id='pwd'/>
                </Form.Item>
                <Form.Item><label htmlFor="pwd">密码</label></Form.Item>

            </Form>
        </Style>
    )
}

