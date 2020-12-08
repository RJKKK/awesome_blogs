package com.blog.security.core.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.security.core.dao.RoleMenuDao;
import com.blog.security.core.entity.RoleMenuEntity;
import com.blog.security.core.service.RoleMenuService;
import org.springframework.stereotype.Service;

/**
 * @Description 角色与权限业务实现
 */
@Service("RoleMenuService")
public class RoleMenuServiceImpl extends ServiceImpl<RoleMenuDao, RoleMenuEntity> implements RoleMenuService {

}