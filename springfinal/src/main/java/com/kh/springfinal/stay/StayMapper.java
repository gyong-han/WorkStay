package com.kh.springfinal.stay;

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
