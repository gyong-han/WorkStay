package com.kh.springfinal.train;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TrainDao {

    private final TrainMapper trainMapper;

    public void trainSchedules(TrainVo trainVo) {
        trainMapper.insertTrainSchedules(trainVo);
    }
}

