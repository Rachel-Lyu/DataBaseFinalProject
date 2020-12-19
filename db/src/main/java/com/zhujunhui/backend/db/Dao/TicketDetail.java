package com.zhujunhui.backend.db.Dao;

public class TicketDetail {
    private String ticketName;
    private int availableNumber;
    private int price;
    private String typeName;
    private String beginTime;
    private String endTime;
    private String detail;

    public TicketDetail(String ticketName, int availableNumber, int price, String typeName, String beginTime, String endTime, String detail) {
        this.ticketName = ticketName;
        this.availableNumber = availableNumber;
        this.price = price;
        this.typeName = typeName;
        this.beginTime = beginTime;
        this.endTime = endTime;
        this.detail = detail;
    }

    public String getTicketName() {
        return ticketName;
    }

    public void setTicketName(String ticketName) {
        this.ticketName = ticketName;
    }

    public int getAvailableNumber() {
        return availableNumber;
    }

    public void setAvailableNumber(int availableNumber) {
        this.availableNumber = availableNumber;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public String getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(String beginTime) {
        this.beginTime = beginTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }
}
