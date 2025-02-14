package com.kh.springfinal.host;

import com.kh.springfinal.space.SpaceVo;
import com.kh.springfinal.stay.RoomVo;
import com.kh.springfinal.stay.StayVo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

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
                STANDARD_GUEST
            )
            VALUES
            (
                SEQ_ROOM.NEXTVAL,
                #{stayNo},
                #{name},
                #{introduction},
                #{price},
                #{maxGuest},
                #{standardGuest}
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
}