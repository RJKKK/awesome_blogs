package com.blog.security.core.dao;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.blog.security.core.entity.UserRoleEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Description 用户与角色关系DAO

 */
@Mapper
public interface UserRoleDao extends BaseMapper<UserRoleEntity> {
	
}
