package com.kh.springfinal.room;

import lombok.Data;

import java.util.List;

@Data
public class RoomVo {
    private Long no;
    private Long stayNo;
    private Long hostNo;
    private String name;
    private String introduction;
    private String price;
    private String standardGuest;
    private String maxGuest;
    private String delYn;
    private String enrollDate;
    private String modifyDate;

    private String checkIn;
    private String checkOut;
    private String filePath;
    private String[] attachmentFilePaths;
    private List<String> features;
    private String hostName;

    private String singleSize;
    private String doubleSize;
    private String queenSize;

    private String stayName;
    private String[] useDay;
    private String paymentName;

    private String statusNo;
    private String[] reservations;

}
