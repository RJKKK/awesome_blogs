package com.blog.security.core.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.security.core.dao.UserRoleDao;
import com.blog.security.core.entity.UserRoleEntity;
import com.blog.security.core.service.UserRoleService;
import org.springframework.stereotype.Service;

/**
 * @Description 用户与角色业务实现
 */
@Service("UserRoleService")
public class UserRoleServiceImpl extends ServiceImpl<UserRoleDao, UserRoleEntity> implements UserRoleService {

}