package com.kh.springfinal.stay;

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
    public List<StayAttachmentVo> attachmentList(){
        try{
            List<StayAttachmentVo> stayAttachmentVoList = stayService.stayGetAttachmentList();
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
                                       @RequestParam(required = false) String dateData){
        try{
            System.out.println("sort = " + sort);
            System.out.println("people = " + people);
            System.out.println("area = " + area);
            System.out.println("dateData = " + dateData);
            String date = (dateData != null) ? dateData.replaceAll("-", "") : null;
            return stayService.sortByList(sort, people, area, date);
        }catch (Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[STAY-ERROR-03]STAY SORT-LIST FAIL");
        }
    }

    @PostMapping("detail")
    public StayVo getFindStayByNo(@RequestBody Long no){
        try{
            return stayService.getFindStayByNo(no);
        }catch (Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[STAY-ERROR-03]STAY DETAIL FAIL");
        }
    }
}
