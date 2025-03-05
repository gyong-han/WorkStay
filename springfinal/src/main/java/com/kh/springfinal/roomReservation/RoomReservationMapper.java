package com.kh.springfinal.roomReservation;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

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
}
