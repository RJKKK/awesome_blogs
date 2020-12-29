package com.blog.security.core.service;


import com.baomidou.mybatisplus.extension.service.IService;
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


}