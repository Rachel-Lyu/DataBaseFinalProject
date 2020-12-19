package com.zhujunhui.backend.db.service;

import com.zhujunhui.backend.db.Dao.TicketDao;
import com.zhujunhui.backend.db.Dao.TicketDetail;
import com.zhujunhui.backend.db.model.Ticket;
import com.zhujunhui.backend.db.repository.TicketRepository;
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

    public List<TicketDao> getAll() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        List<TicketDao> list = new ArrayList<>();
        List<Ticket> lists = ticketRepository.findAll();
        for(int i =0;i<lists.size();++i) {
            list.add(new TicketDao(lists.get(i).getTid(),lists.get(i).getTicketName(),
                    lists.get(i).getAvailableNumber(),lists.get(i).getPrice(),lists.get(i).getTypeName(),
                    sdf.format(lists.get(i).getBeginTime()),
                    sdf.format(lists.get(i).getEndTime())));
        }
        return list;
    }

    public List<TicketDao> search(String typeName, String ticketName,Date begin,Date end) {
        List<Ticket> tickets = ticketRepository.findByTypeNameAndTicketNameLikeAndBeginTimeAfterAndEndTimeBefore(typeName,ticketName,begin,end);
        if(tickets==null)
            return null;
        List<TicketDao> list = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for(int i =0;i<tickets.size();++i) {
            list.add(new TicketDao(tickets.get(i).getTid(),tickets.get(i).getTicketName(),
                    tickets.get(i).getAvailableNumber(),tickets.get(i).getPrice(),tickets.get(i).getTypeName(),
                            sdf.format(tickets.get(i).getBeginTime()),
                            sdf.format(tickets.get(i).getEndTime()))
                    );
        }
        return list;
    }

    public TicketDetail getOne(int id){
        Optional<Ticket> ticket = ticketRepository.findById(id);
        if(ticket.isPresent()) {
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
