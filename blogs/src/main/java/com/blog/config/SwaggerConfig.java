package com.blog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;

@Configuration//表明这是一个配置类
@EnableSwagger2//开启Swagger服务
public class SwaggerConfig {

    //配置多个分组：实现多个Docket实例
//    @Bean
//    public Docket docket1(){
//        return new Docket(DocumentationType.SWAGGER_2).groupName("A");
//    }
//
//    @Bean
//    public Docket docket2(){
//        return new Docket(DocumentationType.SWAGGER_2).groupName("B");
//    }

    //配置了Swagger的Docket的Bean实例
    @Bean
    public Docket docket(Environment environment){
//        //设置要显示的Swagger环境
        Profiles profiles = Profiles.of("dev","test");
//        //通过environment.acceptsProfiles()判断是否处于需要开启Swagger的环境
        boolean flag = environment.acceptsProfiles(profiles);
        System.out.println(flag);
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .groupName("芈")//配置API文档分组
                .enable(flag)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.blog.controller"))//basePackage：配置要扫描接口的包
//                .paths(PathSelectors.ant("/mi/"))过滤什么路径
                .build();
    }

    //配置apiInfo
    private ApiInfo apiInfo(){
        //作者信息
        Contact contact = new Contact("芈", "https://blog.csdn.net/qq_42500503", "996489871@qq.com");
        return new ApiInfo("芈的SwaggerAPI文档",
                "自己选的路，怎么也要走完", "1.0",
                "https://blog.csdn.net/qq_42500503", contact, "Apache 2.0",
                "http://www.apache.org/licenses/LICENSE-2.0", new ArrayList());

    }

}
