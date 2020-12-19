package com.zhujunhui.backend.db.repository;

import com.zhujunhui.backend.db.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket,Integer> {
    List<Ticket> findByTypeNameAndTicketNameLikeAndBeginTimeAfterAndEndTimeBefore(String typeName,String ticketName,Date begin,Date end);
}
