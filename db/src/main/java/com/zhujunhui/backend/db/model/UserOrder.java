package com.zhujunhui.backend.db.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class UserOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int orderId;

    @Column
    private int ticketId;

    @Column
    private String userId;

    @Column
    private Date dealTime;

    public Date getDealTime() {
        return dealTime;
    }

    public void setDealTime(Date dealTime) {
        this.dealTime = dealTime;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
