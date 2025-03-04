package com.kh.springfinal.roomReservation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("reservation")
public class RoomReservationController {
    private final RoomReservationService reservationService;

    @PostMapping
    public int reservation(@RequestBody RoomReservationVo vo){
        try{
            String date = vo.getUseDay();
            String formattedDate = date.replaceAll("-", "");
            String checkIn = vo.getCheckIn();
            String formattedCheckIn = checkIn.replaceAll("-", "");
            String checkOut = vo.getCheckOut();
            String formattedCheckOut = checkOut.replaceAll("-", "");
            vo.setUseDay(formattedDate);
            vo.setCheckIn(formattedCheckIn);
            vo.setCheckOut(formattedCheckOut);
            int result = reservationService.reservation(vo);
            return result;
        }catch (Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[ERROR-RESERVATION-01] RESERVATION ERROR");
        }
    }
    @PostMapping("getReservationInfo")
    public RoomReservationVo getReservationInfo(RoomReservationVo vo){
        try{
            String date = vo.getUseDay();
            String formattedDate = date.replaceAll("-", "");
            String checkIn = vo.getCheckIn();
            String formattedCheckIn = checkIn.replaceAll("-", "");
            String checkOut = vo.getCheckOut();
            String formattedCheckOut = checkOut.replaceAll("-", "");
            vo.setUseDay(formattedDate);
            vo.setCheckIn(formattedCheckIn);
            vo.setCheckOut(formattedCheckOut);
            RoomReservationVo reservationVo = reservationService.getReservationInfo(vo);
            return reservationVo;
        }catch(Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[ERROR-RESERVATION-02] RESERVATION INFO ERROR");
        }
    }

}
