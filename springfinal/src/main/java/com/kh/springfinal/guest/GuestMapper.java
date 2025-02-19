package com.kh.springfinal.guest;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface GuestMapper {

    @Insert("""
            INSERT INTO MEMBER(NO, EMAIL, PWD, NAME , PHONE) VALUES(SEQ_MEMBER.NEXTVAL , #{email}, #{pwd} , #{name} ,#{phone})
            """)
    int join(GuestVo vo);

    @Select("""
            SELECT NO , EMAIL, PWD , PAGE_NICK
            FROM MEMBER
            WHERE EMAIL = #{email}
            """)
    GuestVo loginEmail(GuestVo vo);


    @Select("""
SELECT *
            FROM MEMBER
            WHERE NAME = '안예지'
            AND PHONE = '01012345678'
                """)
    GuestVo findId(GuestVo vo);


}
