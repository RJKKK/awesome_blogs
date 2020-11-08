package com.blog.service;

import com.blog.pojo.User;

import java.util.List;

public interface IUserService {

    List<User> getUserList();

    User getUser(int id);
}
