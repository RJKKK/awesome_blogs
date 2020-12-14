package com.blog.controller.backend;

import com.blog.common.ServerResponse;
import com.blog.pojo.User;
import com.blog.security.core.entity.MenuEntity;
import com.blog.security.core.entity.RoleEntity;
import com.blog.security.core.entity.UserEntity;
import com.blog.security.core.service.MenuService;
import com.blog.security.core.service.RoleService;
import com.blog.security.core.service.UserService;
import com.blog.security.entity.SelfUserEntity;
import com.blog.service.IUserService;
import com.blog.utils.ResultUtil;
import com.blog.utils.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 管理端

 */
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService UserService;
    @Autowired
    private RoleService RoleService;
    @Autowired
    private MenuService MenuService;
    @Autowired
    private IUserService iUserService;

    /**
     * 管理端信息
     * @Return Map<String,Object> 返回数据MAP
     */
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/info",method = RequestMethod.GET)
    public ServerResponse <User> userLogin(){
//        SelfUserEntity userDetails = SecurityUtil.getUserInfo();
//        System.out.println(SecurityUtil.getUserId());
        User user = iUserService.getUserById(SecurityUtil.getUserId());
        return ServerResponse.createBySuccess("管理端信息",user);
    }

//    /**
//     * 拥有ADMIN或者USER角色可以访问
//     * @Return Map<String,Object> 返回数据MAP
//     */
//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
//    @RequestMapping(value = "/list",method = RequestMethod.GET)
//    public Map<String,Object> list(){
//        Map<String,Object> result = new HashMap<>();
//        List<UserEntity> UserEntityList = UserService.list();
//        result.put("title","拥有用户或者管理员角色都可以查看");
//        result.put("data",UserEntityList);
//        return ResultUtil.resultSuccess(result);
//    }
//
//    /**
//     * 拥有ADMIN和USER角色可以访问
//     * @Return Map<String,Object> 返回数据MAP
//     */
//    @PreAuthorize("hasRole('ADMIN') and hasRole('USER')")
//    @RequestMapping(value = "/menuList",method = RequestMethod.GET)
//    public Map<String,Object> menuList(){
//        Map<String,Object> result = new HashMap<>();
//        List<MenuEntity> MenuEntityList = MenuService.list();
//        result.put("title","拥有用户和管理员角色都可以查看");
//        result.put("data",MenuEntityList);
//        return ResultUtil.resultSuccess(result);
//    }
//
//
//    /**
//     * 拥有sys:user:info权限可以访问
//     * hasPermission 第一个参数是请求路径 第二个参数是权限表达式
//     * @Return Map<String,Object> 返回数据MAP
//     */
//    @PreAuthorize("hasPermission('/admin/userList','sys:user:info')")
//    @RequestMapping(value = "/userList",method = RequestMethod.GET)
//    public Map<String,Object> userList(){
//        Map<String,Object> result = new HashMap<>();
//        List<UserEntity> UserEntityList = UserService.list();
//        result.put("title","拥有sys:user:info权限都可以查看");
//        result.put("data",UserEntityList);
//        return ResultUtil.resultSuccess(result);
//    }
//
//
//    /**
//     * 拥有ADMIN角色和sys:role:info权限可以访问
//     * @Return Map<String,Object> 返回数据MAP
//     */
//    @PreAuthorize("hasRole('ADMIN') and hasPermission('/admin/adminRoleList','sys:role:info')")
//    @RequestMapping(value = "/adminRoleList",method = RequestMethod.GET)
//    public Map<String,Object> adminRoleList(){
//        Map<String,Object> result = new HashMap<>();
//        List<RoleEntity> RoleEntityList = RoleService.list();
//        result.put("title","拥有ADMIN角色和sys:role:info权限可以访问");
//        result.put("data",RoleEntityList);
//        return ResultUtil.resultSuccess(result);
//    }
}