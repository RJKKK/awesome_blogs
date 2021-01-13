package com.blog.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.common.ServerResponse;
import com.blog.mapper.MenuMapper;
import com.blog.pojo.Menu;
import com.blog.service.IMenuService;
import org.springframework.stereotype.Service;

@Service("IMenuService")
public class MenuServiceImpl extends ServiceImpl<MenuMapper, Menu> implements IMenuService {

    @Override
    public ServerResponse<Menu> getAuthorization(Integer MenuId) {
        System.out.println(MenuId);
        return ServerResponse.createBySuccess(this.baseMapper.selectById(MenuId));
    }
}
