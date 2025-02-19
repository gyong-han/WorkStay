package com.kh.springfinal.room;

import lombok.Data;

@Data
public class RoomVo {
    private Long no;
    private Long stayNo;
    private String name;
    private String introduction;
    private String price;
    private String maxGuest;
    private String delYn;
    private String enrollDate;
    private String modifyDate;
    private String standardGuest;
    private String singleSize;
    private String doubleSize;
    private String queenSize;
}