package com.blog.security.core.entity;


import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 系统用户实体

 */
@Data
@TableName("user")
public class UserEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	/**
	 * 用户ID
	 */
	@TableId
	private int userId;

	private String account;
	/**
	 * 用户名
	 */
	private String username;
	/**
	 * 密码
	 */
	private String password;
    private boolean status;
    private boolean type;
    private String auth;
    private Date createTime;
    private Date updateTime;
    private int phone;
}