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
                ST.PROGRESS_STATE,
                R.NAME AS roomName,
                RE.CHECK_IN,
                RE.CHECK_OUT,
                S.NAME,
                RE.ADULT,
                RE.AMOUNT,
                RE.NO AS reno,
                R.NO AS roomNo,
                M.NO AS no,
                (SELECT MIN(FILE_PATH) FROM ROOM_ATTACHMENT AT WHERE AT.ROOM_NO = R.NO) AS FILE_PATH
            FROM MEMBER M
            JOIN ROOM_RESERVATION RE ON (M.NO = RE.MEMBER_NO)
            JOIN ROOM R ON (RE.ROOM_NO = R.NO)
            JOIN STAY S ON (R.STAY_NO = S.NO)
            JOIN STATUS ST ON (RE.STATUS_NO = ST.NO)
            WHERE M.EMAIL = #{email}
            AND ST.NO != 6
            GROUP BY
                ST.PROGRESS_STATE,
                R.NAME,
                RE.CHECK_IN,
                RE.CHECK_OUT,
                S.NAME,
                RE.ADULT,
                RE.AMOUNT,
                RE.NO,
                R.NO,
                M.NO
            """)
    List<MypageVo> stayReserv(MypageVo vo);

    @Select("""
            SELECT
                ST.PROGRESS_STATE,
                R.NAME AS roomName,
                RE.CHECK_IN,
                RE.CHECK_OUT,
                S.NAME,
                RE.ADULT,
                RE.AMOUNT,
                RE.NO AS reno,
                R.NO AS roomNo,
                M.NO AS no,
                (SELECT MIN(FILE_PATH) FROM ROOM_ATTACHMENT AT WHERE AT.ROOM_NO = R.NO) AS FILE_PATH
            FROM MEMBER M
            JOIN ROOM_RESERVATION RE ON (M.NO = RE.MEMBER_NO)
            JOIN ROOM R ON (RE.ROOM_NO = R.NO)
            JOIN STAY S ON (R.STAY_NO = S.NO)
            JOIN STATUS ST ON (RE.STATUS_NO = ST.NO)
            WHERE M.EMAIL = #{email}
            AND ST.NO = 6
            GROUP BY
                ST.PROGRESS_STATE,
                R.NAME,
                RE.CHECK_IN,
                RE.CHECK_OUT,
                S.NAME,
                RE.ADULT,
                RE.AMOUNT,
                RE.NO,
                R.NO,
                M.NO
            """)
    List<MypageVo> stayCancleReserv(MypageVo vo);


    @Select("""
            SELECT
                ST.PROGRESS_STATE,
                S.NAME ,
                RE.USE_DAY,
                P.NAME AS packageName,
                RE.ADULT,
                RE.AMOUNT,
                (SELECT FILE_PATH
                FROM SPACE_ATTACHMENT SA
                WHERE SA.SPACE_NO = S.NO
                AND SA.THUMBNAIL = 'Y'
                AND ROWNUM = 1) AS FILE_PATH
            FROM MEMBER M
            JOIN SPACE_RESERVATION RE ON (M.NO = RE.MEMBER_NO)
            JOIN SPACE S ON (RE.SPACE_NO = S.NO)
            JOIN STATUS ST ON (RE.STATUS_NO = ST.NO)
            LEFT JOIN PACKAGE P ON (P.NO = RE.PACKAGE_NO)
            WHERE M.EMAIL = #{email}
            AND ST.NO != 6
            """)
    List<MypageVo> spaceReserv(MypageVo vo);

    @Select("""
            SELECT
                ST.PROGRESS_STATE,
                S.NAME ,
                RE.USE_DAY,
                P.NAME AS packageName,
                RE.ADULT,
                RE.AMOUNT,
                (SELECT FILE_PATH
                FROM SPACE_ATTACHMENT SA
                WHERE SA.SPACE_NO = S.NO
                AND SA.THUMBNAIL = 'Y'
                AND ROWNUM = 1) AS FILE_PATH
            FROM MEMBER M
            JOIN SPACE_RESERVATION RE ON (M.NO = RE.MEMBER_NO)
            JOIN SPACE S ON (RE.SPACE_NO = S.NO)
            JOIN STATUS ST ON (RE.STATUS_NO = ST.NO)
            LEFT JOIN PACKAGE P ON (P.NO = RE.PACKAGE_NO)
            WHERE M.EMAIL = #{email}
            AND ST.NO = 6
            """)
    List<MypageVo> spaceCancleReserv(MypageVo vo);


    @Select("""
            SELECT
                 R.NAME AS roomName
                , TO_CHAR(TO_DATE(RE.CHECK_IN, 'YYYYMMDD'), 'YYYY-MM-DD')   AS CHECK_IN
                , TO_CHAR(TO_DATE(RE.CHECK_OUT, 'YYYYMMDD'), 'YYYY-MM-DD')  AS CHECK_OUT
                , RE.AMOUNT
                , S.NAME    AS name
                , S.ADDRESS
                , S.PHONE
                , RE.ADULT
                , RE.CHILD
                , RE.BABY
                , RE.NO AS reno
                , RE.REQUEST
                , R.NO AS roomNo
                , M.NO AS no
                , TO_CHAR(RESERVATION_DATE, 'YYYY-MM-DD HH24:MI') AS RESERVATION_DATE
                , RE.ADULT + RE.CHILD + RE.BABY AS TOTAL_PERSON
                , (SELECT MIN(FILE_PATH) FROM ROOM_ATTACHMENT AT WHERE AT.ROOM_NO = R.NO) AS FILE_PATH
            FROM MEMBER M
            JOIN STAY S ON (M.NO = S.HOST_NO)
            JOIN ROOM R ON (S.NO = R.STAY_NO)
            JOIN ROOM_RESERVATION RE ON (RE.ROOM_NO = R.NO)
            WHERE RE.NO = #{reno}
            GROUP BY
                R.NAME,
                TO_CHAR(TO_DATE(RE.CHECK_IN, 'YYYYMMDD'), 'YYYY-MM-DD'),
                TO_CHAR(TO_DATE(RE.CHECK_OUT, 'YYYYMMDD'), 'YYYY-MM-DD'),
                RE.AMOUNT,
                S.NAME,
                S.ADDRESS,
                S.PHONE,
                RE.ADULT,
                RE.CHILD,
                RE.BABY,
                RE.NO,
                RE.REQUEST,
                R.NO,
                M.NO,
                TO_CHAR(RESERVATION_DATE, 'YYYY-MM-DD HH24:MI')
            """)
    MypageVo stayDetailReserv(String reno);


    @Update("""
            UPDATE ROOM_RESERVATION
                SET STATUS_NO = 6
            WHERE MEMBER_NO = #{no}
            AND NO = #{reno}
            """)
    int stayCancle(String no,String reno);

}
