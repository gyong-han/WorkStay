package com.kh.springfinal.train;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainService {

    private final TrainDao trainDao;

    public void trainSchedules(List<TrainVo> voList) {
        for (TrainVo trainVo : voList) {
            trainDao.trainSchedules(trainVo);
        }
    }
}

