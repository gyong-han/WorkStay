package com.kh.springfinal.roomReservation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
