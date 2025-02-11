package com.kh.springfinal.bus;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BusTicketMapper {

    @Select("""
    SELECT *
    FROM BUS
    WHERE ARR_PLACE_NM = #{arrPlaceNm}
    AND DEP_PLACE_NM = #{depPlaceNm}
    AND TO_CHAR(DEP_PLAND_TIME, 'YY/MM/DD HH24:MI')  LIKE  #{depPlandTime} || '%'
    """)
    List<BusVo> getBusTickets(BusVo vo);
}
