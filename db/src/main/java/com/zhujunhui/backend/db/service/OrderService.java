package com.zhujunhui.backend.db.service;

import com.zhujunhui.backend.db.Dao.OrderDao;
import com.zhujunhui.backend.db.model.Ticket;
import com.zhujunhui.backend.db.model.UserOrder;
import com.zhujunhui.backend.db.repository.TicketRepository;
import com.zhujunhui.backend.db.repository.UserOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    UserOrderRepository orderRepository;

    @Autowired
    TicketRepository ticketRepository;

    public List<OrderDao> getSelfOrders(String userId) {
        List<UserOrder> orders= orderRepository.findByUserId(userId);
        if(orders==null)
            return null;
        List<OrderDao> list = new ArrayList<>();
        Ticket ticket;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for(int i =0;i<orders.size();++i){
            ticket = ticketRepository.findById(orders.get(i).getTicketId()).get();
            list.add(new OrderDao(ticket.getTicketName(),ticket.getTid(),sdf.format(orders.get(i).getDealTime()),orders.get(i).getOrderId()));
        }
        return list;
    }

    public int createOrder(String userId,int ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId).get();
        if(ticket.getAvailableNumber()==0)
            return 1;
        UserOrder newOrder=new UserOrder();
        newOrder.setDealTime(new Date());
        newOrder.setTicketId(ticketId);
        newOrder.setUserId(userId);
        orderRepository.saveAndFlush(newOrder);
        ticket.setAvailableNumber(ticket.getAvailableNumber()-1);
        ticketRepository.saveAndFlush(ticket);
        return 0;

    }

    public int deleteOrder(int orderId) {
        Optional<UserOrder> order = orderRepository.findById(orderId);
        if(!order.isPresent())
            return 1;
        Ticket ticket = ticketRepository.findById(order.get().getTicketId()).get();
        ticket.setAvailableNumber(ticket.getAvailableNumber()+1);
        ticketRepository.saveAndFlush(ticket);

        orderRepository.deleteById(orderId);

        return 0;
    }
}
