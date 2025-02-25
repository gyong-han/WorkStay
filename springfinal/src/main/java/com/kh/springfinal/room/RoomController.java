package com.kh.springfinal.room;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("room")
@Slf4j
public class RoomController {
    private final RoomService roomService;

    @GetMapping("list")
    public List<RoomVo> getRoomListByStayNo(@RequestParam Long no){
        try{
            List<RoomVo> voList = roomService.getRoomListByStayNo(no);
            return voList;
        }catch (Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[ROOM-ERROR-01]ROOM-LIST FAIL");
        }
    }

    @PostMapping("detail")
    public RoomVo getRoomInfoByNo(@RequestBody Long no){
        try{
            return roomService.getRoomInfoByNo(no);
        }catch (Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[ROOM-ERROR-01]ROOM-DETAIL FAIL");
        }
    }

    @GetMapping("attachmentlist")
    public List<RoomAttachmentVo> attachmentList(){
        try{
            return roomService.attachmentList();
        }catch(Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[ROOM-ERROR-01]ROOM-ATTACHMENT LIST FAIL");
        }
    }



}
