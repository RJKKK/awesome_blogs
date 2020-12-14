package com.blog.security.core.dao;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.blog.security.core.entity.RoleEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Description 角色DAO
 */
@Mapper
public interface RoleDao extends BaseMapper<RoleEntity> {

}