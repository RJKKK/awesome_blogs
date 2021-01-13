package com.blog.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.common.Const;
import com.blog.common.ResponseCode;
import com.blog.common.ServerResponse;
import com.blog.mapper.UserMapper;
import com.blog.pojo.Menu;
import com.blog.pojo.User;
import com.blog.security.entity.SelfUserEntity;
import com.blog.service.IUserService;
import com.blog.utils.SecurityUtil;
import com.blog.vo.UserVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service("IUserService")
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {
    @Autowired
    private UserMapper userMapper;


    @Override
    public User getUserById(int id) {
        return baseMapper.selectById(id);
    }

    @Override
    public ServerResponse<String> register(UserVo userVo) {
        ServerResponse validResponse = this.checkValid(userVo.getUsername(), Const.USERNAME);
        if(!validResponse.isSuccess()){
            return validResponse;
        }
        validResponse = this.checkValid(userVo.getEmail(),Const.EMAIL);
        if(!validResponse.isSuccess()){
            return validResponse;
        }
        //BCrypt加密
        userVo.setPassword(new BCryptPasswordEncoder().encode(userVo.getPassword()));
        User user = new User();
        BeanUtils.copyProperties(userVo,user);
        user.setType(false);
        user.setStatus(true);
        user.setCreateTime(new Date());
        user.setUpdateTime(new Date());
        //如果用户名不填，默认为Account
        if (StringUtils.isNotBlank(userVo.getUsername())){
            user.setUsername(userVo.getAccount());
        }
        int result = this.baseMapper.insert(user);
        if (result == 0){
            return ServerResponse.createByErrorMessage("注册失败");
        }
        return ServerResponse.createBySuccessMessage("注册成功");
    }

    @Override
    public ServerResponse<User> getUserInfo() {
        User user = this.getUserById(SecurityUtil.getUserId());
        if (user != null){
            return ServerResponse.createBySuccess(user);
        }
        return  ServerResponse.createByErrorWithoutMessage(ResponseCode.NEED_LOGIN);
    }

    @Override
    public ServerResponse<String> updateUserInfo(UserVo userVo) {
        User user = this.getUserById(SecurityUtil.getUserId());
        user.setUsername(userVo.getUsername());

        return ServerResponse.createByErrorWithoutMessage(ResponseCode.NEED_LOGIN);
    }


    public ServerResponse<String> checkValid(String str,String type){
        if(StringUtils.isNotBlank(type)){
            //开始校验
            if(Const.USERNAME.equals(type)){
                int resultCount = userMapper.checkUsername(str);
                if(resultCount > 0 ){
                    return ServerResponse.createByErrorMessage("用户名已存在");
                }
            }
            if(Const.EMAIL.equals(type)){
                int resultCount = userMapper.checkEmail(str);
                if(resultCount > 0 ){
                    return ServerResponse.createByErrorMessage("email已存在");
                }
            }
        }else{
            return ServerResponse.createByErrorMessage("参数错误");
        }
        return ServerResponse.createBySuccessMessage("校验成功");
    }


}
