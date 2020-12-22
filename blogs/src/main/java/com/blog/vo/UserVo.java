package com.blog.vo;

import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@ApiModel("用户视图类")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserVo implements Serializable {

    @ApiModelProperty("用户账号名")
    private String account;
    @ApiModelProperty("用户名,如果用户名不填，默认为Account")
    private String username;
    @ApiModelProperty("用户密码")
    private String password;
    @ApiModelProperty("邮箱")
    private String email;
}
