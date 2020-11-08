package com.blog.service.Impl;

import com.blog.mapper.UserMapper;
import com.blog.pojo.User;
import com.blog.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public List<User> getUserList() {
        return userMapper.getUserList();
    }

    @Override
    public User getUser(int id) {
        return userMapper.getUser(id);
    }
}
