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
}
