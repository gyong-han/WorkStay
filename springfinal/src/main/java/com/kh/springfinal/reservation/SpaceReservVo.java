package com.kh.springfinal.reservation;

import lombok.Data;

@Data
public class SpaceReservVo {
    private String no;
    private Long spaceNo;
    private Long memberNo;
    private Long paymentNo;
    private Long packageNo;
    private Long statusNo;
    private Long totalPerson;
    private String reservationDate;
    private String adult;
    private String child;
    private String baby;
    private String request;
    private String amount;
    private String useDay;
    private String spaceName;
    private String paymentName;
    private String packageName;
}
