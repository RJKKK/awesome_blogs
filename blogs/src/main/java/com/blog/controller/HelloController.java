package com.blog.controller;

import com.blog.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @Autowired
    private IUserService iUserService;

    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }

//    @GetMapping("/get")
//    public List<User> getUserList(){
//        return iUserService.getUserList();
//    }
//
//    @GetMapping("/getUser/{id}")
//    public User getUser(@PathVariable int id){
//        return iUserService.getUser(id);
//    }

}
