package com.blog.security.core.entity;


import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * @Description 角色与权限关系实体

 */
@Data
@TableName("role_menu")
public class RoleMenuEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	/**
	 * ID
	 */
	@TableId
	private int id;
	/**
	 * 角色ID
	 */
	private int roleId;
	/**
	 * 权限ID
	 */
	private int menuId;
}
