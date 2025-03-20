package com.kh.springfinal.bus;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusTicketService {

    private final BusTicketMapper busTicketMapper;

    public List<BusVo> getBusTickets(BusVo vo) {
        return busTicketMapper.getBusTickets(vo);
    }
}

