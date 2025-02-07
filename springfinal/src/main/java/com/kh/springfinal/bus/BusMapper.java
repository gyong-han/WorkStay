package com.kh.springfinal.bus;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BusMapper {


    @Select("""
            SELECT * FROM
            BUS_SCHEDULE_DETAILS
            WHERE ID = #{id}
            
            """)
    BusVo detail(String id);

    @Select("""
            SELECT * FROM
            BUS_SCHEDULE_DETAILS
            """)
    List<BusVo> list();

    @Insert("""
            INSERT INTO BUS_SCHEDULE_DETAILS
            (
                NO,
                ARR_PLACE_NM,
                ARR_PLAND_TIME,
                CHARGE,
                DEP_PLACE_NM,
                DEP_PLAND_TIME,
                GRADE_NM
                ROUTE_ID
            )
            VALUES
            (
                SEQ_BUS.NEXTVAL,
                #{arrPlaceNm},
                #{arrPlandTime}
                #{charge}
                #{depPlaceNm}
                #{depPlandTime}
                #{gradeNm}
                #{routeId}
            )
            

            """)
    int insert(BusVo vo);

    @Insert("""
            INSERT INTO BUS
            (
                NO,
                ARR_PLACE_NM,
                ARR_PLAND_TIME,
                CHARGE,
                DEP_PLACE_NM,
                DEP_PLAND_TIME,
                GRADE_NM,
                ROUTE_ID
            )
            VALUES
            (
                SEQ_BUS.NEXTVAL,
                #{arrPlaceNm},
                #{arrPlandTime},
                #{charge},
                #{depPlaceNm},
                #{depPlandTime},
                #{gradeNm},
                #{routeId}
            )
            

            """)
    void insertBusSchedule(BusVo busVo);
}
