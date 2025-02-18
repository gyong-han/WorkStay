package com.kh.springfinal.guest;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GuestMapper {

    @Insert("""
            INSERT INTO MEMBER(NO, EMAIL, PWD, NAME) VALUES(SEQ_MEMBER.NEXTVAL , #{email}, #{pwd} , #{name})
            """)
    void join(GuestVo vo);

}
