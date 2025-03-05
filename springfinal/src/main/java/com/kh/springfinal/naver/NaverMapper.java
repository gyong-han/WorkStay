package com.kh.springfinal.naver;

import com.kh.springfinal.guest.GuestVo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface NaverMapper {

    @Select("SELECT * FROM MEMBER WHERE email = #{email}")
    GuestVo findByEmail(String email);

    @Insert("INSERT INTO MEMBER (no, email, name, nick) VALUES (SEQ_MEMBER.NEXTVAL, #{email}, #{name}, #{nick})")
    void insertGuest(GuestVo guest);
}
