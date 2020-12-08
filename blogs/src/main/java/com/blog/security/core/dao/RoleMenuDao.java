package com.blog.security.core.dao;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.blog.security.core.entity.RoleMenuEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 角色权限关系DAO
 */
@Mapper
public interface RoleMenuDao extends BaseMapper<RoleMenuEntity> {
	
}
