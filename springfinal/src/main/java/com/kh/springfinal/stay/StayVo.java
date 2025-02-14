package com.kh.springfinal.stay;

import lombok.Data;

@Data
public class StayVo {
    private Long no;
    private Long hostNo;
    private Long statusNo;
    private Long businessTypeNo;
    private String name;
    private String phone;
    private String address;
    private String delYn;
    private String enrollDate;
    private String modifyDate;
    private String tagline;
    private String introduction;
    private String sns;
    private String brn;
    private String season;
}
