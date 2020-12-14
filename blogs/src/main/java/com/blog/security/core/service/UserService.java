package com.blog.security.core.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.blog.security.core.entity.MenuEntity;
import com.blog.security.core.entity.RoleEntity;
import com.blog.security.core.entity.UserEntity;

import java.util.List;

/**
 * @Description 系统用户业务接口
 */
public interface UserService extends IService<UserEntity> {

    /**
     * 根据用户名查询实体
     * @Param  username 用户名
     * @Return UserEntity 用户实体
     */
    UserEntity selectUserByName(String username);
    /**
     * 根据用户ID查询角色集合
     * @Param  userId 用户ID
     * @Return List<RoleEntity> 角色名集合
     */
    List<RoleEntity> selectRoleByUserId(int userId);
    /**
     * 根据用户ID查询权限集合
     * @Param  userId 用户ID
     * @Return List<MenuEntity> 角色名集合
     */
    List<MenuEntity> selectMenuByUserId(int userId);

}