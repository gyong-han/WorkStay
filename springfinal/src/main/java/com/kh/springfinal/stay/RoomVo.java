package com.kh.springfinal.stay;

import lombok.Data;

@Data
public class RoomVo {
    private Long no;
    private String stayNo;
    private String name;
    private String introduction;
    private String price;
    private String maxGuest;
    private String delYn;
    private String enrollDate;
    private String modifiyDate;
    private String standardGuest;
}
