package com.zhujunhui.backend.db.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name="user")
public class User {

    public String getPassword() {
        return password;
    }

    @Id
    @Column(name = "uid", unique = true, nullable = false, length = 20)
    private String uid;

    @Column(length = 16)
    private String nickname;

    public String getNickname() {
        return nickname;
    }

    @Column(length = 16)
    private String password;

    @Override
    public String toString() {
        return "User{" +
                "uid='" + uid + '\'' +
                ", nickname='" + nickname + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUid() {
        return uid;
    }
}
