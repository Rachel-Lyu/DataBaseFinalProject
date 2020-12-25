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

    public List<TicketTypeDao> getAllFatherTypes() {
        List<TicketType> types = ticketTypeRepository.findByParentNameIsNull();
//        System.out.println(types);
        return getTicketTypeDao(types);
    }

    public List<TicketTypeDao> getAllSonsOf(String parentName) {
        List<TicketType> types = new ArrayList<>();
        if (parentName != null)
            types = ticketTypeRepository.findByParentName(parentName);

        return getTicketTypeDao(types);
    }

    private List<TicketTypeDao> getTicketTypeDao(List<TicketType> types) {
//        if (types.isEmpty())
//            return null;

        TicketType typeAll = new TicketType();
        typeAll.setTypeName("全部");
        types.add(0, typeAll);

        List<TicketTypeDao> list = new ArrayList<>();
        for (TicketType type : types) {
            list.add(new TicketTypeDao(type.getTypeName()));
        }
        return list;
    }

    public List<TicketTypeDao> getAllTypes() {
        List<TicketType> types = ticketTypeRepository.findAll();

        return getTicketTypeDao(types);
    }
}
