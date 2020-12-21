import React from "react";
import {useMyForm} from "../hook/useMyForm";
import {Button, Form, Input} from "antd";
import {account as rAccount, password as rPassword,name as rName,email as rEmail} from "../untils/FormValidation";
import {registerForm} from "../api/reqInterface";
import {registerApi} from '../api'
import {Style} from './Login'
export default (props: { history: { replace: (arg0: string) => void; }; })=> {
    const {setState,state,handleSubmit,form} = useMyForm<registerForm,registerForm>({
        name:'',
        password:'',
        account:'',
        email:''
    },registerApi,()=>{console.log('提交了')})
    return (
        <Style>
            <div className={'login-form-container'} style={{height:"580px",transform: "translateY(-14%)"}}>
                <Form className="login-form" form={form} >
                    <div className="title">注册</div>
                    <div className="label">账号</div>
                    <Form.Item name={'account'} rules={rAccount}>
                        <Input type="text"
                               onChange={e => setState('account', e)}
                               value={state.account}/>
                        {/*<label htmlFor="username">用户名</label>*/}
                    </Form.Item>
                    <div className="label">密码</div>
                    <Form.Item name={'password'} rules={rPassword}>
                        <Input type="password"
                               onChange={e => setState('password', e)}
                               value={state.password}
                        />
                        {/*<label htmlFor="pwd">密码</label>*/}
                    </Form.Item>
                    <div className="label">用户昵称</div>
                    <Form.Item name={'name'} rules={rName}>
                        <Input type="text"
                               onChange={e => setState('name', e)}
                               value={state.name}
                        />
                    </Form.Item>
                    <div className="label">邮箱</div>
                    <Form.Item name={'email'} rules={rEmail}>
                        <Input type="text"
                               onChange={e => setState('email', e)}
                               value={state.email}
                        />
                    </Form.Item>
                    <Button className={'login-button'}
                            onClick={handleSubmit} size={'large'}
                            style={{width: "100%"}} type={'primary'}>登录</Button>
                    <div className={"login-form-bottom"} onClick={()=>{props.history.replace('/login')}}>
                        已有账号？前往登录
                    </div>
                </Form>
            </div>
        </Style>
    )

}