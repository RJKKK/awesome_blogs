package com.blog.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.common.ServerResponse;
import com.blog.mapper.UserMapper;
import com.blog.pojo.User;
import com.blog.service.IUserService;
import com.blog.vo.UserVo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {
    @Autowired
    private UserMapper userMapper;

//    @Override
//    public List<User> getUserList() {
//        return userMapper.getUserList();
//    }

    @Override
    public User getUserById(int id) {
        return baseMapper.selectById(id);
    }

    @Override
    public ServerResponse<String> register(UserVo userVo) {
        ServerResponse validResponse = this.checkValid(userVo.getUsername());
        if(!validResponse.isSuccess()){
            return validResponse;
        }
        userVo.setType(false);
        //BCrypt加密
        userVo.setPassword(new BCryptPasswordEncoder().encode(userVo.getPassword()));
        User user = new User();
        BeanUtils.copyProperties(userVo,user);
        int result = this.baseMapper.insert(user);
        if (result == 0){
            return ServerResponse.createByErrorMessage("注册失败");
        }
        return ServerResponse.createBySuccessMessage("注册成功");
    }

    public ServerResponse<String> checkValid(String str){
        if(org.apache.commons.lang3.StringUtils.isNotBlank(str)){
            //开始校验
                int resultCount = userMapper.checkUsername(str);
                if(resultCount > 0 ){
                    return ServerResponse.createByErrorMessage("用户名已存在");
                }
        }else{
            return ServerResponse.createByErrorMessage("参数错误");
        }
        return ServerResponse.createBySuccessMessage("校验成功");
    }

}
