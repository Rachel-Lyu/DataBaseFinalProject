package com.zhujunhui.backend.db.repository;

import com.zhujunhui.backend.db.model.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TicketTypeRepository extends JpaRepository<TicketType,String> {
}
