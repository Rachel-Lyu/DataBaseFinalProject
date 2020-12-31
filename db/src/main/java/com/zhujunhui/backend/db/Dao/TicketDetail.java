package com.zhujunhui.backend.db.Dao;

public class TicketDetail {
    private String ticketName;
    private int availableNumber;
    private int price;
    private String city;
    private String venues;
    private String typeName;
    private String beginTime;
    private String endTime;
    private String detail;
    private String poster;

    public TicketDetail(String ticketName, int availableNumber, int price, String city, String venues, String typeName, String beginTime, String endTime, String detail, String poster) {
        this.ticketName = ticketName;
        this.availableNumber = availableNumber;
        this.price = price;
        this.city = city;
        this.venues = venues;
        this.typeName = typeName;
        this.beginTime = beginTime;
        this.endTime = endTime;
        this.detail = detail;
        this.poster = poster;
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

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getVenues() {
        return venues;
    }

    public void setVenues(String venues) {
        this.venues = venues;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }
}
