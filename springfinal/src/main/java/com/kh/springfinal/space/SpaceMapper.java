package com.kh.springfinal.space;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SpaceMapper {
    @Select("""
             SELECT S.NO,S.NAME,NIGHT_PRICE,DAYTIME_PRICE,MAX_GUEST,STANDARD_GUEST,ADDRESS,SA.FILE_PATH
             FROM SPACE S
             JOIN SPACE_ATTACHMENT SA ON (S.NO = SA.SPACE_NO)
             WHERE STATUS_NO = '2'
             AND SA.THUMBNAIL = 'Y'
            """)
    List<SpaceVo> spaceGetListAll();

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
            WHERE NO = #{no} AND THUMBNAIL='N'
            """)
    AttachmentVo spaceGetAttachmentByNo(Long no);
}
