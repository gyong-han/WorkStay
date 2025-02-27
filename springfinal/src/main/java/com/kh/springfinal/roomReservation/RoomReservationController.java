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

//    @PostMapping
//    public RoomReservationVo reservation(@RequestBody Long no){
//        try{
//            return reservationService.reservation(no);
//        }catch (Exception e){
//            log.warn(e.getMessage());
//            throw new IllegalStateException("ERROR-RESERVATION-01 RESERVATION ERROR");
//        }
//    }
}
