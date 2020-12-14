package com.blog.vo;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserVo implements Serializable {
    @TableId
    private int userId;
    private String account;
    private String username;
    private String password;
    private boolean status;
    private boolean type;
    private String auth;
    private Date createTime;
    private Date updateTime;
    private int phone;

}
