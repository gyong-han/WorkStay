package com.kh.springfinal.stay;

import com.kh.springfinal.room.RoomAttachmentVo;
import com.kh.springfinal.roomReservation.RoomReservationVo;
import com.kh.springfinal.slog.SlogVo;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface StayMapper {

    @Select("""
            SELECT RA.NO, RA.ROOM_NO, RA.FILE_PATH, RA.THUMBNAIL, S.NO AS SNO
            FROM ROOM_ATTACHMENT RA
            JOIN ROOM R ON (RA.ROOM_NO = R.NO)
            JOIN STAY S ON (R.STAY_NO = S.NO)
            WHERE RA.THUMBNAIL = 'N' AND RA.DEL_YN = 'N'
            """)
    List<RoomAttachmentVo> stayGetAttachmentList();

    List<StayVo> findAllByOrderByPriceAsc(String people, String area, String checkIn, String checkOut, String title);

    List<StayVo> findAllByOrderByPriceDesc(String people, String area, String checkIn, String checkOut, String title);

    List<StayVo> findAllByOrderByBookmarksDesc(String people, String area, String checkIn, String checkOut, String title);

    List<StayVo> findAllByOrderByCreatedAtDesc(String people, String area, String checkIn, String checkOut, String title);

    @Select("""
             SELECT  S.HOST_NO,S.NO,S.NAME,RA.FILE_PATH,S.ADDRESS,S.PHONE,S.TAGLINE, S.INTRODUCTION, R.PRICE,R.MAX_GUEST,R.STANDARD_GUEST
                                            FROM STAY S
                                            JOIN (
                                            SELECT STAY_NO,NO, PRICE, STANDARD_GUEST, MAX_GUEST
                                            FROM ROOM
                                            WHERE NO = (
                                            SELECT MIN(NO)
                                            FROM ROOM R2
                                            WHERE R2.STAY_NO = ROOM.STAY_NO
                                            )
                                            ) R ON S.NO = R.STAY_NO
                                            JOIN ROOM_ATTACHMENT RA ON (R.NO = RA.ROOM_NO)
                                            WHERE STATUS_NO = '2'
                                            AND RA.THUMBNAIL = 'Y'
                                            AND S.NO = #{no}
                                            AND S.DEL_YN = 'N'
            """)
    StayVo getFindStayByNo(Long no);

    @Select("""
            SELECT RA.NO, RA.ROOM_NO, RA.FILE_PATH, RA.THUMBNAIL
            FROM ROOM_ATTACHMENT RA
            JOIN ROOM R ON (RA.ROOM_NO = R.NO)
            JOIN STAY S ON (R.STAY_NO = S.NO)
            WHERE S.NO = #{no} AND RA.THUMBNAIL = 'N' AND RA.DEL_YN = 'N'
            """)
    List<RoomAttachmentVo> getAttachmentByNo(Long no);

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

    @Select("""
            SELECT
                S.NO
                ,ST.NO AS STAY_NO
                ,S.TITLE
                ,S.CONTENT
                ,S.TAGLINE
                ,S.FILE_URL
                ,S.TITLE_FILE_URL
                ,S.ORIGINAL_NAME
                ,S.MEMBER_NO
                ,M.NICK
                ,R.NAME
                ,ST.NAME AS STAY_NAME
                ,ST.PHONE
                ,ST.ADDRESS
                FROM SLOG S
                JOIN MEMBER M ON(S.MEMBER_NO = M.NO)
                JOIN ROOM_RESERVATION RS ON(S.RESERVATION_NO = RS.NO)
                JOIN ROOM R ON (RS.ROOM_NO = R.NO)
                JOIN STAY ST ON (R.STAY_NO = ST.NO)
                WHERE ST.NO = #{no}
                AND S.DEL_YN = 'N'
            """)
    List<SlogVo> getSlogReview(Long no);
}
