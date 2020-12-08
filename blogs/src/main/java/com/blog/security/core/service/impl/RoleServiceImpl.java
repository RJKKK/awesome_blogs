package com.blog.security.core.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.security.core.dao.RoleDao;
import com.blog.security.core.entity.RoleEntity;
import com.blog.security.core.service.RoleService;
import org.springframework.stereotype.Service;

/**
 * @Description 角色业务实现
 */
@Service("RoleService")
public class RoleServiceImpl extends ServiceImpl<RoleDao, RoleEntity> implements RoleService {

}