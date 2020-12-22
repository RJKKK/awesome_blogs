package com.blog.controller.portal;

import com.blog.common.ServerResponse;
import com.blog.pojo.Menu;
import com.blog.service.IMenuService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "前台权限控制器")
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private IMenuService menuService;

    @ApiOperation("获取权限信息")
    @RequestMapping(value = "/getAuthInfo",method = RequestMethod.POST)
    public ServerResponse<Menu> getAuthorization(Integer MenuId){
        System.out.println(MenuId);
        return menuService.getAuthorization(MenuId);
    }

}
