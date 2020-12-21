import React, {useState} from 'react'
import styled from "styled-components";
import {Form, Input,Button} from 'antd'
import {useMyForm} from "../hook/useMyForm";
import {loginForm} from "../api/reqInterface";
import {account as rAccount, password as rPassword} from "../untils/FormValidation";
import {LoginRes} from "../api/resInterface";
import {loginApi} from "../api";
const Style = styled('div')`

.login-container {
    height: calc(100vh - 156px);
}

.login-form-container {
    border-radius: 5px;
    width: 343px;
    height: 434px;
    background: white;
    right: 10%;
    top: 194px;
    position: absolute;
    border: 1px solid #DCDFE6;

    .el-form-item__content {
        width: 100%;
    }

    .login-form {
        padding: 15px 25px 10px 25px;
    }

    .label {
        text-align: left;
        padding-bottom: 10px;
        font-size: $font-third-size;
    }

    .login-button {
        padding-top: 20px;
    }

    .login-others {
        padding-top: 15px;
        font-size: $font-forth-size;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }



    .login-form-bottom {
        position: absolute;
        bottom: 0px;
        left: 0px;
        background: #F2F6FC;
        color: #31A8FF;
        width: 100%;
        text-align: center;
        height: 56px;
        line-height: 56px;

        &:hover {
            cursor: pointer;
        }
    }

    .login-fotgetPwd {
        &:hover {
            cursor: pointer;
        }
    }
   
`
export default function Login() {

   const {form,state,setState,handleSubmit} = useMyForm<loginForm,LoginRes>({
       account:'',
       password:''
   },loginApi,(res)=>{
       console.log(res)
   })

    return (
        <Style>
            <div className={'login-form-container'}>
                <Form className="login-form" form={form}>
                    <div className="title">欢迎登录</div>
                    <div className="label">账号</div>
                    <Form.Item name={'account'} rules={rAccount}>
                        <Input type="text" id='username'
                               onChange={e=>setState('account',e)}
                               value={state.account}/>
                        {/*<label htmlFor="username">用户名</label>*/}
                    </Form.Item>
                    <div className="label">密码</div>
                    <Form.Item name={'password'} rules={rPassword}>
                        <Input type="password" id='pwd'
                               onChange={e=>setState('password',e)}
                               value={state.password}
                        />
                        {/*<label htmlFor="pwd">密码</label>*/}
                    </Form.Item>
                    <Button  onClick={handleSubmit} size={'large'} style={{width:"100%"}} type={'primary'}>登录</Button>
                    <div className={"login-form-bottom"}>
                        未有账号？立即注册
                    </div>
                </Form>
            </div>

        </Style>
    )
}

