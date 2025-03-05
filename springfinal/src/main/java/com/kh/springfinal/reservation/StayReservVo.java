package com.kh.springfinal.reservation;

import lombok.Data;

@Data
public class StayReservVo {

    private String no;
    private Long memberNo;
    private Long paymentNo;
    private Long roomNo;
    private Long totalPerson;
    private Long statusNo;
    private String checkIn;
    private String checkOut;
    private Long adult;
    private Long child;
    private Long baby;
    private String request;
    private Long amount;
    private String reservationDate;
    private String spaceName;
    private String roomName;
    private String paymentName;

}
