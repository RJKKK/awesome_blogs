package com.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.blog.common.ServerResponse;
import com.blog.pojo.Menu;
import com.blog.pojo.User;
import com.blog.vo.UserVo;

public interface IUserService extends IService<User> {

    User getUserById(int id);

    ServerResponse<String> register(UserVo userVo);

    ServerResponse<User> getUserInfo();

    ServerResponse<String> updateUserInfo(UserVo userVo);
}
