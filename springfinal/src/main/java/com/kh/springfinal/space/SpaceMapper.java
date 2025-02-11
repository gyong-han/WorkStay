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
}
