package com.kh.springfinal.home;

import com.kh.springfinal.stay.StayVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface HomeMapper {
    @Select("""
            SELECT  S.HOST_NO,S.NO,S.NAME,S.ADDRESS,SA.FILE_PATH,R.PRICE,R.MAX_GUEST,R.STANDARD_GUEST
                    FROM STAY S
                    JOIN STAY_ATTACHMENT SA ON (S.NO = SA.STAY_NO)
                    JOIN (
                    SELECT STAY_NO, PRICE, STANDARD_GUEST, MAX_GUEST
                    FROM ROOM
                    WHERE NO = (
                    SELECT MIN(NO)
                    FROM ROOM R2
                    WHERE R2.STAY_NO = ROOM.STAY_NO
                    )
                    ) R ON S.NO = R.STAY_NO
                    WHERE STATUS_NO = '2'
                    AND SA.THUMBNAIL = 'Y'
                    AND S.SEASON = '봄'
            """)
    List<StayVo> getSpringSpring();

    @Select("""
            SELECT  S.HOST_NO,S.NO,S.NAME,S.ADDRESS,SA.FILE_PATH,R.PRICE,R.MAX_GUEST,R.STANDARD_GUEST
                    FROM STAY S
                    JOIN STAY_ATTACHMENT SA ON (S.NO = SA.STAY_NO)
                    JOIN (
                    SELECT STAY_NO, PRICE, STANDARD_GUEST, MAX_GUEST
                    FROM ROOM
                    WHERE NO = (
                    SELECT MIN(NO)
                    FROM ROOM R2
                    WHERE R2.STAY_NO = ROOM.STAY_NO
                    )
                    ) R ON S.NO = R.STAY_NO
                    WHERE STATUS_NO = '2'
                    AND SA.THUMBNAIL = 'Y'
                    AND S.SEASON = '여름'
            """)
    List<StayVo> getSummerStay();
    @Select("""
            SELECT  S.HOST_NO,S.NO,S.NAME,S.ADDRESS,SA.FILE_PATH,R.PRICE,R.MAX_GUEST,R.STANDARD_GUEST
                    FROM STAY S
                    JOIN STAY_ATTACHMENT SA ON (S.NO = SA.STAY_NO)
                    JOIN (
                    SELECT STAY_NO, PRICE, STANDARD_GUEST, MAX_GUEST
                    FROM ROOM
                    WHERE NO = (
                    SELECT MIN(NO)
                    FROM ROOM R2
                    WHERE R2.STAY_NO = ROOM.STAY_NO
                    )
                    ) R ON S.NO = R.STAY_NO
                    WHERE STATUS_NO = '2'
                    AND SA.THUMBNAIL = 'Y'
                    AND S.SEASON = '가을'
            """)
    List<StayVo> getAutumnStay();
    @Select("""
            SELECT  S.HOST_NO,S.NO,S.NAME,S.ADDRESS,SA.FILE_PATH,R.PRICE,R.MAX_GUEST,R.STANDARD_GUEST
                    FROM STAY S
                    JOIN STAY_ATTACHMENT SA ON (S.NO = SA.STAY_NO)
                    JOIN (
                    SELECT STAY_NO, PRICE, STANDARD_GUEST, MAX_GUEST
                    FROM ROOM
                    WHERE NO = (
                    SELECT MIN(NO)
                    FROM ROOM R2
                    WHERE R2.STAY_NO = ROOM.STAY_NO
                    )
                    ) R ON S.NO = R.STAY_NO
                    WHERE STATUS_NO = '2'
                    AND SA.THUMBNAIL = 'Y'
                    AND S.SEASON = '겨울'
            """)
    List<StayVo> getWinterStay();

    @Select("""
                 SELECT
                S.NO,
                S.HOST_NO,
                S.NAME,
                S.ADDRESS,
                R.PRICE,
                R.STANDARD_GUEST,
                R.MAX_GUEST,
                M.HOST_PERMISSION,
                A.THUMBNAIL,
                A.FILE_PATH,
                COUNT(B.STAY_NO) AS BOOKMARKS
            FROM STAY S
            JOIN (
                SELECT STAY_NO, PRICE, STANDARD_GUEST, MAX_GUEST
                FROM ROOM
                WHERE NO = (
                    SELECT MIN(NO)
                    FROM ROOM R2
                    WHERE R2.STAY_NO = ROOM.STAY_NO
                )
            ) R ON S.NO = R.STAY_NO
            JOIN MEMBER M ON S.HOST_NO = M.NO
            JOIN STAY_ATTACHMENT A ON S.NO = A.STAY_NO
            LEFT JOIN STAY_BOOKMARK B ON S.NO = B.STAY_NO
            WHERE M.HOST_PERMISSION = 'Y'
            AND S.STATUS_NO = '2'
            AND A.THUMBNAIL = 'Y'
            AND S.DEL_YN = 'N'
            GROUP BY
                S.NO, S.HOST_NO, S.NAME, S.ADDRESS, R.PRICE,
                R.STANDARD_GUEST, R.MAX_GUEST, M.HOST_PERMISSION, A.THUMBNAIL, A.FILE_PATH
            ORDER BY COUNT(B.STAY_NO) DESC, S.NO DESC
            FETCH FIRST 5 ROWS ONLY
            """)
    List<StayVo> getBestHitStayByFive();
}
