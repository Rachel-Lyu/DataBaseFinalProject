package com.zhujunhui.backend.db.repository;

import com.zhujunhui.backend.db.model.UserOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserOrderRepository extends JpaRepository<UserOrder,Integer> {
    List<UserOrder> findByUserId(String userId);
}
