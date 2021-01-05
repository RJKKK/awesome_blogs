package com.blog.controller.portal;

import com.blog.common.ServerResponse;
import com.blog.pojo.User;
import com.blog.service.IUserService;
import com.blog.vo.UserVo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "前台用户控制器")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService iUserService;

    @ApiOperation("注册用户")
    @RequestMapping(value = "/register",method = RequestMethod.POST)
    public ServerResponse<String> register(UserVo userVo){
        return iUserService.register(userVo);
    }

    @ApiOperation("用户登录（框架已经设置为/login）,参数不变，方式更改为POST")
    @RequestMapping(value = "/falseLogin",method = RequestMethod.GET)
    public ServerResponse<String> login(String username,String password){
        return ServerResponse.createBySuccess("登录");
    }

    @ApiOperation("用户注销（框架已经设置为/logout），方式更改为POST")
    @RequestMapping(value = "/falseLogout",method = RequestMethod.GET)
    public ServerResponse<String> logout(){
        return ServerResponse.createBySuccess("注销");
    }

    @ApiOperation("获取用户信息")
    @RequestMapping(value = "/getUserInfo",method = RequestMethod.GET)
    public ServerResponse<User> getUserInfo(){
        return iUserService.getUserInfo();
    }

    @ApiOperation("更新用户信息")
    @RequestMapping(value = "/updateUserInfo",method = RequestMethod.POST)
    public ServerResponse<String> updateUserInfo(UserVo userVo){
        return iUserService.updateUserInfo(userVo);
    }

}
