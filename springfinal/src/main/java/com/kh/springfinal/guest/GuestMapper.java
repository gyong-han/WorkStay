package com.kh.springfinal.guest;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

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
            WHERE NAME = #{name}
            AND PHONE = #{phone}
            """)
    GuestVo findId(GuestVo vo);


    @Select("""
            SELECT *
            FROM MEMBER
            WHERE EMAIL = #{email}
            AND PHONE = #{phone}
            """)
    GuestVo findPwd(GuestVo vo);


    @Update("""
            UPDATE MEMBER
            SET PWD = #{pwd}
            WHERE EMAIL = #{email}
            """)
    int newPwd(GuestVo vo);


    @Select("""
            SELECT *
            FROM MEMBER
            WHERE EMAIL = #{email}
            """)
    GuestVo mypage(String email);

    int editMember(GuestVo vo);

    @Select("""
            SELECT
                ST.PROGRESS_STATE AS progressState
                , R.NAME AS roomName
                , RE.CHECK_IN AS checkIn
                , RE.CHECK_OUT AS checkOut
                , S.NAME AS name
                , RE.ADULT AS adult
                , R.PRICE AS price
                , MIN(FILE_PATH)    AS FILE_PATH
            FROM MEMBER M
            JOIN STAY S ON (M.NO = S.HOST_NO)
            JOIN ROOM R ON (S.NO = R.STAY_NO)
            JOIN ROOM_RESERVATION RE ON (M.NO = RE.MEMBER_NO)
            JOIN STATUS ST ON (RE.STATUS_NO = ST.NO)
            JOIN ROOM_ATTACHMENT AT ON (R.NO = AT.ROOM_NO)
            WHERE M.EMAIL = #{email}
            AND ST.NO !=6
            GROUP BY
                ST.PROGRESS_STATE,
                R.NAME,
                RE.CHECK_IN,
                RE.CHECK_OUT,
                S.NAME,
                RE.ADULT,
                R.PRICE
            """)
    List<MypageVo> stayReserv(MypageVo vo);

    @Select("""
            SELECT
                ST.PROGRESS_STATE AS progressState
                , R.NAME AS roomName
                , RE.CHECK_IN AS checkIn
                , RE.CHECK_OUT AS checkOut
                , S.NAME AS name
                , RE.ADULT AS adult
                , R.PRICE AS price
                , MIN(FILE_PATH) AS FILE_PATH
            FROM MEMBER M
            LEFT OUTER JOIN STAY S ON (M.NO = S.HOST_NO)
            LEFT OUTER JOIN ROOM R ON (S.NO = R.STAY_NO)
            LEFT OUTER JOIN ROOM_RESERVATION RE ON (M.NO = RE.MEMBER_NO)
            LEFT OUTER JOIN STATUS ST ON (RE.STATUS_NO = ST.NO)
            LEFT OUTER JOIN ROOM_ATTACHMENT AT ON (R.NO = AT.ROOM_NO)
            WHERE M.EMAIL = #{email}
            AND ST.NO =6
            GROUP BY
                ST.PROGRESS_STATE,
                R.NAME,
                RE.CHECK_IN,
                RE.CHECK_OUT,
                S.NAME,
                RE.ADULT,
                R.PRICE
            """)
    List<MypageVo> stayCancleReserv(MypageVo vo);


    @Select("""
            SELECT
                ST.PROGRESS_STATE AS progressState
                ,S.NAME
                ,RE.USE_DAY
                ,P.NAME AS packageName
                ,RE.ADULT
                ,S.DAYTIME_PRICE
                ,S.NIGHT_PRICE
                , MIN(FILE_PATH) AS FILE_PATH
            FROM MEMBER M
            LEFT OUTER JOIN SPACE S ON (M.NO = S.HOST_NO)
            LEFT OUTER JOIN SPACE_RESERVATION RE ON (S.NO = RE.SPACE_NO)
            LEFT OUTER JOIN STATUS ST ON (ST.NO = RE.STATUS_NO)
            LEFT OUTER JOIN PACKAGE P ON (P.NO = RE.PACKAGE_NO)
            LEFT OUTER JOIN SPACE_ATTACHMENT ST ON (S.NO = ST.SPACE_NO)
            WHERE M.EMAIL = #{email}
            AND ST.NO !=6
            GROUP BY ST.PROGRESS_STATE, S.NAME, RE.USE_DAY, P.NAME, RE.ADULT, S.DAYTIME_PRICE, S.NIGHT_PRICE
            """)
    List<MypageVo> spaceReserv(MypageVo vo);

    @Select("""
            SELECT
                ST.PROGRESS_STATE AS progressState
                ,S.NAME
                ,RE.USE_DAY
                ,P.NAME AS packageName
                ,RE.ADULT
                ,S.DAYTIME_PRICE
                ,S.NIGHT_PRICE
                , MIN(FILE_PATH) AS FILE_PATH
            FROM MEMBER M
            LEFT OUTER JOIN SPACE S ON (M.NO = S.HOST_NO)
            LEFT OUTER JOIN SPACE_RESERVATION RE ON (S.NO = RE.SPACE_NO)
            LEFT OUTER JOIN STATUS ST ON (ST.NO = RE.STATUS_NO)
            LEFT OUTER JOIN PACKAGE P ON (P.NO = RE.PACKAGE_NO)
            LEFT OUTER JOIN SPACE_ATTACHMENT ST ON (S.NO = ST.SPACE_NO)
            WHERE M.EMAIL = #{email}
            AND ST.NO =6
            GROUP BY ST.PROGRESS_STATE, S.NAME, RE.USE_DAY, P.NAME, RE.ADULT, S.DAYTIME_PRICE, S.NIGHT_PRICE
            """)
    List<MypageVo> spaceCancleReserv(MypageVo vo);



}
