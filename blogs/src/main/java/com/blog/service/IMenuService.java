package com.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.blog.common.ServerResponse;
import com.blog.pojo.Menu;

public interface IMenuService extends IService<Menu> {
    ServerResponse<Menu> getAuthorization(Integer MenuId);
}
