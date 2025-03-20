package com.kh.springfinal.stay;

import com.kh.springfinal.room.RoomAttachmentVo;
import com.kh.springfinal.roomReservation.RoomReservationVo;
import com.kh.springfinal.slog.SlogVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("stay")
public class StayController {
    private final StayService stayService;

//    @GetMapping("list")
//    public List<StayVo> getFindStayAll(){
//        try{
//             List<StayVo> voList = stayService.getFindStayAll();
//             return voList;
//        }catch (Exception e){
//            log.warn(e.getMessage());
//            throw new IllegalStateException("[STAY-ERROR-01]STAY LIST FAIL");
//        }
//    }
    @GetMapping("attachmentlist")
    public List<RoomAttachmentVo> attachmentList(){
        try{
            List<RoomAttachmentVo> stayAttachmentVoList = stayService.stayGetAttachmentList();
            return stayAttachmentVoList;
        }catch (Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[STAY-ERROR-02]STAY ATTACHMENT-LIST FAIL");
        }
    }

    @GetMapping("list")
    public List<StayVo> sortByList(    @RequestParam(defaultValue = "latest") String sort,
                                       @RequestParam(required = false) String people,
                                       @RequestParam(required = false) String area,
                                       @RequestParam(required = false) String checkInData,
                                       @RequestParam(required = false) String checkOutData,
                                       @RequestParam(required = false) String title ){
        try{
            String checkIn = (checkInData != null) ? checkInData.replaceAll("-", "") : null;
            String checkOut = (checkOutData != null) ? checkOutData.replaceAll("-", "") : null;
            return stayService.filterByList(sort, people, area, checkIn, checkOut, title);
        }catch (Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[STAY-ERROR-03]STAY SORT-LIST FAIL");
        }
    }

    @PostMapping("detail")
    public StayVo getFindStayByNo(@RequestBody Long no){
        try{
            StayVo stayVo = stayService.getFindStayByNo(no);
            return stayVo;
        }catch (Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[STAY-ERROR-03]STAY DETAIL FAIL");
        }
    }

    @PostMapping("bookmark")
    public int bookmark(@RequestBody RoomReservationVo vo){
        try{
            int result = stayService.bookmark(vo);
            return result;
        }catch(Exception e) {
            log.warn(e.getMessage());
            throw new IllegalStateException("[STAY-ERROR-04]STAY BOOKMARK FAIL");
        }
    }
    @PostMapping("bookmarkdel")
    public int bookmarkDel(@RequestBody RoomReservationVo vo){
        try{
            int result = stayService.bookmarkDel(vo);
            return result;
        }catch(Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[STAY-ERROR-05]STAY BOOKMARK_DEL FAIL");
        }
    }

    @PostMapping("bookmarkInfo")
    public boolean bookmarkInfo(@RequestBody RoomReservationVo vo){
        try{
            int result = stayService.getBookmarkInfo(vo);
            if(result >= 1){
                return true;
            }else{
                return false;
            }
        }catch (Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[STAY-ERROR-06]STAY BOOKMARK_INFO FAIL");
        }
    }

    @PostMapping("getSlogReview")
    public List<SlogVo> getSlogReview(@RequestBody Long no){
        try{
            return stayService.getSlogReview(no);
        }catch(Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[STAY-ERROR-05]STAY BOOKMARK_DEL FAIL");
        }
    }
}
