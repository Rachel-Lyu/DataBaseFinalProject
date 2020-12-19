package com.zhujunhui.backend.db.controller;

import com.zhujunhui.backend.db.ResultBean;
import com.zhujunhui.backend.db.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResultBean<String> Register(@RequestBody Map<String, String> map) {
        if(map.get("id")==null || map.get("password")==null||map.get("name")==null)
            return new ResultBean(1,"缺少信息");
        if(userService.register(map.get("id"),
                map.get("name"),
                map.get("password"))==0)
            return ResultBean.success();
        return ResultBean.error(1,"该ID已存在！");
    }
}
