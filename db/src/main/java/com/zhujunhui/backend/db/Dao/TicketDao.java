package com.zhujunhui.backend.db.Dao;

public class TicketDao {
    private int tid;

    public int getTid() {
        return tid;
    }

    public void setTid(int tid) {
        this.tid = tid;
    }

    private String ticketName;
    private int availableNumber;
    private int price;
    private String venues;
    private String typeName;
    private String beginTime;
    private String endTime;

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

    public TicketDao(int tid, String name, int num, int price, String venues, String typeName,String begin,String end){
        this.tid=tid;
        this.ticketName=name;
        this.availableNumber=num;
        this.price=price;
        this.venues = venues;
        this.typeName=typeName;
        this.beginTime=begin;
        this.endTime=end;
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

    public String getVenues() {
        return venues;
    }

    public void setVenues(String venues) {
        this.venues = venues;
    }
}
