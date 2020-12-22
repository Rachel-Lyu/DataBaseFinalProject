package com.zhujunhui.backend.db.repository;

import com.zhujunhui.backend.db.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findByTypeNameAndTicketNameLikeAndBeginTimeAfterAndEndTimeBeforeAndCity(String typeName, String ticketName, Date begin, Date end, String city);

    List<Ticket> findByTypeNameAndTicketNameLikeAndBeginTimeAfterAndEndTimeBefore(String typeName, String ticketName, Date begin, Date end);

    List<Ticket> findByTypeNameAndTicketNameLikeAndBeginTimeAfterAndCity(String typeName, String ticketName, Date begin, String city);

    List<Ticket> findByTypeNameAndTicketNameLikeAndEndTimeBeforeAndCity(String typeName, String ticketName, Date begin, String city);

    List<Ticket> findByTypeNameAndTicketNameLikeAndBeginTimeAfter(String typeName, String ticketName, Date begin);

    List<Ticket> findByTypeNameAndTicketNameLikeAndEndTimeBefore(String typeName, String ticketName, Date begin);

    List<Ticket> findByTypeNameAndTicketNameLikeAndCity(String typeName, String ticketName, String city);

    List<Ticket> findByTypeNameAndTicketNameLike(String typeName, String ticketName);

    List<Ticket> AndTicketNameLikeAndBeginTimeAfterAndEndTimeBeforeAndCity(String ticketName, Date begin, Date end, String city);

    List<Ticket> AndTicketNameLikeAndBeginTimeAfterAndEndTimeBefore(String ticketName, Date begin, Date end);

    List<Ticket> AndTicketNameLikeAndBeginTimeAfterAndCity(String ticketName, Date begin, String city);

    List<Ticket> AndTicketNameLikeAndEndTimeBeforeAndCity(String ticketName, Date begin, String city);

    List<Ticket> AndTicketNameLikeAndBeginTimeAfter(String ticketName, Date begin);

    List<Ticket> AndTicketNameLikeAndEndTimeBefore(String ticketName, Date begin);

    List<Ticket> AndTicketNameLikeAndCity(String ticketName, String city);

    List<Ticket> AndTicketNameLike(String ticketName);

}
