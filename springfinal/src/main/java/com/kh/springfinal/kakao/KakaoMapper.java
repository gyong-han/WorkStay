package com.kh.springfinal.kakao;

import com.kh.springfinal.guest.GuestVo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface KakaoMapper {

    @Select("SELECT * FROM MEMBER WHERE email = #{email}")
    GuestVo findByEmail(String email);

    @Insert("INSERT INTO MEMBER (no , email, name) VALUES (SEQ_MEMBER.NEXTVAL , #{email}, #{name})")
    void insertGuest(GuestVo guest);

}
