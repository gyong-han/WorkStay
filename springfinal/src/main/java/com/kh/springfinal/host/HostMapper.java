package com.kh.springfinal.host;

import com.kh.springfinal.guest.GuestVo;
import com.kh.springfinal.reservation.SpaceReservVo;
import com.kh.springfinal.reservation.StayReservVo;
import com.kh.springfinal.space.SpaceVo;
import com.kh.springfinal.room.RoomVo;
import com.kh.springfinal.stay.StayVo;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface HostMapper {

    @Insert("""
            INSERT INTO SPACE (
                NO
                ,BUSINESS_TYPE_NO
                ,HOST_NO
                ,NAME
                ,PHONE
                ,ADDRESS
                ,SNS
                ,NIGHT_PRICE
                ,DAYTIME_PRICE
                ,MAX_GUEST
                ,INTRODUCTION
                ,BRN
                ,STANDARD_GUEST
                ,TAGLINE
            )
            VALUES(
                SEQ_SPACE.NEXTVAL
                ,#{businessTypeNo}
                ,#{hostNo}
                ,#{name}
                ,#{phone}
                ,#{address}
                ,#{sns}
                ,#{nightPrice}
                ,#{daytimePrice}
                ,#{maxGuest}
                ,#{introduction}
                ,#{brn}
                ,#{standardGuest}
                ,#{tagline}
            )
            """)
    int enrollSpace(SpaceVo vo);

    @Insert("INSERT INTO SPACE_FEATURES (SPACE_NO,FEATURES_NO) VALUES (SEQ_SPACE.CURRVAL,#{feature})")
    int enrollSpaceFeatures(String feature);

    @Insert("""
            INSERT INTO SPACE_ATTACHMENT (NO,SPACE_NO,ORIGIN_NAME,FILE_PATH,THUMBNAIL) 
            VALUES (SEQ_SPACE_ATTACHMENT.NEXTVAL,SEQ_SPACE.CURRVAL,#{originName},#{filePath},'Y')
            """)
    int enrollSpaceThumbnail(AttachVo thumbnailVo);

    @Insert("""
            INSERT INTO SPACE_FLOOR_PLAN (NO,SPACE_NO,ORIGIN_NAME,FILE_PATH) 
            VALUES (SEQ_SPACE_FLOOR_PLAN.NEXTVAL,SEQ_SPACE.CURRVAL,#{originName},#{filePath})
            """)
    int enrollSpaceFloorPlan(AttachVo spaceFloorPlanVo);

    @Insert("""
            INSERT INTO SPACE_ATTACHMENT (NO,SPACE_NO,ORIGIN_NAME,FILE_PATH)
            VALUES (SEQ_SPACE_ATTACHMENT.NEXTVAL,SEQ_SPACE.CURRVAL,#{originName},#{filePath})
            """)
    int enrollSpaceAttach(AttachVo attachVo);

    @Insert("""
            INSERT INTO STAY(
                 NO,
                 HOST_NO,
                 BUSINESS_TYPE_NO,
                 NAME,
                 PHONE,
                 ADDRESS,
                 INTRODUCTION,
                 SNS,
                 BRN,
                 SEASON,
                 TAGLINE
            )
            VALUES
            (
                SEQ_STAY.NEXTVAL,
                #{hostNo},
                #{businessTypeNo},
                #{name},
                #{phone},
                #{address},
                #{introduction},
                #{sns},
                #{brn},
                #{season},
                #{tagline}
            )
            """)
    int enrollStay(StayVo vo);


    @Select("SELECT SEQ_STAY.CURRVAL FROM DUAL")
    int getStayNo();

    @Insert("""
            INSERT INTO ROOM
            (
                NO,
                STAY_NO,
                NAME,
                INTRODUCTION,
                PRICE,
                MAX_GUEST,
                STANDARD_GUEST,
                SINGLE_SIZE,
                DOUBLE_SIZE,
                QUEEN_SIZE
            )
            VALUES
            (
                SEQ_ROOM.NEXTVAL,
                #{stayNo},
                #{name},
                #{introduction},
                #{price},
                #{maxGuest},
                #{standardGuest},
                #{singleSize},
                #{doubleSize},
                #{queenSize}
            )
            """)
    int enrollRoom(RoomVo vo);

    @Insert("INSERT INTO ROOM_FEATURES (ROOM_NO,FEATURES_NO) VALUES (SEQ_ROOM.CURRVAL,#{feature})")
    int enrollRoomFeatures(String feature);

    @Insert("""
            INSERT INTO ROOM_ATTACHMENT (NO,ROOM_NO,ORIGIN_NAME,FILE_PATH,THUMBNAIL) 
            VALUES (SEQ_ROOM_ATTACHMENT.NEXTVAL,SEQ_ROOM.CURRVAL,#{originName},#{filePath},'Y')
            """)
    int enrollRoomThumbnail(AttachVo thumbnailVo);

    @Insert("""
            INSERT INTO ROOM_FLOOR_PLAN (NO,ROOM_NO,ORIGIN_NAME,FILE_PATH) 
            VALUES (SEQ_ROOM_FLOOR_PLAN.NEXTVAL,SEQ_ROOM.CURRVAL,#{originName},#{filePath})
            """)
    int enrollRoomFloorPlan(AttachVo roomFloorPlanVo);

    @Insert("""
            INSERT INTO ROOM_ATTACHMENT (NO,ROOM_NO,ORIGIN_NAME,FILE_PATH) 
            VALUES (SEQ_ROOM_ATTACHMENT.NEXTVAL,SEQ_ROOM.CURRVAL,#{originName},#{filePath})
            """)
    int enrollRoomAttach(AttachVo attachVo);

    @Select("""
            SELECT S.NO,NAME,ADDRESS,FILE_PATH,TO_CHAR(S.ENROLL_DATE, 'YYYY.MM.DD') AS ENROLL_DATE
            FROM SPACE S
            JOIN SPACE_ATTACHMENT SA ON (S.NO = SA.SPACE_NO)
            WHERE HOST_NO = #{hostNo}
            AND STATUS_NO = #{status}
            AND THUMBNAIL = 'Y'
            """)
    List<SpaceVo> getSpaceApprovalList(String status, String hostNo);


    @Select("""
            SELECT S.NO, S.NAME, ADDRESS,MIN(FILE_PATH) AS FILE_PATH,TO_CHAR(S.ENROLL_DATE, 'YYYY.MM.DD') AS ENROLL_DATE
            FROM STAY S
            JOIN ROOM R ON S.NO = R.STAY_NO
            JOIN ROOM_ATTACHMENT RA ON R.NO = RA.ROOM_NO
            WHERE HOST_NO = #{hostNo}
            AND STATUS_NO = #{status}
            AND THUMBNAIL = 'Y'
            GROUP BY S.NO, S.NAME, ADDRESS, S.ENROLL_DATE
            """)
    List<StayVo> getStayApprovalList(String status, String hostNo);

    @Select("""
            SELECT S.NO,NAME,ADDRESS,FILE_PATH,TO_CHAR(S.ENROLL_DATE, 'YYYY.MM.DD') AS ENROLL_DATE
            FROM SPACE S
            JOIN SPACE_ATTACHMENT SA ON (S.NO = SA.SPACE_NO)
            WHERE HOST_NO = #{hostNo}
            AND STATUS_NO = '2'
            AND THUMBNAIL = 'Y'
            """)
    List<SpaceVo> getMySpaceList(String hostNo);

    @Select("""
            SELECT S.NO, S.NAME, ADDRESS,MIN(FILE_PATH) AS FILE_PATH,TO_CHAR(S.ENROLL_DATE, 'YYYY.MM.DD') AS ENROLL_DATE
            FROM STAY S
            JOIN ROOM R ON S.NO = R.STAY_NO
            JOIN ROOM_ATTACHMENT RA ON R.NO = RA.ROOM_NO
            WHERE HOST_NO = #{hostNo}
            AND STATUS_NO = '2'
            AND THUMBNAIL = 'Y'
            GROUP BY S.NO, S.NAME, ADDRESS, S.ENROLL_DATE
            """)
    List<StayVo> getMyStayList(String hostNo);

    @Select("""
            SELECT SR.NO,S.NAME,M.NAME AS HOST_NAME,M.PHONE,P.NAME AS PACKAGE_NAME,TO_CHAR(TO_DATE(SR.USE_DAY, 'YYYYMMDD'), 'YYYY.MM.DD') AS USE_DAY
            FROM SPACE_RESERVATION SR
            JOIN SPACE S ON (SR.SPACE_NO = S.NO)
            JOIN MEMBER M ON (SR.MEMBER_NO = M.NO)
            JOIN PACKAGE P ON (SR.PACKAGE_NO = P.NO)
            WHERE S.HOST_NO = #{hostNo}
            AND SR.STATUS_NO = #{status}
            ORDER BY USE_DAY DESC
            OFFSET #{offset} ROWS FETCH NEXT #{limit} ROWS ONLY
            """)
//    @Select("""
//            SELECT *
//            FROM (
//                SELECT A.*, ROWNUM AS RN
//                FROM (
//                    SELECT SR.NO,
//                           S.NAME,
//                           M.NAME AS HOST_NAME,
//                           M.PHONE,
//                           P.NAME AS PACKAGE_NAME,
//                           TO_CHAR(TO_DATE(SR.USE_DAY, 'YYYYMMDD'), 'YYYY.MM.DD') AS USE_DAY
//                    FROM SPACE_RESERVATION SR
//                    JOIN SPACE S ON SR.SPACE_NO = S.NO
//                    JOIN MEMBER M ON SR.MEMBER_NO = M.NO
//                    JOIN PACKAGE P ON SR.PACKAGE_NO = P.NO
//                    WHERE S.HOST_NO = #{hostNo}
//                      AND SR.STATUS_NO = #{status}
//                    ORDER BY USE_DAY DESC
//                ) A
//                WHERE ROWNUM <= #{offset} + #{limit}
//            )
//            WHERE RN > #{offset}
//            """)
    List<TableVo> getSpaceReservList(String status, String hostNo, int limit, int offset);

    @Select("""
            SELECT RS.NO,M.NAME AS HOST_NAME,M.PHONE,R.NAME AS ROOM_NAME,S.NAME,
            TO_CHAR(TO_DATE(CHECK_IN, 'YYYYMMDD'), 'YYYY.MM.DD') || '~' ||  TO_CHAR(TO_DATE(CHECK_OUT, 'YYYYMMDD'), 'MM.DD') AS USE_DAY
            FROM ROOM_RESERVATION RS
            JOIN MEMBER M ON(RS.MEMBER_NO = M.NO)
            JOIN ROOM R ON(RS.ROOM_NO = R.NO)
            JOIN STAY S ON(R.STAY_NO = S.NO)
            WHERE S.HOST_NO = #{hostNo}
            AND RS.STATUS_NO = #{status}
            ORDER BY USE_DAY DESC
            OFFSET #{offset} ROWS FETCH NEXT #{limit} ROWS ONLY
            """)
//    @Select("""
//            SELECT *
//              FROM (
//                  SELECT A.*, ROWNUM AS RN
//                  FROM (
//                      SELECT RS.NO,
//                             M.NAME AS HOST_NAME,
//                             M.PHONE,
//                             R.NAME AS ROOM_NAME,
//                             S.NAME,
//                             TO_CHAR(TO_DATE(RS.CHECK_IN, 'YYYYMMDD'), 'YYYY.MM.DD') || '~' || TO_CHAR(TO_DATE(RS.CHECK_OUT, 'YYYYMMDD'), 'MM.DD') AS USE_DAY
//                      FROM ROOM_RESERVATION RS
//                      JOIN MEMBER M ON RS.MEMBER_NO = M.NO
//                      JOIN ROOM R ON RS.ROOM_NO = R.NO
//                      JOIN STAY S ON R.STAY_NO = S.NO
//                      WHERE S.HOST_NO = #{hostNo}
//                        AND RS.STATUS_NO = #{status}
//                      ORDER BY USE_DAY DESC
//                  ) A
//                   WHERE ROWNUM <= #{offset} + #{limit}
//              )
//              WHERE RN > #{offset}
//            """)
    List<TableVo> getRoomReservList(String status, String hostNo, int limit, int offset);


    @Select("""
            SELECT M.NAME,M.EMAIL,M.PHONE
            FROM MEMBER M
            JOIN SPACE_RESERVATION SR ON (M.NO = SR.MEMBER_NO)
            WHERE SR.NO = #{spaceReservNum}
            """)
    GuestVo getSpaceReservGuest(String spaceReservNo);

    @Select("""
            SELECT ADULT,CHILD,BABY,ADULT+CHILD+BABY AS TOTAL_PERSON,S.NAME AS SPACE_NAME,P.NAME AS PACKAGE_NAME,SR.REQUEST AS REQUEST,
            SR.AMOUNT AS AMOUNT,PM.NAME AS PAYMENT_NAME,
            TO_CHAR(TO_DATE(SR.USE_DAY, 'YYYYMMDD'), 'YYYY-MM-DD') AS USE_DAY,
            TO_CHAR(SR.RESERVATION_DATE, 'YYYY-MM-DD HH24:MI') AS RESERVATION_DATE
            FROM SPACE_RESERVATION SR
            JOIN SPACE S ON (SR.SPACE_NO = S.NO)
            JOIN PACKAGE P ON (SR.PACKAGE_NO = P.NO)
            JOIN PAYMENT PM ON (SR.PAYMENT_NO = PM.NO)
            WHERE SR.NO = #{spaceReservNo}
            """)
    SpaceReservVo getSpaceReserv(String spaceReservNo);

    @Select("""
            SELECT M.NAME,M.EMAIL,M.PHONE
            FROM MEMBER M
            JOIN ROOM_RESERVATION RR ON (M.NO = RR.MEMBER_NO)
            WHERE RR.NO = #{stayReservNo}
            """)
    GuestVo getStayReservGuest(String stayReservNo);

    @Select("""
            SELECT R.NAME AS ROOM_NAME,S.NAME AS SPACE_NAME,ADULT,CHILD,BABY,ADULT+CHILD+BABY AS TOTAL_PERSON,REQUEST,AMOUNT,
            M.NAME AS PAYMENT_NAME,
            TO_CHAR(TO_DATE(CHECK_IN, 'YYYYMMDD'), 'YYYY-MM-DD') AS CHECK_IN,
            TO_CHAR(TO_DATE(CHECK_OUT, 'YYYYMMDD'), 'YYYY-MM-DD') AS CHECK_OUT,
            TO_CHAR(RESERVATION_DATE, 'YYYY-MM-DD HH24:MI') AS RESERVATION_DATE
            FROM ROOM_RESERVATION RR
            JOIN ROOM R ON (RR.ROOM_NO = R.NO)
            JOIN STAY S ON(R.STAY_NO = S.NO)
            JOIN PAYMENT M ON(RR.PAYMENT_NO = M.NO)
            WHERE RR.NO = #{stayReservNo}
            """)
    StayReservVo getStayReserv(String stayReservNo);

    @Select("""
            SELECT NO,NAME,ADDRESS,PHONE,SNS,BUSINESS_TYPE_NO,BRN,TAGLINE,INTRODUCTION,STANDARD_GUEST,MAX_GUEST,
            DAYTIME_PRICE,NIGHT_PRICE
            FROM SPACE
            WHERE NO = #{spaceNum}
            """)
    SpaceVo getMySpaceVo(String spaceNo);

    @Select("""
            SELECT FEATURES_NO
            FROM SPACE_FEATURES
            WHERE SPACE_NO = #{spaceNo}
            """)
    List<String> getMySpaceFeaturesList(String spaceNo);

    @Select("""
            SELECT ORIGIN_NAME AS NAME,FILE_PATH,NO
            FROM SPACE_FLOOR_PLAN
            WHERE SPACE_NO = #{spaceNo}
            """)
    AttachVo getMySpaceRoomFloorPlan(String spaceNo);

    @Select("""
            SELECT ORIGIN_NAME AS NAME,FILE_PATH,NO
            FROM SPACE_ATTACHMENT
            WHERE SPACE_NO = #{spaceNo}
            AND THUMBNAIL = 'Y'
            """)
    AttachVo getMySpaceThumbNail(String spaceNo);

    @Select("""
            SELECT ORIGIN_NAME AS NAME,FILE_PATH,NO
            FROM SPACE_ATTACHMENT
            WHERE SPACE_NO = #{spaceNo}
            AND THUMBNAIL = 'N'
            """)
    List<AttachVo> getMySpaceAttach(String spaceNo);

    @Update("""
            UPDATE SPACE SET
            PHONE = #{phone},
            STANDARD_GUEST = #{standardGuest},
            MAX_GUEST = #{maxGuest},
            DAYTIME_PRICE = #{daytimePrice},
            NIGHT_PRICE = #{nightPrice}
            WHERE NO = #{no}
            """)
    int updateMySpace(SpaceVo spaceVo);

    @Delete("""
            DELETE 
            FROM SPACE_FEATURES
            WHERE SPACE_NO = #{no} 
            """)
    int deleteMySpaceFeatures(SpaceVo spaceVo);

    @Insert("""
            INSERT INTO SPACE_FEATURES (SPACE_NO,FEATURES_NO) VALUES (#{spaceVo.no},#{feature})
            """)
    int insertMySpaceFeatures(SpaceVo spaceVo, String feature);

    @Insert("""
            INSERT INTO EDIT_SPACE (NO,SPACE_NO,HOST_NO,SNS,INTRODUCTION,MODIFY_DATE,TAGLINE)
            VALUES (SEQ_EDIT_SPACE.NEXTVAL,#{no},#{hostNo},#{sns},#{introduction},SYSDATE,#{tagline})
            """)
    int insertMySpaceEdit(SpaceVo spaceVo);

    @Update("""
            UPDATE SPACE SET
            STATUS_NO = '7',
            MODIFY_DATE = SYSDATE
            WHERE NO = #{spaceNo}
            """)
    int deleteMySpace(String spaceNo);

    @Select("""
            SELECT NO,NAME,ADDRESS,PHONE,SNS,BRN,TAGLINE,INTRODUCTION,SEASON,BUSINESS_TYPE_NO,HOST_NO
            FROM STAY
            WHERE NO = #{stayNo}
            """)
    StayVo getMyStay(String stayNo);

    @Update("""
            UPDATE STAY SET
            PHONE = #{phone},
            SEASON = #{season}
            WHERE NO = #{no}
            """)
    int updateMyStay(StayVo stayVo);

    @Insert("""
            INSERT INTO EDIT_STAY (NO,STAY_NO,HOST_NO,INTRODUCTION,SNS,MODIFY_DATE,TAGLINE)
            VALUES (SEQ_EDIT_STAY.NEXTVAL,#{no},#{hostNo},#{introduction},#{sns},SYSDATE,#{tagline})
            """)
    int insertMyStayedit(StayVo stayVo);

    @Select("""
            SELECT R.NO
            FROM ROOM R
            JOIN STAY S ON(R.STAY_NO = S.NO)
            WHERE R.STAY_NO = #{stayNum}   
            ORDER BY R.NO
            """)
    List<String> getMyRoomNo(String stayNum);

    @Select("""
            SELECT R.NO,R.NAME,R.STANDARD_GUEST,R.MAX_GUEST,R.PRICE,R.SINGLE_SIZE,R.DOUBLE_SIZE,R.QUEEN_SIZE,R.INTRODUCTION,S.HOST_NO
            FROM ROOM R
            JOIN STAY S ON (R.STAY_NO = S.NO)
            WHERE R.NO = #{roomNo}
            """)
    RoomVo getMyRoomVo(String roomNo);

    @Select("""
            SELECT RF.FEATURES_NO
            FROM ROOM R
            JOIN ROOM_FEATURES RF ON(R.NO = RF.ROOM_NO)
            WHERE R.NO = #{roomNo}
            """)
    List<String> getMyRoomFeaturesList(String roomNo);

    @Select("""
            SELECT ORIGIN_NAME AS NAME,FILE_PATH,NO
            FROM ROOM_FLOOR_PLAN
            WHERE ROOM_NO = #{roomNo}
            """)
    AttachVo getRoomFloorPlan(String roomNo);

    @Select("""
            SELECT ORIGIN_NAME AS NAME,FILE_PATH,NO
            FROM ROOM_ATTACHMENT
            WHERE ROOM_NO = #{roomNo}
            AND THUMBNAIL = 'Y'
            """)
    AttachVo getRoomThumbNail(String roomNo);

    @Select("""
            SELECT NO,ORIGIN_NAME AS NAME,FILE_PATH,NO
            FROM ROOM_ATTACHMENT
            WHERE ROOM_NO = #{roomNo}
            AND THUMBNAIL = 'N'
            """)
    List<AttachVo> getRoomAttach(String roomNo);

    @Update("""
            UPDATE ROOM SET
            STANDARD_GUEST = #{standardGuest},
            MAX_GUEST = #{maxGuest},
            PRICE = #{price},
            SINGLE_SIZE = #{singleSize},
            DOUBLE_SIZE = #{doubleSize},
            QUEEN_SIZE = #{queenSize}
            WHERE NO = #{no}
            """)
    int updateMyRoom(RoomVo roomVo);

    @Delete("""
            DELETE 
            FROM ROOM_FEATURES
            WHERE ROOM_NO = #{no}
            """)
    int deleteMyRoomFeatures(RoomVo roomVo);

    @Insert("""
            INSERT INTO ROOM_FEATURES
            (ROOM_NO,FEATURES_NO) VALUES
            (#{roomVo.no},#{feature})
            """)
    int insertMyRoomFeatures(RoomVo roomVo, String feature);

    @Insert("""
            INSERT INTO EDIT_ROOM 
            (NO,ROOM_NO,NAME,INTRODUCTION) VALUES
            (SEQ_EDIT_ROOM.NEXTVAL,#{no},#{name},#{introduction})
            """)
    int insertMyRoomEdit(RoomVo roomVo);

    @Update("""
            UPDATE SPACE SET
            STATUS_NO = '8'
            WHERE NO = #{spaceNo}
            """)
    int cancelEnrollSpace(String spaceNo);

    @Update("""
            UPDATE STAY SET
            STATUS_NO = '8'
            WHERE NO = #{stayNo}            
            """)
    int cancelEnrollStay(String stayNo);

    @Update("""
            UPDATE STAY SET
            STATUS_NO = '7',
            MODIFY_DATE = SYSDATE
            WHERE NO = #{stayNo}
            """)
    int deleteMyStay(String stayNo);

    @Select("""
            SELECT COUNT(RR.NO)
            FROM ROOM_RESERVATION RR
            JOIN MEMBER M ON(RR.MEMBER_NO = M.NO)
            JOIN ROOM R ON(RR.ROOM_NO = R.NO)
            JOIN STAY S ON(R.STAY_NO = S.NO)
            WHERE RR.STATUS_NO = #{status}
            AND S.HOST_NO = #{hostNo}
            """)
    int getRoomReservCount(String hostNo, String status);

    @Select("""
            SELECT COUNT(SR.NO)
            FROM SPACE_RESERVATION SR
            JOIN SPACE S ON(SR.SPACE_NO = S.NO)
            JOIN MEMBER M ON (M.NO = S.HOST_NO)
            WHERE SR.STATUS_NO = #{status}
            AND S.HOST_NO = #{hostNo}
            """)
    int getSpaceReservCount(String hostNo, String status);

    @Select("""
            SELECT COUNT(SR.NO)
            FROM SPACE_RESERVATION SR
            JOIN SPACE S ON(SR.SPACE_NO = S.NO)
            WHERE SR.SPACE_NO = #{spaceNo}
            AND SR.STATUS_NO = '5'
            """)
    int countSpaceReservation(String stayNo);

    @Select("""
            SELECT COUNT(RR.NO)
            FROM ROOM_RESERVATION RR
            JOIN ROOM R ON (RR.ROOM_NO = R.NO)
            JOIN STAY S ON (R.STAY_NO = S.NO)
            WHERE S.NO = #{stayNo}
            AND RR.STATUS_NO = '5'
            """)
    int countStayReservation(String stayNo);

    @Insert("""
            INSERT INTO EDIT_SPACE_ATTACHMENT (NO,SPACE_NO,ORIGIN_NAME,FILE_PATH,THUMBNAIL) 
            VALUES (SEQ_EDIT_SPACE_ATTACHMENT.NEXTVAL,#{spaceVo.no},#{thumbnailVo.originName},#{thumbnailVo.filePath},'Y')
            """)
    int insertMySpaceThumbnailEdit(AttachVo thumbnailVo, SpaceVo spaceVo);

    @Insert("""
            INSERT INTO EDIT_SPACE_ATTACHMENT (NO,SPACE_NO,ORIGIN_NAME,FILE_PATH,THUMBNAIL) 
            VALUES (SEQ_EDIT_SPACE_ATTACHMENT.NEXTVAL,#{spaceVo.no},#{attachVo.originName},#{attachVo.filePath},'N')            
            """)
    int insertMySpaceAttachEdit(SpaceVo spaceVo, AttachVo attachVo);

    @Insert("""
            INSERT INTO EDIT_ROOM_ATTACHMENT (NO,ROOM_NO,ORIGIN_NAME,FILE_PATH,THUMBNAIL) 
            VALUES (SEQ_EDIT_ROOM_ATTACHMENT.NEXTVAL,#{roomVo.no},#{thumbnailVo.originName},#{thumbnailVo.filePath},'Y')
            """)
    int insertMyRoomThumbnailEdit(AttachVo thumbnailVo, RoomVo roomVo);

    @Insert("""
            INSERT INTO EDIT_ROOM_ATTACHMENT (NO,ROOM_NO,ORIGIN_NAME,FILE_PATH,THUMBNAIL) 
            VALUES (SEQ_EDIT_ROOM_ATTACHMENT.NEXTVAL,#{roomVo.no},#{attachVo.originName},#{attachVo.filePath},'N')                        
            """)
    int insertMyRoomAttachEdit(RoomVo roomVo, AttachVo attachVo);

    @Select("""
            SELECT NAME,EMAIL,PHONE
            FROM MEMBER
            WHERE NO = #{hostNo}
            """)
    GuestVo getHostVo(String hostNo);
}