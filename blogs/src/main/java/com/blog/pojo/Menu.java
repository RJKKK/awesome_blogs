package com.blog.pojo;


import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@ApiModel("权限类")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Menu  implements Serializable {
    @TableId
    @ApiModelProperty("权限ID")
    private Integer menuId;
    @ApiModelProperty("路由")
    private String url;
    @ApiModelProperty("一级分类")
    private String type;
    @ApiModelProperty("二级分类")
    private String name;
}
