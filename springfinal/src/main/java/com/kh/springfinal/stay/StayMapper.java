package com.kh.springfinal.stay;

import com.kh.springfinal.space.AttachmentVo;
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
                A.FILE_PATH
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
            WHERE M.HOST_PERMISSION = 'Y'
            AND S.STATUS_NO = '2'
            AND A.THUMBNAIL = 'Y'
            AND S.DEL_YN = 'N'
            ORDER BY R.PRICE ASC
            """)
    List<StayVo> findAllByOrderByPriceAsc();

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
                A.FILE_PATH
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
            WHERE M.HOST_PERMISSION = 'Y'
            AND S.STATUS_NO = '2'
            AND A.THUMBNAIL = 'Y'
            AND S.DEL_YN = 'N'
            ORDER BY R.PRICE DESC
            """)
    List<StayVo> findAllByOrderByPriceDesc();

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
            """)
    List<StayVo> findAllByOrderByBookmarksDesc();

    @Select("""
            SELECT
                S.NO,
                S.HOST_NO,
                S.STATUS_NO,
                S.BUSINESS_TYPE_NO,
                S.NAME,
                S.ADDRESS,
                R.PRICE,
                R.STANDARD_GUEST,
                R.MAX_GUEST,
                M.HOST_PERMISSION,
                A.THUMBNAIL,
                A.FILE_PATH
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
            WHERE M.HOST_PERMISSION = 'Y'
            AND S.STATUS_NO = '2'
            AND A.THUMBNAIL = 'Y'
            AND S.DEL_YN = 'N'
            ORDER BY S.NO DESC
            """)
    List<StayVo> findAllByOrderByCreatedAtDesc();

    @Select("""
            
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
}
