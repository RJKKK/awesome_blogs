package com.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.blog.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface UserMapper extends BaseMapper<User> {
//    List<User> getUserList();
//
//    User getUser(int id);
//
//    User getUserByAccount(String account);

    int checkUsername(String username);

    int checkEmail(String email);
}
