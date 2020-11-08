package com.blog.pojo;

import java.util.Date;

public class User {
    private int id;
    private String account;
    private String username;
    private String password;
    private boolean status;
    private boolean type;
    private int auth;
    private Date createTime;
    private Date updateTime;
    private int phone;

    public User() {
    }

    public User(int id, String account, String username, String password, boolean status, boolean type, int auth, Date createTime, Date updateTime, int phone) {
        this.id = id;
        this.account = account;
        this.username = username;
        this.password = password;
        this.status = status;
        this.type = type;
        this.auth = auth;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.phone = phone;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public boolean isType() {
        return type;
    }

    public void setType(boolean type) {
        this.type = type;
    }

    public int getAuth() {
        return auth;
    }

    public void setAuth(int auth) {
        this.auth = auth;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", account='" + account + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", status=" + status +
                ", type=" + type +
                ", auth=" + auth +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                ", phone=" + phone +
                '}';
    }
}
