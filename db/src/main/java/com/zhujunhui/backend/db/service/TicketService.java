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

    public List<TicketDao> search(boolean isFatherType, String typeName, String ticketName, Date begin, Date end, String city) {
        List<Ticket> tickets = new ArrayList<>();
        List<TicketType> sonType = new ArrayList<>();
//        System.out.println(typeName);
        if (typeName != null)
            if (isFatherType)
                sonType = ticketTypeRepository.findByParentName(typeName);
            else
                sonType = ticketTypeRepository.findByTypeName(typeName);

        if (typeName != null && begin != null && end != null && city != null) {
            for (TicketType ticketType : sonType)
                tickets.addAll(ticketRepository.findByTypeNameAndTicketNameLikeAndBeginTimeAfterAndEndTimeBeforeAndCity(ticketType.getTypeName(), ticketName, begin, end, city));
        } else if (typeName != null && begin != null && end != null) {
            for (TicketType ticketType : sonType)
                tickets.addAll(ticketRepository.findByTypeNameAndTicketNameLikeAndBeginTimeAfterAndEndTimeBefore(ticketType.getTypeName(), ticketName, begin, end));
//        } else if (typeName != null && begin != null && city != null) {
//            for (TicketType ticketType : sonType)
//                tickets.addAll(ticketRepository.findByTypeNameAndTicketNameLikeAndBeginTimeAfterAndCity(ticketType.getTypeName(), ticketName, begin, city));
//        } else if (typeName != null && end != null && city != null) {
//            for (TicketType ticketType : sonType)
//                tickets.addAll(ticketRepository.findByTypeNameAndTicketNameLikeAndEndTimeBeforeAndCity(ticketType.getTypeName(), ticketName, end, city));
        } else if (typeName != null && city != null) {
            for (TicketType ticketType : sonType)
                tickets.addAll(ticketRepository.findByTypeNameAndTicketNameLikeAndCity(ticketType.getTypeName(), ticketName, city));
//        } else if (typeName != null && end != null) {
//            for (TicketType ticketType : sonType)
//                tickets.addAll(ticketRepository.findByTypeNameAndTicketNameLikeAndEndTimeBefore(ticketType.getTypeName(), ticketName, end));
//        } else if (typeName != null && begin != null) {
//            for (TicketType ticketType : sonType)
//                tickets.addAll(ticketRepository.findByTypeNameAndTicketNameLikeAndBeginTimeAfter(ticketType.getTypeName(), ticketName, begin));
        } else if (typeName != null) {
            for (TicketType ticketType : sonType)
                tickets.addAll(ticketRepository.findByTypeNameAndTicketNameLike(ticketType.getTypeName(), ticketName));
        } else if (begin != null && end != null && city != null)
            tickets = (ticketRepository.AndTicketNameLikeAndBeginTimeAfterAndEndTimeBeforeAndCity(ticketName, begin, end, city));
        else if (begin != null && end != null)
            tickets = (ticketRepository.AndTicketNameLikeAndBeginTimeAfterAndEndTimeBefore(ticketName, begin, end));
//        else if (begin != null && city != null)
//            tickets = (ticketRepository.AndTicketNameLikeAndBeginTimeAfterAndCity(ticketName, begin, city));
//        else if (end != null && city != null)
//            tickets = (ticketRepository.AndTicketNameLikeAndEndTimeBeforeAndCity(ticketName, end, city));
        else if (city != null)
            tickets = (ticketRepository.AndTicketNameLikeAndCity(ticketName, city));
//        else if (end != null)
//            tickets = (ticketRepository.AndTicketNameLikeAndEndTimeBefore(ticketName, end));
//        else if (begin != null)
//            tickets = (ticketRepository.AndTicketNameLikeAndBeginTimeAfter(ticketName, begin));
        else
            tickets = (ticketRepository.AndTicketNameLike(ticketName));


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
