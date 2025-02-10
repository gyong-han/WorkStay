package com.kh.springfinal.bus;

import lombok.Data;

@Data
public class BusVo {


    private String arrPlaceNm;
    private String arrPlandTime;
    private Integer charge;
    private String depPlaceNm;
    private String depPlandTime;
    private String gradeNm;
    private String routeId;
}
