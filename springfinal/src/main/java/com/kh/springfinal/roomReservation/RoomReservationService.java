package com.kh.springfinal.roomReservation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomReservationService {
    private final RoomReservationMapper reservationMapper;

//    public RoomReservationVo reservation(Long no) {
//        return reservationMapper.reservation(no);
//    }
}
