package com.kh.springfinal.slog;

import org.apache.ibatis.annotations.*;

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
            ,TITLE_FILE_URL
            ,ORIGINAL_NAME
            )
            VALUES
            (
            SEQ_SLOG.NEXTVAL
            ,#{title}
            ,#{content}
            ,#{tagline}
            ,#{fileUrl}
            ,#{titleFileUrl}
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
            ,TITLE_FILE_URL
            ,ORIGINAL_NAME
            FROM SLOG
            WHERE NO = #{no}
            """)
    SlogVo findByNo(String no);

    @Select("""
            SELECT
            *
            FROM SLOG
            WHERE DEL_YN = 'N'
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

    @Update("""
            UPDATE SLOG
            SET
            DEL_YN = 'Y'
            WHERE NO = #{no}
            """)
    int delete(String no);


    @Update("""
            UPDATE SLOG
            SET
            TITLE = #{title}
            ,TAGLINE = #{tagline}
            ,CONTENT = #{content}
            WHERE NO = #{no}
            """)
    int edit(SlogVo slogVo);



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
    SlogVo shareKakao(String no);
}
