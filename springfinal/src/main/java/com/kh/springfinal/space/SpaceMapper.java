package com.kh.springfinal.space;

import com.kh.springfinal.guest.GuestVo;
import com.kh.springfinal.reservation.SpaceReservVo;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SpaceMapper {

    List<SpaceVo> spaceGetListAll(String area,String people,String date,String title ,String sort);

    @Select("""
            SELECT NO,SPACE_NO,FILE_PATH FROM SPACE_ATTACHMENT
            WHERE THUMBNAIL='N'
            """)
    List<AttachmentVo> spaceGetAttachment();

    @Select("""
            SELECT 
            S.NO,
            S.BUSINESS_TYPE_NO,
            S.STATUS_NO,
            S.HOST_NO,
            S.NAME,
            S.PHONE,
            S.ADDRESS,
            S.SNS,
            S.NIGHT_PRICE,
            S.DAYTIME_PRICE,
            S.STANDARD_GUEST,
            S.MAX_GUEST,
            S.TAGLINE,
            S.INTRODUCTION,
            S.DEL_YN,
            S.ENROLL_DATE,
            S.MODIFY_DATE,
            S.BRN,
            SA.FILE_PATH
            FROM SPACE S
            JOIN SPACE_ATTACHMENT SA ON (S.NO = SA.SPACE_NO)
            WHERE S.NO = #{no}
            AND STATUS_NO = '2'
            AND SA.THUMBNAIL = 'Y'
            """)
    SpaceVo spaceGetDetailVo(Long no);

    @Select("""
            SELECT NO,SPACE_NO,FILE_PATH FROM SPACE_ATTACHMENT
            WHERE SPACE_NO=#{no} AND THUMBNAIL='N'
            """)
    List<AttachmentVo> spaceGetAttachmentByNo(Long no);

    @Select("""
            SELECT F.NAME FROM SPACE_FEATURES S
            JOIN FEATURES F ON(S.FEATURES_NO= F.NO)
            WHERE SPACE_NO =#{no}
            """)
    List<String> getFeatures(Long no);

    @Insert("""
            INSERT INTO SPACE_RESERVATION(
            NO, SPACE_NO, MEMBER_NO, PAYMENT_NO, PACKAGE_NO, ADULT, CHILD, BABY, REQUEST, AMOUNT, USE_DAY
            )VALUES(
           (SELECT GET_SPACE_RESERVATION_CODE FROM DUAL),
             #{spaceNo}, #{memberNo}, #{paymentNo}, #{packageNo}, #{adult}, #{child}, #{baby}, #{request}, #{amount}, #{useDay}
            )
            """)
    int reservation(SpaceReservVo vo);

    @Select("""
            SELECT DISTINCT USE_DAY
            FROM SPACE_RESERVATION
            WHERE SPACE_NO = #{no}
            AND USE_DAY IN (
                SELECT USE_DAY
                FROM SPACE_RESERVATION
                WHERE SPACE_NO = #{no}
                AND STATUS_NO=5
                AND PACKAGE_NO IN (1, 2)
                GROUP BY USE_DAY
                HAVING COUNT(DISTINCT PACKAGE_NO) = 2
            )
            """)
    String[] getIsAvailable(String no);

    @Select("""
            SELECT NO, SPACE_NO, PACKAGE_NO, USE_DAY, STATUS_NO
            FROM SPACE_RESERVATION
            WHERE SPACE_NO = #{no}
              AND USE_DAY = #{date}
              AND STATUS_NO = 5
              AND SPACE_NO NOT IN (
                  SELECT SPACE_NO
                  FROM SPACE_RESERVATION
                  WHERE USE_DAY = #{date}
                    AND STATUS_NO = 5
                  GROUP BY SPACE_NO
                  HAVING COUNT(*) = 2
              )
            
            """)
    SpaceReservVo packageDone(String no,String date);

    @Select("""
             SELECT NO,RESERVATION_DATE FROM SPACE_RESERVATION
              WHERE SPACE_NO =#{spaceNo} AND PACKAGE_NO =#{packageNo} AND USE_DAY =#{useDay} AND STATUS_NO = 5
            """)
    SpaceReservVo getNowTime(SpaceReservVo vo);

    @Insert("""
            INSERT INTO SPACE_BOOKMARK(MEMBER_NO,SPACE_NO)VALUES(#{memberNo},#{spaceNo})
            """)
    int bookmark(SpaceReservVo vo);

    @Delete("""
            DELETE FROM SPACE_BOOKMARK WHERE
            MEMBER_NO=#{memberNo} AND SPACE_NO=#{spaceNo}
            """)
    int bookmarkdel(SpaceReservVo vo);

    @Select("""
            SELECT CASE
                     WHEN EXISTS (
                        SELECT 1
                        FROM SPACE_BOOKMARK
                        WHERE MEMBER_NO = #{memberNo} AND SPACE_NO = #{spaceNo}
                     ) THEN 1
                     ELSE 0
                   END AS is_exist
            FROM DUAL
            """)
    int getbookmark(SpaceReservVo vo);

    List<SpaceVo> spaceGetListPopular(String area, String people, String date, String title, String sort);

    @Select("""
            SELECT NO, IMAGE, NAME, NICK, PWD, EMAIL, PHONE, BIRTH_DATE, ADDRESS, ENROLL_DATE, HOST_PERMISSION FROM MEMBER
            WHERE NO =#{no}
            """)
    GuestVo getMemberInfo(String no);
}
