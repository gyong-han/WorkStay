package com.kh.springfinal.room;

import com.kh.springfinal.guest.GuestVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface RoomMapper {
    @Select("""
            SELECT
                R.NO
                , R.STAY_NO
                , R.NAME
                , R.INTRODUCTION
                , R.PRICE
                , R.STANDARD_GUEST
                , R.MAX_GUEST
                , R.ENROLL_DATE
                , A.THUMBNAIL
                , A.FILE_PATH
                FROM ROOM R
                JOIN ROOM_ATTACHMENT A ON (R.NO = A.ROOM_NO)
                WHERE R.STAY_NO = #{no}
                AND A.THUMBNAIL = 'Y'
                AND R.DEL_YN = 'N'
            """)
    List<RoomVo> getRoomListByStayNo(Long no);

    @Select("""
            SELECT R.NO, R.STAY_NO, R.NAME, R.INTRODUCTION, R.PRICE, R.MAX_GUEST, R.STANDARD_GUEST,
            R.SINGLE_SIZE, R.DOUBLE_SIZE, R.QUEEN_SIZE, RA.FILE_PATH, RA.THUMBNAIL, S.NAME AS STAY_NAME
            FROM ROOM R
            JOIN ROOM_ATTACHMENT RA ON (R.NO = RA.ROOM_NO)
            JOIN STAY S ON (R.STAY_NO = S.NO)
            WHERE R.NO = #{no}
            AND RA.THUMBNAIL = 'Y'
            AND R.DEL_YN = 'N'
            """)
    RoomVo getRoomInfoByNo(Long no);

    @Select("""
            SELECT F.NAME FROM ROOM_FEATURES R
            JOIN FEATURES F ON(R.FEATURES_NO= F.NO)
            WHERE ROOM_NO = #{no}
            """)
    List<String> getFeatures(Long no);

    @Select("""
            SELECT NO, ROOM_NO, FILE_PATH, THUMBNAIL
            FROM ROOM_ATTACHMENT
            WHERE ROOM_NO = #{no}
            AND THUMBNAIL = 'N'
            AND DEL_YN = 'N'
            """)
    List<RoomAttachmentVo> getAttachmentByNo(Long no);

    @Select("""
            SELECT NO, ROOM_NO, FILE_PATH, THUMBNAIL
            FROM ROOM_ATTACHMENT
            WHERE THUMBNAIL = 'N'
            AND DEL_YN = 'N'
            """)
    List<RoomAttachmentVo> attachmentList();

    @Select("""
            SELECT DISTINCT CHECK_OUT
            FROM ROOM_RESERVATION
            WHERE ROOM_NO = #{no}
            """)
    String[] getIsAvailable(Long no);

    @Select("""
            SELECT NO, IMAGE, NAME, NICK, PWD, EMAIL, PHONE, BIRTH_DATE, ADDRESS, ENROLL_DATE, HOST_PERMISSION FROM MEMBER
            WHERE NO =#{no}
            """)
    GuestVo memberInfo(Long no);
}
