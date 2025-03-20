package com.kh.springfinal.roomReservation;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface RoomReservationMapper {

    @Insert("""
            INSERT INTO ROOM_RESERVATION
            (NO, MEMBER_NO, PAYMENT_NO, ROOM_NO, ADULT, CHILD, BABY, REQUEST, AMOUNT, CHECK_IN, CHECK_OUT )
            VALUES
            ((SELECT GET_ROOM_RESERVATION_CODE FROM DUAL),
            #{memberNo}, #{paymentNo}, #{roomNo}, #{adult}, #{child}, #{baby}, #{request}, #{amount}, #{checkIn}, #{checkOut})
            """)
    int reservation(RoomReservationVo vo);

    @Select("""
            SELECT NO, MEMBER_NO, PAYMENT_NO, ROOM_NO, CHECK_IN, CHECK_OUT, ADULT, CHILD, BABY, REQUEST, AMOUNT, RESERVATION_DATE
            FROM ROOM_RESERVATION
            WHERE ROOM_NO = #{roomNo} AND CHECK_IN = #{checkIn} AND CHECK_OUT = #{checkOut}
            """)
    RoomReservationVo getReservationInfo(RoomReservationVo vo);

    @Select("""
            SELECT RR.ROOM_NO, RR.CHECK_IN, RR.CHECK_OUT
            FROM ROOM_RESERVATION RR
            JOIN ROOM R ON (RR.ROOM_NO = R.NO)
            JOIN STAY S ON (R.STAY_NO = S.NO)
            WHERE R.NO = #{no}
              AND RR.STATUS_NO = 5
            """)
    List<Map<String, String>> getBlockDate(Long no);
}
