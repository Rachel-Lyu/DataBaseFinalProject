package com.zhujunhui.backend.db.loginConfig;

import com.zhujunhui.backend.db.ResultBean;
import com.zhujunhui.backend.db.model.User;
import com.zhujunhui.backend.db.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@RestController
public class LoginController {
    @Autowired
    private UserService userService;

    @Autowired
    private StringRedisTemplate redisTemplate;

    @RequestMapping("/api/login")
    public ResultBean login(HttpServletRequest request, String id, String password) throws Exception {
        User user = userService.findByIdAndPassword(id, password);
        if (user != null) {
            HttpSession session = request.getSession();
            session.setAttribute("loginUserId", user.getUid());
            redisTemplate.opsForValue().set("loginUser:" + user.getUid(), session.getId());

            return new ResultBean(0, "登录成功！");
        } else {
            return new ResultBean(1,"用户名或密码错误！");
        }
    }

}