package com.kh.springfinal.train.ticket;


import com.kh.springfinal.train.TrainVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface TrainTicketMapper {



    @Select("""
            SELECT *
            FROM TRAIN
            WHERE DPTRE_STN_NM = #{dptreStnNm}
            AND ARVL_STN_NM = #{arvlStnNm}
            AND RUN_YMD = #{runYmd}
            ORDER BY TRN_PLAN_DPTRE_DT ASC
            """)
    List<TrainVo> getTicketDetails(TrainVo trainVo);
}

