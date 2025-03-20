package com.kh.springfinal.train.ticket;


import com.kh.springfinal.train.TrainVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/trainticket")
@RequiredArgsConstructor
@CrossOrigin
public class TrainTicketController {

    private final TrainTicketService trainTicketService;

    @PostMapping
    public List<TrainVo> getTicketDetails(@RequestBody TrainVo trainVo){
        return trainTicketService.getTicketDetails(trainVo);

    }
}

