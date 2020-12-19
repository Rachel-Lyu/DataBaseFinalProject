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
        if(types==null)
            return null;
        List<TicketTypeDao> list = new ArrayList<>();
        for(int i=0;i< types.size();++i){
            list.add(new TicketTypeDao(types.get(i).getType_name()));
        }
        return list;
    }
}
