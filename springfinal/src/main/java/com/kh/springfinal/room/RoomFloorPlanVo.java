package com.kh.springfinal.room;

import lombok.Data;

@Data
public class RoomFloorPlanVo {
    private Long no;
    private Long roomNo;
    private String originName;
    private String changeName;
    private String filePath;
    private String delYn;
}
