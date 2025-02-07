package com.kh.springfinal.train;


import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TrainMapper {

    @Insert("""
            INSERT INTO TRAIN
                        (
                            NO,
                            ARVL_STN_CD,
                            ARVL_STN_NM,
                            DPTRE_STN_CD,
                            DPTRE_STN_NM,
                            RUN_YMD,
                            TRN_NO,
                            TRN_PLAN_ARVL_DT,
                            TRN_PLAN_DPTRE_DT
                        )
                        VALUES
                        (
                            SEQ_TRAIN.NEXTVAL,
                            #{arvlStnCd},
                            #{arvlStnNm},
                            #{dptreStnCd},
                            #{dptreStnNm},
                            #{runYmd},
                            #{trnNo},
                            #{trnPlanArvlDt},
                            #{trnPlanDptreDt}
                        )
            
            
            """)
    void insertTrainSchedules(TrainVo trainVo);
}

