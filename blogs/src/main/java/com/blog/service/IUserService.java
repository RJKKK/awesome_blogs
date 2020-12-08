package com.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.blog.pojo.User;

public interface IUserService extends IService<User> {

//    List<User> getUserList();

    User getUserById(int id);
}
