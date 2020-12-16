package com.blog.pojo;

import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@ApiModel("用户类")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {

    @TableId
    @ApiModelProperty("用户ID")
    private int userId;
    @ApiModelProperty("用户账号名")
    private String account;
    @ApiModelProperty("用户名")
    private String username;
    @ApiModelProperty("用户密码")
    private String password;
    @ApiModelProperty("用户状态")
    private boolean status;
    @ApiModelProperty("用户类型")
    private boolean type;
    @ApiModelProperty("用户权限")
    private String auth;
    @ApiModelProperty("用户创建时间")
    private Date createTime;
    @ApiModelProperty("用户最后修改时间")
    private Date updateTime;
    @ApiModelProperty("电话")
    private int phone;

}
