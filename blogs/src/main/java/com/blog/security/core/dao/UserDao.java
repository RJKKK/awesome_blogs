package com.blog.security.core.dao;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.blog.security.core.entity.MenuEntity;
import com.blog.security.core.entity.RoleEntity;
import com.blog.security.core.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @Description 系统用户DAO
 */
@Mapper
public interface UserDao extends BaseMapper<UserEntity> {

    /**
     * 通过用户ID查询角色集合
     * @Param  userId 用户ID
     * @Return List<RoleEntity> 角色名集合
     */
    List<RoleEntity> selectRoleByUserId(int userId);
    /**
     * 通过用户ID查询权限集合
     * @Param  userId 用户ID
     * @Return List<MenuEntity> 角色名集合
     */
    List<MenuEntity> selectMenuByUserId(int userId);
	
}
