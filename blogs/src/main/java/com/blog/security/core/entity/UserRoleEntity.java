package com.blog.security.core.entity;


import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * @Description 用户与角色关系实体

 */
@Data
@TableName("user_role")
public class UserRoleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	/**
	 * ID
	 */
	@TableId
	private int id;
	/**
	 * 用户ID
	 */
	private int userId;
	/**
	 * 角色ID
	 */
	private int roleId;
}
