package com.kh.springfinal.guest;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface GuestMapper {

    @Insert("""
            INSERT INTO MEMBER(NO, EMAIL, PWD, NAME , PHONE) VALUES(SEQ_MEMBER.NEXTVAL , #{email}, #{pwd} , #{name} ,#{phone})
            """)
    int join(GuestVo vo);

    @Select("SELECT COUNT(*) FROM MEMBER WHERE EMAIL = #{email}")
    int checkEmail(@Param("email") String email);

    @Select("SELECT COUNT(*) FROM MEMBER WHERE PHONE = #{phone}")
    int checkPhone(@Param("phone") String phone);


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

    @Select("SELECT * FROM MEMBER WHERE EMAIL = #{email}")
    GuestVo getMemberByEmail(@Param("email") String email);

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
            ORDER BY RE.CHECK_IN DESC
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
            ORDER BY RE.CHECK_IN DESC
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
                RE.NO AS reno,
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
            ORDER BY RE.USE_DAY DESC
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
            ORDER BY RE.USE_DAY DESC
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
                , RE.STATUS_NO AS progressState
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
                RE.STATUS_NO,
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

    @Select("""
            SELECT
                S.NAME,
                S.NO roomNo,
                S.ADDRESS,
                S.PHONE,
                RE.NO AS reno,
                P.NAME AS packageName,
                RE.ADULT,
                RE.CHILD,
                RE.BABY,
                RE.USE_DAY,
                RE.REQUEST,
                RE.AMOUNT,
                M.NO AS no,
                RE.ADULT + RE.CHILD + RE.BABY AS TOTAL_PERSON,
                TO_CHAR(RE.RESERVATION_DATE, 'YYYY-MM-DD HH24:MI') AS reservationDate,
                (SELECT FILE_PATH FROM SPACE_ATTACHMENT SA
                 WHERE SA.SPACE_NO = S.NO
                 AND SA.THUMBNAIL = 'Y'
                 AND ROWNUM = 1) AS FILE_PATH
            FROM SPACE_RESERVATION RE
            JOIN SPACE S ON (RE.SPACE_NO = S.NO)
            JOIN STATUS ST ON (RE.STATUS_NO = ST.NO)
            JOIN MEMBER M ON (RE.MEMBER_NO = M.NO)
            LEFT JOIN PACKAGE P ON (P.NO = RE.PACKAGE_NO)
            WHERE RE.NO = #{reno}
            """)
    MypageVo spaceDetailReserve(String reno);

    @Update("""
            UPDATE SPACE_RESERVATION
                SET STATUS_NO = 6
            WHERE MEMBER_NO = #{no}
            AND NO= #{reno}
            """)
    int spaceCancle(String no, String reno);


    @Update("""
            UPDATE MEMBER
                SET DEL_YN ='Y'
            WHERE EMAIL = #{email}
            AND DEL_YN = 'N'
            """)
    int memberQuit(GuestVo vo);

    // 숙소 북마크 목록 조회
    @Select("""
        SELECT 
                S.NO AS no,
                S.NAME AS name,
                S.ADDRESS AS address,
                S.TAGLINE AS tagline,
                (SELECT MIN(FILE_PATH) FROM ROOM_ATTACHMENT RA 
                 JOIN ROOM R ON RA.ROOM_NO = R.NO
                 WHERE R.STAY_NO = S.NO AND RA.DEL_YN = 'N' AND RA.THUMBNAIL ='Y') AS filePath
            FROM STAY_BOOKMARK SB
            JOIN STAY S ON SB.STAY_NO = S.NO
            WHERE SB.MEMBER_NO = #{no}
        """)
    List<StayBookmarkVo> getStayBookmarks(@Param("no") int no);



    // 공간 북마크 목록 조회
    @Select("""
        SELECT 
            SP.NO AS no,
            SP.NAME AS name,
            SP.ADDRESS AS address,
            SP.TAGLINE AS tagline,
            (SELECT MIN(FILE_PATH) FROM SPACE_ATTACHMENT SA 
             WHERE SA.SPACE_NO = SP.NO AND SA.DEL_YN = 'N') AS filePath
        FROM SPACE_BOOKMARK SB
        JOIN SPACE SP ON SB.SPACE_NO = SP.NO
        WHERE SB.MEMBER_NO = #{no}
    """)
    List<SpaceBookmarkVo> getSpaceBookmarks(@Param("no") int no);


    // 숙소 북마크 확인 (숙소 정보 + 대표 이미지)
    @Select("""
        SELECT 
                COUNT(*) AS bookmark_count,
                S.NO AS no,
                S.NAME AS name,
                S.ADDRESS AS address,
                S.TAGLINE AS tagline,
                (SELECT MIN(FILE_PATH) FROM ROOM_ATTACHMENT RA 
                 JOIN ROOM R ON RA.ROOM_NO = R.NO
                 WHERE R.STAY_NO = S.NO AND RA.DEL_YN = 'N' AND RA.THUMBNAIL ='Y') AS filePath
            FROM STAY_BOOKMARK SB
            JOIN STAY S ON SB.STAY_NO = S.NO
            WHERE SB.MEMBER_NO = #{no}
            GROUP BY S.NO, S.NAME, S.ADDRESS, S.TAGLINE
        """)
    List<StayBookmarkVo> checkStayBookmark(@Param("no") int no);


    // 공간 북마크 확인 (공간 정보 + 대표 이미지)
    @Select("""
    SELECT 
            COUNT(*) AS bookmarkCount,
            SP.NAME AS name,
            SP.NO AS no,
            SP.ADDRESS AS address,
            SP.TAGLINE AS tagline,
            (SELECT MIN(FILE_PATH) FROM SPACE_ATTACHMENT SA 
             WHERE SA.SPACE_NO = SP.NO AND SA.DEL_YN = 'N') AS filePath
        FROM SPACE_BOOKMARK SB
        JOIN SPACE SP ON SB.SPACE_NO = SP.NO
        WHERE SB.MEMBER_NO = #{no}
        GROUP BY SP.NO, SP.NAME, SP.ADDRESS, SP.TAGLINE
    """)
    List<SpaceBookmarkVo> checkSpaceBookmark(@Param("no") int no);


    @Insert("""
        INSERT INTO STAY_BOOKMARK (MEMBER_NO, STAY_NO) 
        VALUES (#{no}, #{targetNo})
    """)
    int addStayBookmark(@Param("no") int no, @Param("targetNo") int targetNo);

    @Delete("""
        DELETE FROM STAY_BOOKMARK 
        WHERE MEMBER_NO = #{no} 
        AND STAY_NO = #{targetNo}
    """)
    int removeStayBookmark(@Param("no") int no, @Param("targetNo") int targetNo);

    @Insert("""
        INSERT INTO SPACE_BOOKMARK (MEMBER_NO, SPACE_NO) 
        VALUES (#{no}, #{targetNo})
    """)
    int addSpaceBookmark(@Param("no") int no, @Param("targetNo") int targetNo);

    @Delete("""
        DELETE FROM SPACE_BOOKMARK 
        WHERE MEMBER_NO = #{no} 
        AND SPACE_NO = #{targetNo}
    """)
    int removeSpaceBookmark(@Param("no") int no, @Param("targetNo") int targetNo);


    @Select("""
            SELECT
                R.NAME
                , S.ADDRESS
                , L.NO
                , L.TITLE
                , L.TAGLINE
                , L.TITLE_FILE_URL
            FROM ROOM_RESERVATION RE
            LEFT OUTER JOIN SLOG L ON (RE.NO = L.RESERVATION_NO)
            LEFT OUTER JOIN ROOM R ON (R.NO = RE.ROOM_NO)
            LEFT OUTER JOIN STAY S ON (S.NO = R.STAY_NO)
            WHERE L.MEMBER_NO =#{memberNo}
            AND L.DEL_YN ='N'
            """)
    List<SlogListVo> slogList(String memberNo);

    @Update("""
            UPDATE SPACE SET
                STATUS_NO = '15'
                WHERE HOST_NO = #{no}
            """)
    int deleteSpace(GuestVo vo);

    @Update("""
            UPDATE STAY SET
            STATUS_NO = '15'
            WHERE HOST_NO = #{no}
            """)
    void deleteStay(GuestVo vo);

    @Update("""
            UPDATE ROOM_RESERVATION
                SET STATUS_NO ='4'
            WHERE NO = #{reno}
            AND MEMBER_NO = #{no}
            AND STATUS_NO ='5'
            """)
    int updateStay(String no, String reno);

}//class
