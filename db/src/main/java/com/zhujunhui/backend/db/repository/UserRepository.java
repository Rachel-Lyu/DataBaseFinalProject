package com.zhujunhui.backend.db.repository;

import com.zhujunhui.backend.db.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    public Optional<User> findByUidAndPassword(String id, String password);
}
