package com.blog.security.entity;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;

/**
 * SpringSecurity用户的实体
 * 注意:这里必须要实现UserDetails接口
 */
@Data
public class SelfUserEntity implements Serializable, UserDetails {

	private static final long serialVersionUID = 1L;

	/**
	 * 用户ID
	 */
	private int userId;
	/**
	 * 用户名
	 */
	private String username;
	/**
	 * 密码
	 */
	private String password;
	/**
	 * 状态:1正常  0禁用
	 */
	private Boolean status;

    /**
     * 类型：1管理员 0普通用户
     */

    private Boolean type;


	/**
	 * 用户角色
	 */
	private Collection<GrantedAuthority> authorities;
	/**
	 * 账户是否过期
	 */
	private boolean isAccountNonExpired = false;
	/**
	 * 账户是否被锁定
	 */
	private boolean isAccountNonLocked = false;
	/**
	 * 证书是否过期
	 */
	private boolean isCredentialsNonExpired = false;
	/**
	 * 账户是否有效
	 */
	private boolean isEnabled = true;


	@Override
	public Collection<GrantedAuthority> getAuthorities() {
		return authorities;
	}
	@Override
	public boolean isAccountNonExpired() {
		return isAccountNonExpired;
	}
	@Override
	public boolean isAccountNonLocked() {
		return isAccountNonLocked;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return isCredentialsNonExpired;
	}
	@Override
	public boolean isEnabled() {
		return isEnabled;
	}
}