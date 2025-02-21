package com.kh.springfinal.room;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("room")
@Slf4j
public class RoomController {
    private final RoomService roomService;

    @GetMapping("list")
    public List<RoomVo> getRoomListByStayNo(Long no){
        try{
            return roomService.getRoomListByStayNo(no);
        }catch (Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[ROOM-ERROR-01]ROOM-LIST FAIL");
        }
    }
    @PostMapping("detail")
    public RoomVo getRoomInfoByNo(Long no){
        try{
            return roomService.getRoomInfoByNo(no);
        }catch (Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[ROOM-ERROR-01]ROOM-DETAIL FAIL");
        }
    }
}
