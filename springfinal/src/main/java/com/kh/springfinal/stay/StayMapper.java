package com.kh.springfinal.stay;

import com.kh.springfinal.roomReservation.RoomReservationVo;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface StayMapper {

    @Select("""
            SELECT 
            NO
            , STAY_NO
            , ORIGIN_NAME
            , CHANGE_NAME
            , FILE_PATH
            FROM STAY_ATTACHMENT
            WHERE THUMBNAIL = 'N'
            AND DEL_YN = 'N'
            """)
    List<StayAttachmentVo> stayGetAttachmentList();


    List<StayVo> findAllByOrderByPriceAsc(String people, String area, String date);

    List<StayVo> findAllByOrderByPriceDesc(String people, String area, String date);

    List<StayVo> findAllByOrderByBookmarksDesc(String people, String area, String date);

    List<StayVo> findAllByOrderByCreatedAtDesc(String people, String area, String date);

    @Select("""
            SELECT S.NO, S.HOST_NO, S.NAME, S.ADDRESS, S.PHONE, S.TAGLINE, S.INTRODUCTION, SA.FILE_PATH
            FROM STAY S
            JOIN STAY_ATTACHMENT SA ON (S.NO = SA.STAY_NO)
            WHERE S.NO = #{no}
            AND STATUS_NO = 2
            AND SA.THUMBNAIL = 'Y'
            AND S.DEL_YN = 'N'
            """)
    StayVo getFindStayByNo(Long no);

    @Select("""
            SELECT
            NO
            , STAY_NO
            , FILE_PATH
            , THUMBNAIL
            FROM STAY_ATTACHMENT
            WHERE STAY_NO = #{no}
            AND THUMBNAIL = 'N'
            AND DEL_YN = 'N'
            """)
    List<StayAttachmentVo> getAttachmentByNo(Long no);

    @Insert("""
            INSERT INTO STAY_BOOKMARK
            (MEMBER_NO, STAY_NO)
            VALUES
            (#{memberNo}, #{stayNo})
            """)
    int bookmark(RoomReservationVo vo);

    @Delete("""
            DELETE FROM STAY_BOOKMARK
            WHERE MEMBER_NO=#{memberNo} AND STAY_NO=#{stayNo}
            """)
    int bookmarkDel(RoomReservationVo vo);

    @Select("""
            SELECT CASE
                     WHEN EXISTS (
                        SELECT 1
                        FROM STAY_BOOKMARK
                        WHERE MEMBER_NO = #{memberNo} AND STAY_NO = #{stayNo}
                     ) THEN 1
                     ELSE 0
                   END AS is_exist
            FROM DUAL
            """)
    int bookmarkInfo(RoomReservationVo vo);
}
