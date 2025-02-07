package com.kh.springfinal.train;


import lombok.Data;

@Data
public class TrainVo {

    private String no;
    private String arvlStnCd;
    private String arvlStnNm;
    private String dptreStnCd;
    private String dptreStnNm;
    private String runYmd;
    private String trnNo;
    private String trnPlanArvlDt;
    private String trnPlanDptreDt;
}

