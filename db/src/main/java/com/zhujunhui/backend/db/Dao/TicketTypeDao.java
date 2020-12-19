package com.zhujunhui.backend.db.Dao;

public class TicketTypeDao {
    String type_name;

    public String getType_name() {
        return type_name;
    }

    public void setType_name(String type_name) {
        this.type_name = type_name;
    }

    public TicketTypeDao(String type_name) {
        this.type_name = type_name;
    }
}
