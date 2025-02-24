package com.kh.springfinal.space;

import lombok.Data;

import java.util.List;

@Data
public class SpaceVo {
    private Long no;
    private String businessTypeNo;
    private Long statusNo;
    private Long hostNo;
    private String name;
    private String phone;
    private String address;
    private String sns;
    private String nightPrice;
    private String daytimePrice;
    private String standardGuest;
    private String maxGuest;
    private String tagline;
    private String introduction;
    private String delYn;
    private String enrollDate;
    private String modifyDate;
    private String brn;
    private String filePath;
    private String[] attachmentFilePaths;
    private List<String> features;
    private String hostName;
    private String businessTypeName;
}
