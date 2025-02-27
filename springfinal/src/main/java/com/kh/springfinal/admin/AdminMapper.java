package com.kh.springfinal.admin;

import com.kh.springfinal.guest.GuestVo;
import com.kh.springfinal.host.AttachVo;
import com.kh.springfinal.host.TableVo;
import com.kh.springfinal.room.RoomVo;
import com.kh.springfinal.space.SpaceVo;
import com.kh.springfinal.stay.StayVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface AdminMapper {

    @Select("""
            SELECT S.NO AS NO,M.NAME AS HOST_NAME,M.EMAIL,S.NAME AS NAME,M.PHONE 
            FROM STAY S 
            JOIN MEMBER M ON(S.HOST_NO = M.NO)
            WHERE S.STATUS_NO= '1'
            ORDER BY S.ENROLL_DATE DESC
            """)
    List<TableVo> getStayEnrollReqList();

    @Select("""
            SELECT S.NO AS NO,M.NAME AS HOST_NAME,M.EMAIL,S.NAME AS NAME,M.PHONE 
            FROM SPACE S 
            JOIN MEMBER M ON(S.HOST_NO = M.NO)
            WHERE S.STATUS_NO= '1'
            ORDER BY S.ENROLL_DATE DESC
            """)
    List<TableVo> getSpaceEnrollReqList();

    @Select("""
            SELECT M.NO, M.NAME AS HOSTNAME, M.EMAIL, M.PHONE,
            (SELECT COUNT(*) FROM STAY S WHERE S.HOST_NO = M.NO AND S.STATUS_NO = 2) AS STAY_CNT,
            (SELECT COUNT(*) FROM SPACE SP WHERE SP.HOST_NO = M.NO AND SP.STATUS_NO = 2) AS SPACE_CNT
            FROM MEMBER M
            WHERE M.HOST_PERMISSION = 'Y'
            ORDER BY M.NO
            """)
    List<TableVo> getHostList();

    @Select("""
            SELECT NO,NAME AS HOSTNAME,EMAIL,PHONE
            FROM MEMBER
            WHERE NO=#{hostNo}
            """)
    TableVo getHostDetail(String hostNo);

    @Select("""
            SELECT S.NO,S.NAME,S.ADDRESS,S.PHONE,S.SNS,MIN(FILE_PATH) AS FILE_PATH
            FROM STAY S
            JOIN ROOM R ON(S.NO = R.STAY_NO)
            JOIN ROOM_ATTACHMENT RA ON (R.NO = RA.ROOM_NO)
            WHERE HOST_NO = #{hostNo}
            AND STATUS_NO = '2'
            AND THUMBNAIL = 'Y'
            GROUP BY S.NAME,S.ADDRESS,S.PHONE,S.SNS,S.NO
            """)
    List<TableVo> getStayList(String hostNo);

    @Select("""
            SELECT S.NO,S.NAME,S.ADDRESS,S.PHONE,S.SNS,MIN(FILE_PATH) AS FILE_PATH
            FROM SPACE S
            JOIN SPACE_ATTACHMENT SA ON (S.NO = SA.SPACE_NO)
            WHERE HOST_NO = #{hostNo}
            AND STATUS_NO = '2'
            AND THUMBNAIL = 'Y'           
            GROUP BY S.NO,S.NAME,S.ADDRESS,S.PHONE,S.SNS  
            """)
    List<TableVo> getSpaceList(String hostNo);

    @Select("""
            SELECT M.NAME,M.EMAIL,M.PHONE,M.NO
            FROM MEMBER M
            JOIN SPACE S ON (M.NO = S.HOST_NO)
            WHERE S.NO = #{enrollReqNo}
            """)
    GuestVo getSpaceHostVoEnrollReq(Long enrollReqNo);

    @Select("""
            SELECT S.NAME,ADDRESS,PHONE,SNS,BT.NAME AS BUSINESS_TYPE_NAME,BRN,TAGLINE,
            INTRODUCTION,STANDARD_GUEST,MAX_GUEST,DAYTIME_PRICE,NIGHT_PRICE
            FROM SPACE S
            JOIN BUSINESS_TYPE BT ON (S.BUSINESS_TYPE_NO = BT.NO)
            WHERE S.NO = #{enrollReqNo}
            """)
    SpaceVo getSpaceVoEnrollReq(Long enrollReqNo);

    @Select("""
            SELECT FEATURES_NO
            FROM SPACE_FEATURES
            WHERE SPACE_NO = #{enrollReqNo}
            """)
    List<String> getSpaceFeaturesListEnrollReq(Long enrollReqNo);

    @Select("""
            SELECT ORIGIN_NAME,FILE_PATH
            FROM SPACE_FLOOR_PLAN
            WHERE SPACE_NO = #{enrollReqNo}
            """)
    AttachVo getSpaceFloorPlanEnrollReq(Long enrollReqNo);

    @Select("""
            SELECT ORIGIN_NAME,FILE_PATH
            FROM SPACE_ATTACHMENT
            WHERE SPACE_NO = #{enrollReqNo}
            AND THUMBNAIL = 'Y'
            """)
    AttachVo getSpaceThumbNailEnrollReq(Long enrollReqNo);

    @Select("""
            SELECT ORIGIN_NAME,FILE_PATH
            FROM SPACE_ATTACHMENT
            WHERE SPACE_NO = #{enrollReqNo}
            AND THUMBNAIL = 'N'
            """)
    List<AttachVo> getSpaceAttachEnrollReq(Long enrollReqNo);

    @Update("""
            UPDATE SPACE 
            SET
            STATUS_NO = '2'
            WHERE NO = #{spaceNo}
            """)
    int approveSpace(Long spaceNo);

    @Update("""
            UPDATE MEMBER
            SET
            HOST_PERMISSION = 'Y'
            WHERE NO = #{hostNo}
            """)
    int changeHost(Long hostNo);

    @Update("""
            UPDATE SPACE 
            SET
            STATUS_NO = '3'
            WHERE NO = #{spaceNo}
            """)
    int companionSpace(Long spaceNo);

    @Select("""
            SELECT M.NAME,M.EMAIL,M.PHONE,M.NO
            FROM MEMBER M
            JOIN STAY S ON (M.NO = S.HOST_NO)
            WHERE S.NO = #{enrollReqNo}
            """)
    GuestVo getStayHostVoEnrollReq(Long enrollReqNo);

    @Select("""
            SELECT S.NO,S.NAME,ADDRESS,PHONE,SNS,BT.NAME AS BUSINESS_TYPE_NAME,BRN,TAGLINE,INTRODUCTION,SEASON
            FROM STAY S
            JOIN BUSINESS_TYPE BT ON (S.BUSINESS_TYPE_NO = BT.NO)
            WHERE S.NO = #{enrollReqNo}
            """)
    StayVo getStayVoEnrollReq(Long enrollReqNo);

    @Select("""
            SELECT R.NO
            FROM ROOM R
            JOIN STAY S ON(R.STAY_NO = S.NO)
            WHERE R.STAY_NO = #{stayNo}   
            """)
    List<String> getRoomNoEnrollReq(Long stayNo);

    @Select("""
            SELECT R.NAME,R.STANDARD_GUEST,R.MAX_GUEST,R.PRICE,R.SINGLE_SIZE,R.DOUBLE_SIZE,R.QUEEN_SIZE,R.INTRODUCTION,S.HOST_NO
            FROM ROOM R
            JOIN STAY S ON (R.STAY_NO = S.NO)
            WHERE R.NO = #{roomNo}
            """)
    RoomVo getRoomVo(String roomNo);

    @Select("""
            SELECT RF.FEATURES_NO
            FROM ROOM R
            JOIN ROOM_FEATURES RF ON(R.NO = RF.ROOM_NO)
            WHERE R.NO = #{roomNo}
            """)
    List<String> getRoomFeaturesListEnrollReq(String roomNo);

    @Select("""
            SELECT ORIGIN_NAME,FILE_PATH
            FROM ROOM_FLOOR_PLAN
            WHERE ROOM_NO = #{roomNo}
            """)
    AttachVo getStayFloorPlanEnrollReq(String roomNo);

    @Select("""
            SELECT ORIGIN_NAME,FILE_PATH
            FROM ROOM_ATTACHMENT
            WHERE ROOM_NO = #{roomNo}
            AND THUMBNAIL = 'Y'
            """)
    AttachVo getStayThumbNailEnrollReq(String roomNo);

    @Select("""
            SELECT ORIGIN_NAME,FILE_PATH
            FROM ROOM_ATTACHMENT
            WHERE ROOM_NO = #{roomNo}
            AND THUMBNAIL = 'N'
            """)
    List<AttachVo> getRoomAttachEnrollReq(String roomNo);

    @Update("""
            UPDATE STAY
            SET
            STATUS_NO = '2'
            WHERE NO = #{stayNo}
            """)
    int approveStay(Long stayNo);

    @Update("""
            UPDATE STAY 
            SET
            STATUS_NO = '3'
            WHERE NO = #{stayNo}
            """)
    int companionStay(Long stayNo);

    @Select("""
            SELECT S.NO,M.NAME AS HOST_NAME,S.NAME,M.PHONE,TO_CHAR(ES.MODIFY_DATE, 'YYYY.MM.DD') AS MODIFY_DATE
            FROM EDIT_SPACE ES
            JOIN SPACE S ON (ES.SPACE_NO = S.NO)
            JOIN MEMBER M ON (S.HOST_NO = M.NO)
            WHERE ES.STATUS_NO = '1' 
            ORDER BY MODIFY_DATE
            """)
    List<SpaceVo> getSpaceEditList();

    @Select("""
            SELECT S.NO,M.NAME AS HOST_NAME,S.NAME,M.PHONE,TO_CHAR(ES.MODIFY_DATE, 'YYYY.MM.DD') AS MODIFY_DATE
            FROM EDIT_STAY ES
            JOIN STAY S ON (ES.STAY_NO = S.NO)
            JOIN MEMBER M ON (S.HOST_NO = M.NO)
            WHERE ES.STATUS_NO = '1'
            ORDER BY MODIFY_DATE
            """)
    List<StayVo> getStayEditList();

    @Select("""
            SELECT R.NO,M.NAME AS HOST_NAME,R.NAME,M.PHONE,TO_CHAR(ER.MODIFY_DATE, 'YYYY.MM.DD') AS MODIFY_DATE
            FROM EDIT_ROOM ER
            JOIN ROOM R ON (ER.ROOM_NO = R.NO)
            JOIN STAY S ON (R.STAY_NO = S.NO)
            JOIN MEMBER M ON (S.HOST_NO = M.NO)
            WHERE ER.STATUS_NO = '1'
            ORDER BY ER.MODIFY_DATE
            """)
    List<RoomVo> getRoomEditList();

    @Select("""
            SELECT S.NAME,ADDRESS,PHONE,SNS,BT.NAME AS BUSINESS_TYPE_NAME,BRN,TAGLINE,
            INTRODUCTION,STANDARD_GUEST,MAX_GUEST,DAYTIME_PRICE,NIGHT_PRICE
            FROM SPACE S
            JOIN BUSINESS_TYPE BT ON (S.BUSINESS_TYPE_NO = BT.NO)
            WHERE S.NO = #{spaceNo}
            """)
    SpaceVo getOriginSpace(String spaceNo);

    @Select("""
            SELECT M.NAME,M.PHONE,M.EMAIL
            FROM MEMBER M
            JOIN SPACE S ON(M.NO = S.HOST_NO)
            WHERE S.NO = #{spaceNo}
            """)
    GuestVo getSpaceHostVo(String spaceNo);

    @Select("""
            SELECT FEATURES_NO
            FROM SPACE_FEATURES
            WHERE SPACE_NO = #{spaceNo}
            """)
    List<String> getSpaceFeaturesList(String spaceNo);

    @Select("""
            SELECT SNS,INTRODUCTION,TAGLINE
            FROM EDIT_SPACE
            WHERE SPACE_NO = #{spaceNo}
            AND STATUS_NO = '1'
            """)
    SpaceVo getEditSpace(String spaceNo);

    @Select("""
            SELECT M.NAME,M.PHONE,M.EMAIL
            FROM MEMBER M
            JOIN STAY S ON(M.NO = S.HOST_NO)
            WHERE S.NO = #{stayNo}
            """)
    GuestVo getStayHostVo(String stayNo);

    @Select("""
            SELECT S.NO,S.NAME,ADDRESS,PHONE,BT.NAME AS BUSINESS_TYPE_NAME,BRN,SEASON
            FROM STAY S
            JOIN BUSINESS_TYPE BT ON (S.BUSINESS_TYPE_NO = BT.NO)
            WHERE S.NO = #{stayNo}
            """)
    StayVo getOriginStay(String stayNo);

    @Select("""
            SELECT SNS,INTRODUCTION,TAGLINE
            FROM EDIT_STAY
            WHERE STAY_NO = #{stayNo}
            AND STATUS_NO = '1'
            """)
    StayVo getEditStay(String stayNo);

    @Select("""
            SELECT NAME,INTRODUCTION
            FROM EDIT_ROOM
            WHERE ROOM_NO = #{roomNo}
            AND STATUS_NO = '1'
            """)
    SpaceVo getEditRoom(String roomNo);

    @Select("""
            SELECT RF.FEATURES_NO
            FROM ROOM R
            JOIN ROOM_FEATURES RF ON(R.NO = RF.ROOM_NO)
            WHERE R.NO = #{roomNo}
            """)
    List<String> getRoomFeaturesList(String roomNo);

    @Update("""
            MERGE INTO SPACE S
            USING EDIT_SPACE ES
            ON (S.NO = ES.SPACE_NO AND ES.STATUS_NO ='1')
            WHEN MATCHED THEN
                UPDATE SET
                    S.SNS = ES.SNS,
                    S.TAGLINE = ES.TAGLINE,
                    S.INTRODUCTION=ES.INTRODUCTION
            WHERE ES.SPACE_NO = '1'
            """)
    int approveEditSpace(String spaceNo);

    @Update("""
            UPDATE EDIT_SPACE SET
            STATUS_NO = '2'
            WHERE SPACE_NO = #{spaceNo}
            AND STATUS_NO = '1'
            """)
    int updateStaus(String spaceNo);

    @Update("""
            UPDATE EDIT_SPACE SET
            STATUS_NO = '3'
            WHERE SPACE_NO = #{spaceNo}
            AND STATUS_NO = '1' 
            """)
    int companionEditSpace(String spaceNo);

    @Update("""
            MERGE INTO STAY S
            USING EDIT_STAY ES
            ON (S.NO = ES.STAY_NO AND ES.STATUS_NO ='1')
            WHEN MATCHED THEN
                UPDATE SET
                    S.SNS = ES.SNS,
                    S.TAGLINE = ES.TAGLINE,
                    S.INTRODUCTION=ES.INTRODUCTION
                WHERE ES.STAY_NO = #{stayNo}
            """)
    int approveEditStay(String stayNo);

    @Update("""
            UPDATE EDIT_STAY SET
            STATUS_NO = '2'
            WHERE STAY_NO = #{stayNo}
            AND STATUS_NO = '1'
            """)
    int updateStayStaus(String stayNo);

    @Update("""
            UPDATE EDIT_STAY SET
            STATUS_NO = '3'
            WHERE STAY_NO = #{stayNo}
            AND STATUS_NO = '1' 
            """)
    int companionEditStay(String stayNo);

    @Update("""
            MERGE INTO ROOM R
            USING EDIT_ROOM ER
            ON (R.NO = ER.ROOM_NO AND ER.STATUS_NO ='1')
            WHEN MATCHED THEN
                UPDATE SET
                    R.NAME = ER.NAME,
                    R.INTRODUCTION=ER.INTRODUCTION
                WHERE ER.ROOM_NO = #{roomNo}
            """)
    int approveEditRoom(String roomNo);

    @Update("""
            UPDATE EDIT_ROOM SET
            STATUS_NO = '2'
            WHERE ROOM_NO = #{roomNo}
            AND STATUS_NO = '1'
            """)
    int updateRoomStatus(String roomNo);

    @Update("""
            UPDATE EDIT_ROOM SET
            STATUS_NO = '3'
            WHERE ROOM_NO = #{roomNo}
            AND STATUS_NO = '1' 
            """)
    int companionEditRoom(String roomNo);

    @Select("""
            SELECT M.NAME AS HOST_NAME,M.PHONE,S.NAME,TO_CHAR(S.MODIFY_DATE, 'YYYY.MM.DD') AS MODIFY_DATE
            FROM SPACE S
            JOIN MEMBER M ON (S.HOST_NO = M.NO)
            WHERE S.STATUS_NO = '7'
            """)
    List<SpaceVo> getDeleteSpaceList();

    @Select("""
            SELECT M.NAME AS HOST_NAME,M.PHONE,S.NAME,TO_CHAR(S.MODIFY_DATE, 'YYYY.MM.DD') AS MODIFY_DATE
            FROM STAY S
            JOIN MEMBER M ON (S.HOST_NO = M.NO)
            WHERE S.STATUS_NO = '7'            
            """)
    List<StayVo> getDeleteStayList();

}
