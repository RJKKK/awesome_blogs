//package com.blog.service.Impl;
//
//import com.blog.mapper.UserMapper;
//import com.blog.pojo.User;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserDetailServiceImpl implements UserDetailsService {
////    @Autowired
////    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private UserMapper userMapper;
//
//    @Override
//    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
//        User user = userMapper.getUserByAccount(s);
//        if (user == null){
//            throw new UsernameNotFoundException("用户不存在");
//        }
//        return new org.springframework.security.core.userdetails.User(s,user.getPassword(),
//                AuthorityUtils.commaSeparatedStringToAuthorityList(user.getAuth()));
//    }
//}
