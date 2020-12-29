package com.blog.common;

public enum ResponseCode {

    SUCCESS(0,"SUCCESS"),
    ERROR(1,"ERROR"),
    UNAUTHORIZATION(401,"未授权"),
    //登录模块 5002XX
    NEED_LOGIN(401,"未登录，需要登录"),
    USER_EMPTY(500202,"用户名不存在"),
    USER_FORZEN(500203,"用户被冻结"),
    USER_PASSWORD_ERROR(500204,"用户名或者密码错误"),
    LOGIN_ERROR(500205,"登录失败"),
    ILLEGAL_ARGUMENT(2,"非法参数");

    private final int code;
    private final String desc;


    ResponseCode(int code,String desc){
        this.code = code;
        this.desc = desc;
    }

    public int getCode(){
        return code;
    }
    public String getDesc(){
        return desc;
    }

}
