package com.zhujunhui.backend.db.service;

import com.sun.org.apache.xpath.internal.operations.Bool;
import com.zhujunhui.backend.db.Dao.TicketDao;
import com.zhujunhui.backend.db.Dao.TicketDetail;
import com.zhujunhui.backend.db.model.Ticket;
import com.zhujunhui.backend.db.model.TicketType;
import com.zhujunhui.backend.db.repository.TicketRepository;
import com.zhujunhui.backend.db.repository.TicketTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private TicketTypeRepository ticketTypeRepository;

    public List<TicketDao> getAll() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        List<TicketDao> list = new ArrayList<>();
        List<Ticket> lists = ticketRepository.findAll();
        for (Ticket ticket : lists) {
            list.add(new TicketDao(ticket.getTid(), ticket.getTicketName(),
                    ticket.getAvailableNumber(), ticket.getPrice(), ticket.getTypeName(),
                    sdf.format(ticket.getBeginTime()),
                    sdf.format(ticket.getEndTime())));
        }
        return list;
    }

    public List<TicketDao> getAllCities() {
        return new ArrayList<>();
    }

    public List<TicketDao> search(boolean isFatherType, String typeName, String ticketName, Date begin, Date end, String city) {
        List<Ticket> tickets = new ArrayList<>();
        List<TicketType> sonType = new ArrayList<>();
//        System.out.println(typeName);
        if (typeName != null) {
            if (isFatherType)
                sonType = ticketTypeRepository.findByParentName(typeName);
            else
                sonType = ticketTypeRepository.findByTypeName(typeName);
            for (TicketType ticketType : sonType)
                tickets = ticketRepository.findConditions(ticketType.getTypeName(), ticketName, begin, end, city);
        } else
            tickets = ticketRepository.findConditions(null, ticketName, begin, end, city);

        if (tickets.isEmpty())
            return null;
        List<TicketDao> list = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for (Ticket ticket : tickets) {
            list.add(new TicketDao(ticket.getTid(), ticket.getTicketName(),
                    ticket.getAvailableNumber(), ticket.getPrice(), ticket.getTypeName(),
                    sdf.format(ticket.getBeginTime()),
                    sdf.format(ticket.getEndTime()))
            );
        }
        return list;
    }

    public TicketDetail getOne(int id) {
        Optional<Ticket> ticket = ticketRepository.findById(id);
        if (ticket.isPresent()) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Ticket object = ticket.get();
            return new TicketDetail(object.getTicketName(),
                    object.getAvailableNumber(),
                    object.getPrice(),
                    object.getTypeName(),
                    sdf.format(object.getBeginTime()),
                    sdf.format(object.getEndTime()),
                    object.getDetail());
        }
        return null;
    }
}
