package com.kh.springfinal.stay;

import com.kh.springfinal.space.AttachmentVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("stay")
public class StayController {
    private final StayService stayService;

    @GetMapping("list")
    public List<StayVo> getFindStayAll(){
        try{
             List<StayVo> voList = stayService.getFindStayAll();
             return voList;
        }catch (Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[STAY-ERROR-01]STAY LIST FAIL");
        }
    }
    @GetMapping("attachmentlist")
    public List<AttachmentVo> attachmentList(){
        try{
            List<AttachmentVo> attachmentVoList = stayService.stayGetAttachmentList();
            return attachmentVoList;
        }catch (Exception e){
            log.warn(e.getMessage());
            throw new IllegalStateException("[STAY-ERROR-02]STAY ATTACHMENT-LIST FAIL");
        }
    }
//    @GetMapping("detail")
//    public StayVo getFindStayByNo(@RequestBody Long no){
//        try{
//            return stayService.getFindStayByNo(no);
//        }catch (Exception e){
//            log.warn(e.getMessage());
//            throw new IllegalStateException("[STAY-ERROR-03]STAY DETAIL FAIL");
//        }
//    }


}
