package com.kh.springfinal.space;

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
    public List<SpaceVo> spaceGetListAll(@RequestParam String area,String people, String datedata) throws InterruptedException {
        String date = datedata.replaceAll("-", "");
        List<SpaceVo> voList = service.spaceGetListAll(area,people,date);

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
    public int reservation(SpaceVo vo,String memberNo){
        String date = vo.getUseDay();
        String formattedDate = date.replaceAll("-", "");
        vo.setUseDay(formattedDate);
        int result = service.reservation(vo,memberNo);

        return result;

    }


}
