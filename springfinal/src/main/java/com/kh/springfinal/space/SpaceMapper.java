package com.kh.springfinal.space;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SpaceMapper {

    List<SpaceVo> spaceGetListAll(String area,String people,String date);

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
            S.MODIFIY_DATE,
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
             #{vo.no}, #{memberNo}, #{vo.paymentNo}, #{vo.packageNo}, #{vo.adult}, #{vo.child}, #{vo.baby}, #{vo.request}, #{vo.amount}, #{vo.useDay}
            )
            """)
    int reservation(SpaceVo vo, String memberNo);

    @Select("""
            SELECT DISTINCT USE_DAY
            FROM SPACE_RESERVATION
            WHERE SPACE_NO = #{no}
            AND USE_DAY IN (
                SELECT USE_DAY
                FROM SPACE_RESERVATION
                WHERE SPACE_NO = #{no}
                AND PACKAGE_NO IN (1, 2)
                GROUP BY USE_DAY
                HAVING COUNT(DISTINCT PACKAGE_NO) = 2
            )
            """)
    String[] getIsAvailable(String no);
}
