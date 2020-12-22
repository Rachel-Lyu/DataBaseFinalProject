package com.zhujunhui.backend.db.model;

import javax.persistence.*;

@Entity
@Table(name="ticket_type")
public class TicketType {

    @Id
    @Column(name = "type_name", unique = true, nullable = false, length = 8)
    private String typeName;

    @Column(length = 9)
    private String parentName;

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }
}
