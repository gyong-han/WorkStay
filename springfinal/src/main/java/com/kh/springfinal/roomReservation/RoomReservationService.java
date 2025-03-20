package com.kh.springfinal.roomReservation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomReservationService {
    private final RoomReservationMapper reservationMapper;

    public int reservation(RoomReservationVo vo) {
        return reservationMapper.reservation(vo);
    }

    public RoomReservationVo getReservationInfo(RoomReservationVo vo) {
        return reservationMapper.getReservationInfo(vo);
    }

    public List<String> getBlockDates(Long no) {
        List<Map<String, String>> dataList = reservationMapper.getBlockDate(no);
        List<String> blockedDates = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (Map<String, String> data : dataList) {
            if(!dataList.isEmpty()){
            LocalDate checkIn = LocalDate.parse(data.get("CHECK_IN"), formatter);
            LocalDate checkOut = LocalDate.parse(data.get("CHECK_OUT"), formatter);

            // checkIn ~ (checkOut - 1)까지 날짜를 blockedDates에 추가
            while (!checkIn.isEqual(checkOut)) {
                blockedDates.add(checkIn.format(outputFormatter));
                checkIn = checkIn.plusDays(1);
            }
            }
        }

        return blockedDates;
    }
}
