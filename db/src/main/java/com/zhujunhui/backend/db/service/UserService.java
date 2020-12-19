package com.zhujunhui.backend.db.service;

import com.zhujunhui.backend.db.model.User;
import com.zhujunhui.backend.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findById(String id) {
        System.out.println("id: "+id);
        Optional<User> user = userRepository.findById(id);
        return user.isPresent() ? user.get():null;
    }

    public User findByIdAndPassword(String id,String password){
        System.out.println("登录id："+id);
        Optional<User> user = userRepository.findByUidAndPassword(id,password);
        return user.isPresent() ?user.get():null;
    }

    public int register(String id, String name, String password) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent())
            return 1;
        System.out.println("the id captured: "+id);
        User newUser = new User();
        newUser.setUid(id);
        newUser.setNickname(name);
        newUser.setPassword(password);
        userRepository.saveAndFlush(newUser);
        return 0;
    }
}
