package com.kh.springfinal.train.ticket;


import com.kh.springfinal.train.TrainVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainTicketService {

    private final TrainTicketMapper trainTicketMapper;


    public List<TrainVo> getTicketDetails(TrainVo trainVo) {

        return trainTicketMapper.getTicketDetails(trainVo);
    }
}
