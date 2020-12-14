package com.blog.security.core.dao;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.blog.security.core.entity.MenuEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 权限DAO

 */
@Mapper
public interface MenuDao extends BaseMapper<MenuEntity> {

}