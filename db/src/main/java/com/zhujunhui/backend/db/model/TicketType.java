package com.zhujunhui.backend.db.model;

import javax.persistence.*;

@Entity
@Table(name="ticket_type")
public class TicketType {

    public String getType_name() {
        return type_name;
    }

    public void setType_name(String type_name) {
        this.type_name = type_name;
    }

    public String getParent_name() {
        return parent_name;
    }

    public void setParent_name(String parent_name) {
        this.parent_name = parent_name;
    }

    @Id
    @Column(name = "type_name", unique = true, nullable = false, length = 8)
    private String type_name;

    @Column(length = 8)
    private String parent_name;

}
