package com.kh.springfinal.train;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("train")
public class TrainController {

    private final TrainService trainService;

    @PostMapping("insert")
    public String saveTrainData(@RequestBody List<TrainVo> voList){
        trainService.trainSchedules(voList);
        return "입력 성공!";
    }
}

