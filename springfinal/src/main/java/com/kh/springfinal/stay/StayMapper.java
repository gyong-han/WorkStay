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
                S.NO,
                S.HOST_NO,
                S.STATUS_NO,
                S.BUSINESS_TYPE_CODE,
                S.NAME,
                S.ADDRESS,
                R.PRICE,
                R.STANDARD_GUEST,
                R.MAX_GUEST,
                M.HOST_PERMISSION,
                A.THUMBNAIL
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
            """)
    List<StayVo> getFindStayAll();

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
    List<AttachmentVo> stayGetAttachmentList();
}
