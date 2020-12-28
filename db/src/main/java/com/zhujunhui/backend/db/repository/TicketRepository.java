package com.zhujunhui.backend.db.repository;

import com.zhujunhui.backend.db.model.Ticket;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    @Query("SELECT t FROM Ticket t WHERE (:typeName is null or t.typeName = :typeName) and (t.ticketName like :ticketName) " +
            "and (:begin is null or t.beginTime > :begin) and (:end is null or t.endTime < :end) and (:city is null or t.city = :city)")
    List<Ticket> findConditions(@Param("typeName") String typeName, @Param("ticketName") String ticketName, @Param("begin") Date begin, @Param("end") Date end, @Param("city") String city);
}
