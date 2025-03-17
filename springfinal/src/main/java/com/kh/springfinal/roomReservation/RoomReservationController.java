package com.kh.springfinal.roomReservation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("reservation")
public class RoomReservationController {
    private final RoomReservationService reservationService;

    @PostMapping
    public int reservation(@RequestBody RoomReservationVo vo){
        try{
            String checkIn = vo.getCheckIn();
            String formattedCheckIn = checkIn.replaceAll("-", "");
            String checkOut = vo.getCheckOut();
            String formattedCheckOut = checkOut.replaceAll("-", "");
            vo.setCheckIn(formattedCheckIn);
            vo.setCheckOut(formattedCheckOut);
            String amount = vo.getAmount();
            String formattedAmount = amount.replaceAll(",","");
            vo.setAmount(formattedAmount);
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
            String checkIn = vo.getCheckIn();
            String formattedCheckIn = checkIn.replaceAll("-", "");
            String checkOut = vo.getCheckOut();
            String formattedCheckOut = checkOut.replaceAll("-", "");
            vo.setCheckIn(formattedCheckIn);
            vo.setCheckOut(formattedCheckOut);
            RoomReservationVo reservationVo = reservationService.getReservationInfo(vo);
//            System.out.println("RESERVATION vo = " + reservationVo);
            return reservationVo;
        }catch(Exception e){
            log.warn(e.getMessage());
//            System.out.println("error msg :: "+e.getMessage());
            throw new IllegalStateException("[ERROR-RESERVATION-02] RESERVATION INFO ERROR");
        }
    }
    @PostMapping("isblockdate")
    public List<String> getBlockDates(@RequestBody Long no) {
        try {
            return reservationService.getBlockDates(no);
        } catch (Exception e) {
            log.warn(e.getMessage());
            throw new IllegalStateException("[ERROR-RESERVATION-03] RESERVATION BLOCK DATE ERROR");
        }
    }
}
