package com.zhujunhui.backend.db.repository;

import com.zhujunhui.backend.db.model.Ticket;
import com.zhujunhui.backend.db.model.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface TicketTypeRepository extends JpaRepository<TicketType, String> {
    List<TicketType> findByTypeName(String typeName);

    List<TicketType> findByParentName(String parentName);

    List<TicketType> findByParentNameIsNull();

}
