package com.blog.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Calendar;
import java.util.Map;

public class JWTUtils {

    private static final String SALT = "83G6GvsDetCTB1cX";

    /**
     * 生成token
     */

    public static String getToken(Map<String,String> map){
        Calendar instance = Calendar.getInstance();
        instance.add(Calendar.DATE,1);//默认1天过期
        JWTCreator.Builder builder = JWT.create();//创建jwt builder
        map.forEach((k,v)->{
            builder.withClaim(k,v);
        });//设置payload
        String token = builder.withExpiresAt(instance.getTime())//设置过期时间
                .sign(Algorithm.HMAC256(SALT));//签名

        return token;
    }

    /**
     * 验证token
     */
    public static void verify(String token){
        JWT.require(Algorithm.HMAC256(SALT)).build().verify(token);
    }

    /**
     * 获取token信息
     */
    public static DecodedJWT getTokenInfo(String token){
        return JWT.require(Algorithm.HMAC256(SALT)).build().verify(token);
    }
}
