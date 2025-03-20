package com.kh.springfinal.space;

import com.kh.springfinal.guest.GuestVo;
import com.kh.springfinal.reservation.SpaceReservVo;
import com.kh.springfinal.slog.SlogVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("space")
@CrossOrigin
public class SpaceController {

    private final SpaceService service;

    @GetMapping("list")
    public List<SpaceVo> spaceGetListAll(@RequestParam String area,String people, String datedata,String title,String sort) throws InterruptedException {
        String date = datedata.replaceAll("-", "");
//        System.out.println("area"+area);
//        System.out.println("people"+people);
//        System.out.println("date"+date);
//        System.out.println("sort:::"+sort);
        if(title.equals("undefined")){
            title = null;
        }
//        System.out.println("title ::: "+title);
        List<SpaceVo> voList = service.spaceGetListAll(area,people,date,title,sort);

//        System.out.println("vo :::"+ voList);
        return voList;

    }
    @GetMapping("attachmentlist")
    public List<AttachmentVo> spacegetattachment() throws InterruptedException {

        List<AttachmentVo> attachmentVoList = service.spaceGetAttachment();
//        System.out.println("attachmentVoList = " + attachmentVoList);
        return attachmentVoList;
    }
    @PostMapping("detail")
    public SpaceVo spaceGetDetailVo(@RequestBody Long no){
//        System.out.println(no);
        return service.spaceGetDetailVo(no);
    }

    @PostMapping("reservation")
    public int reservation(@RequestBody SpaceReservVo vo){
//        System.out.println("vo::"+vo);
        String date = vo.getUseDay();
        String formattedDate = date.replaceAll("-", "");
        vo.setUseDay(formattedDate);
        int result = service.reservation(vo);
//        System.out.println("result ==="+result);

        return result;

    }
    @PostMapping("isAvailable")
    public String[] getIsAvailable(@RequestBody String no){
        String[] date = service.getIsAvailable(no);
//        System.out.println("date :::"+date);
        return date;
    }

    @PostMapping("packagedone")
    public SpaceReservVo packageDone(String no, String useDay){
        String date = useDay.replaceAll("-", "");

        SpaceReservVo vo = service.packageDone(no,date);
        if(vo == null){
            return new SpaceReservVo();
        }
        return vo;

    }
    @PostMapping("getTimeNow")
    public SpaceReservVo m01(SpaceReservVo vo){
        String date = vo.getUseDay();
        String formattedDate = date.replaceAll("-", "");
        vo.setUseDay(formattedDate);
        SpaceReservVo getVo = service.getNowTime(vo);

        return getVo;
    }
    @PostMapping("bookmark")
    public int bookmark(@RequestBody SpaceReservVo vo){
        return service.bookmark(vo);

    }
    @PostMapping("bookmarkdel")
    public int bookmarkdel(@RequestBody SpaceReservVo vo){
       return service.bookmarkdel(vo);
    }
    @PostMapping("getbookmarkInfo")
    public boolean getbookmark(@RequestBody SpaceReservVo vo){
        int result = service.getbookmark(vo);
        if(result >= 1){
            return true;
        }else{
            return false;
        }

    }
    @PostMapping("memberInfo")
    public GuestVo getmemberInfo(@RequestBody String no){
        GuestVo vo = service.getMemberInfo(no);
        return vo;
    };

}//clasee
