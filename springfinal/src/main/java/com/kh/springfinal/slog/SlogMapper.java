package com.kh.springfinal.slog;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

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
}
