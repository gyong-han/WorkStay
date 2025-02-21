package com.kh.springfinal.slog;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SlogMapper {


    @Insert("""
            INSERT INTO SLOG
            
            (
            NO
            ,TITLE
            ,CONTENT
            ,TAGLINE
            ,FILE_URL
            ,ORIGINAL_NAME
            )
            VALUES
            (
            SEQ_SLOG.NEXTVAL
            ,#{title}
            ,#{content}
            ,#{tagline}
            ,#{fileUrl}
            ,#{originalName}
            )
            """)
    void insert(SlogVo vo);


    @Select("""
            SELECT *
            FROM SLOG
            WHERE NO = #{no}
            """)
    SlogVo detail(String no);


    @Select("""
            SELECT
            TITLE
            ,CONTENT
            ,TAGLINE
            ,FILE_URL
            ,ORIGINAL_NAME
            FROM SLOG
            WHERE NO = #{no}
            """)
    SlogVo findByNo(String no);

    @Select("""
            SELECT
            *
            FROM SLOG
            ORDER BY NO DESC
            OFFSET #{offset} ROWS FETCH NEXT #{limit} ROWS ONLY
            """)
    List<SlogVo> findAll(int offset, int limit);

    @Select("""
            SELECT R.NAME, R.ADDRESS
            FROM REC_PLACE R
            JOIN SLOG S ON (R.SLOG_NO = S.NO)
            WHERE S.NO = #{no}
            """)
    List<RecPlaceVo> findRecPlace(Long no);

}
