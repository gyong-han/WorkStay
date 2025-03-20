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
            ,RESERVATION_NO
            ,STAY_NO
            ,MEMBER_NO
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
            ,#{reno}
            ,#{stayNo}
            ,#{memberNo}
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
                ,MEMBER_NO
                ,M.NICK
                ,S.ENROLL_DATE
                FROM SLOG S
                JOIN MEMBER M ON(S.MEMBER_NO = M.NO)
                WHERE S.NO = #{no}
            """)
    SlogVo findByNo(String no);

    @Select("""
            SELECT
                S.NO
                ,ST.NO AS STAY_NO
                ,S.TITLE
                ,S.CONTENT
                ,S.TAGLINE
                ,S.FILE_URL
                ,S.TITLE_FILE_URL
                ,S.ORIGINAL_NAME
                ,S.MEMBER_NO
                ,M.NICK
                ,R.NAME
                ,ST.NAME AS STAY_NAME
                ,ST.PHONE
                ,ST.ADDRESS
                FROM SLOG S
                JOIN MEMBER M ON(S.MEMBER_NO = M.NO)
                JOIN ROOM_RESERVATION RS ON(S.RESERVATION_NO = RS.NO)
                JOIN ROOM R ON (RS.ROOM_NO = R.NO)
                JOIN STAY ST ON (R.STAY_NO = ST.NO)
                WHERE S.DEL_YN = 'N'
                ORDER BY S.NO DESC
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
            ,FILE_URL = #{fileUrl}
            ,TITLE_FILE_URL = #{titleFileUrl}
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


    @Select("""
            SELECT
                NAME
                ,PHONE
                ,ADDRESS
                ,SNS
                FROM STAY WHERE NO = #{no}
            """)
    SlogVo getMapInfo(String no);
}
