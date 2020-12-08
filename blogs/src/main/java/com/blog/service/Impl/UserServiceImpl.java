package com.blog.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.mapper.UserMapper;
import com.blog.pojo.User;
import com.blog.service.IUserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {
//    @Autowired
//    private UserMapper userMapper;

//    @Override
//    public List<User> getUserList() {
//        return userMapper.getUserList();
//    }

    @Override
    public User getUserById(int id) {
        return baseMapper.selectById(id);
    }

}
