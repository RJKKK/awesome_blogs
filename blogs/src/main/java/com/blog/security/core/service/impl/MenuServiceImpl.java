package com.blog.security.core.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.security.core.dao.MenuDao;
import com.blog.security.core.entity.MenuEntity;
import com.blog.security.core.service.MenuService;
import org.springframework.stereotype.Service;

/**
 * @Description 权限业务实现
 */
@Service("MenuService")
public class MenuServiceImpl extends ServiceImpl<MenuDao, MenuEntity> implements MenuService {

}