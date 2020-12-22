package com.zhujunhui.backend.db.service;

import com.zhujunhui.backend.db.Dao.TicketTypeDao;
import com.zhujunhui.backend.db.model.TicketType;
import com.zhujunhui.backend.db.repository.TicketTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TicketTypeService {

    @Autowired
    private TicketTypeRepository ticketTypeRepository;


    public List<TicketTypeDao> getAllTypes() {
        List<TicketType> types = ticketTypeRepository.findAll();

        if (types.isEmpty())
            return null;

        TicketType typeAll = new TicketType();
        typeAll.setTypeName("全部");
        types.add(0, typeAll);

        List<TicketTypeDao> list = new ArrayList<>();
        for (TicketType type : types) {
            list.add(new TicketTypeDao(type.getTypeName()));
        }
        return list;
    }
}
