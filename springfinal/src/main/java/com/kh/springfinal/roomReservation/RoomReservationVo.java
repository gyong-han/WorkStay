package com.kh.springfinal.roomReservation;

import lombok.Data;

@Data
public class RoomReservationVo {
private String no;
private Long memberNo;
private Long paymentNo;
private Long roomNo;
private Long statusNo;
private String checkIn;
private String checkOut;
private String adult;
private String child;
private String baby;
private String request;
private String amount;
private String reservationDate;

private String useday;
private String stayNo;
}
