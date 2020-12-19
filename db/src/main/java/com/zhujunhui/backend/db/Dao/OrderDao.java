package com.zhujunhui.backend.db.Dao;

public class OrderDao {
    private int orderId;
    private int ticketId;
    private String time;
    private String ticketName;

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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getTicketName() {
        return ticketName;
    }

    public void setTicketName(String ticketName) {
        this.ticketName = ticketName;
    }

    public OrderDao(String ticketName, int ticketId, String time,int orderId) {
        this.orderId = orderId;
        this.ticketId = ticketId;
        this.time = time;
        this.ticketName = ticketName;
    }
}
