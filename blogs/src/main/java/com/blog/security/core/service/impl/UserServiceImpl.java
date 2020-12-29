package com.blog.security.core.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.security.core.dao.UserDao;
import com.blog.security.core.entity.UserEntity;
import com.blog.security.core.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Description 系统用户业务实现
 */
@Service("UserService")
public class UserServiceImpl extends ServiceImpl<UserDao, UserEntity> implements UserService {

    /**
     * 根据用户名查询实体
     * @Param  username 用户名
     * @Return UserEntity 用户实体
     */
    @Override
    public UserEntity selectUserByName(String username) {
        QueryWrapper<UserEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda().eq(UserEntity::getUsername,username);
        return this.baseMapper.selectOne(queryWrapper);
    }

}