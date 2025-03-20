package com.kh.springfinal.bus;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/busticket")
@RequiredArgsConstructor
@CrossOrigin
public class BusTicketController {

    private final BusTicketService busTicketService;

    @PostMapping
    public List<BusVo> getBusTickets(@RequestBody BusVo vo){
        String zz = vo.getDepPlandTime();
        String dd = zz.substring(0, 2) + "/"  + zz.substring(2, 4) + "/" + zz.substring(4, 6);
        vo.setDepPlandTime(dd);
        List<BusVo> result = busTicketService.getBusTickets(vo);

        return result;
    }
}

