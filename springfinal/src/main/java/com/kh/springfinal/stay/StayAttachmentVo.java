package com.kh.springfinal.stay;

import lombok.Data;

@Data
public class StayAttachmentVo {
private Long no;
private Long stayNo;
private String originName;
private String changeName;
private String filePath;
private String delYn;
private String thumbnail;

private String sno;
}
