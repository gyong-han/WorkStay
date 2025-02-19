package com.kh.springfinal.guest;

import lombok.Data;

@Data
public class GuestVo {

    private String no;
    private String image;
    private String name;
    private String nick;
    private String pwd;
    private String email;
    private String phone;
    private String birthDate;
    private String pageNick;
    private String enrollDate;
    private String hostPermission;
}
