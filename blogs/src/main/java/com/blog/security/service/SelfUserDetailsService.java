package com.blog.security.service;

import com.blog.security.core.entity.UserEntity;
import com.blog.security.core.service.UserService;
import com.blog.security.entity.SelfUserEntity;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 * SpringSecurity用户的业务实现
 */
@Component
public class SelfUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService UserService;

    /**
     * 查询用户信息
     * @Param  username  用户名
     * @Return UserDetails SpringSecurity用户信息
     */
    @Override
    public SelfUserEntity loadUserByUsername(String username) throws UsernameNotFoundException {
        // 查询用户信息
        UserEntity UserEntity =UserService.selectUserByName(username);
        if (UserEntity!=null){
            // 组装参数
            SelfUserEntity selfUserEntity = new SelfUserEntity();
            BeanUtils.copyProperties(UserEntity,selfUserEntity);
            return selfUserEntity;
        }
        return null;
    }
}