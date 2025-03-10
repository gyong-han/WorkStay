package com.kh.springfinal.home;

import com.kh.springfinal.reservation.StayReservVo;
import com.kh.springfinal.stay.StayVo;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface HomeMapper {
    @Select("""
            SELECT  S.HOST_NO,S.NO,S.NAME,RA.FILE_PATH,S.ADDRESS,R.PRICE,R.MAX_GUEST,R.STANDARD_GUEST
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
                                AND S.SEASON = '봄'
            """)
    List<StayVo> getSpringSpring();

    @Select("""
            SELECT  S.HOST_NO,S.NO,S.NAME,RA.FILE_PATH,S.ADDRESS,R.PRICE,R.MAX_GUEST,R.STANDARD_GUEST
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
                                AND S.SEASON = '여름'
            """)
    List<StayVo> getSummerStay();
    @Select("""
            SELECT  S.HOST_NO,S.NO,S.NAME,RA.FILE_PATH,S.ADDRESS,R.PRICE,R.MAX_GUEST,R.STANDARD_GUEST
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
                                AND S.SEASON = '가을'
            """)
    List<StayVo> getAutumnStay();
    @Select("""
            SELECT  S.HOST_NO,S.NO,S.NAME,RA.FILE_PATH,S.ADDRESS,R.PRICE,R.MAX_GUEST,R.STANDARD_GUEST
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
                                AND S.SEASON = '겨울'
            """)
    List<StayVo> getWinterStay();

    @Select("""
             SELECT  S.HOST_NO,S.NO,S.NAME,RA.FILE_PATH,S.ADDRESS,R.PRICE,R.MAX_GUEST,R.STANDARD_GUEST,COUNT(B.STAY_NO) AS BOOKMARKS
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
                       LEFT JOIN STAY_BOOKMARK B ON S.NO = B.STAY_NO
                       JOIN ROOM_ATTACHMENT RA ON (R.NO = RA.ROOM_NO)
                       WHERE STATUS_NO = '2'
                       AND RA.THUMBNAIL = 'Y'
                       GROUP BY
                   S.NO, S.HOST_NO, S.NAME, S.ADDRESS, R.PRICE,
                   R.STANDARD_GUEST, R.MAX_GUEST,RA.FILE_PATH
                    ORDER BY COUNT(B.STAY_NO) DESC, S.NO DESC
                      FETCH FIRST 5 ROWS ONLY
            """)
    List<StayVo> getBestHitStayByFive();

    @Delete("""
            DELETE FROM STAY_BOOKMARK
            WHERE MEMBER_NO = #{memberNo} AND STAY_NO=#{no}
            """)
    int bookmarkdel(StayReservVo vo);

    @Insert("""
            INSERT INTO STAY_BOOKMARK(MEMBER_NO, STAY_NO)VALUES(#{memberNo},#{no})
            """)
    int bookmark(StayReservVo vo);


    @Select("""
                 SELECT CASE
                                 WHEN EXISTS (  
                                    SELECT 1
                                    FROM STAY_BOOKMARK
                                    WHERE MEMBER_NO = #{memberNo} AND STAY_NO = #{no}
                                 ) THEN 1
                                 ELSE 0
                               END AS is_exist
                        FROM DUAL
            """)
    int getbookmark(StayReservVo vo);
}
