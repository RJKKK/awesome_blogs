package com.blog.security.core.entity;


import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * @Description 角色实体

 */
@Data
@TableName("role")
public class RoleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	/**
	 * 角色ID
	 */
	@TableId
	private int roleId;
	/**
	 * 角色名称
	 */
	private String roleName;
}
