package com.kh.springfinal.room;

import lombok.Data;

@Data
public class RoomAttachmentVo {
private Long no;
private Long roomNo;
private String originName;
private String changeName;
private String filePath;
private String delYn;
private String thumbnail;

private Long sno;
}
