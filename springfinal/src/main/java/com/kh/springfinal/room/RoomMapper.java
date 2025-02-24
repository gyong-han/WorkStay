package com.kh.springfinal.room;

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
                FROM ROOM R
                JOIN ROOM_ATTACHMENT A ON (R.NO = A.ROOM_NO)
                WHERE R.NO = #{no}
                AND A.THUMBNAIL = 'N'
                AND R.DEL_YN = 'N'
            """)
    List<RoomVo> getRoomListByStayNo(Long no);

    @Select("""
            
            """)
    RoomVo getRoomInfoByNo(Long no);

    @Select("""
            SELECT F.NAME FROM ROOM_FEATURES R
            JOIN FEATURES F ON(R.FEATURES_NO= F.NO)
            WHERE ROOM_NO = #{no}
            """)
    List<String> getFeatures(Long no);

    @Select("""
            
            """)
    List<RoomAttachmentVo> getAttachmentByNo(Long no);
}
