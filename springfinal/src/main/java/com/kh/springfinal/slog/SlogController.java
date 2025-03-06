package com.kh.springfinal.slog;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/slog")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class SlogController {

    private final SlogService slogService;

    private final AmazonS3 s3;

    @PostMapping("upload")
    public List<String> upload(@RequestParam("files") MultipartFile[] files) throws IOException {

        List<String> fileUrls = new ArrayList<>();

        for (MultipartFile file : files) {


            String randomName = "FINAL_" + System.currentTimeMillis() + file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));


            s3.putObject("sgh-final-server", randomName, file.getInputStream(), new ObjectMetadata());


            String fileUrl = s3.getUrl("sgh-final-server", randomName).toString();
            fileUrls.add(fileUrl);
        }

        return fileUrls;
    }

    @PostMapping("title/upload")
    public List<String> titleUpload(@RequestParam("files") MultipartFile[] files) throws IOException {

        List<String> titleFileUrls = new ArrayList<>();

        for (MultipartFile file : files) {


            String randomName = "TITLE_" + System.currentTimeMillis() + file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));


            s3.putObject("sgh-final-server", randomName, file.getInputStream(), new ObjectMetadata());


            String titleFileUrl = s3.getUrl("sgh-final-server", randomName).toString();
            titleFileUrls.add(titleFileUrl);
        }

        return titleFileUrls;
    }

    @GetMapping("list")
    public ResponseEntity<Object> findAll(@RequestParam(defaultValue = "1") int pno){

        System.out.println("pno = " + pno);
        
        try{
            List<SlogVo> result = slogService.findAll(pno);
            System.out.println("LIst ::::::::::::"+result);
            return ResponseEntity.ok().body(result);

        }catch(Exception e){
            throw new IllegalStateException("[list] fail....");
        }
    }



    @PostMapping("insert")
    public List<String> insert(@ModelAttribute SlogVo vo) {
        
        slogService.insert(vo);

        return List.of("Success");
    }


    @GetMapping("kakao/{no}")
    public SlogVo shareKakao (@PathVariable String no){

//        System.out.println("Controller ::: no = " + no);

        try{
            return slogService.shareKakao(no);
        } catch(Exception e){
            log.error(e.getMessage());
            throw new IllegalStateException("[DETAIL] FAIL........");
        }
    }


    @GetMapping("{no}")
    public SlogVo getSlogVo (@PathVariable String no){

        System.out.println("Controller ::: no = " + no);

        try{
            return slogService.getSlogVo(no);
        } catch(Exception e){
            log.error(e.getMessage());
            throw new IllegalStateException("[DETAIL] FAIL........");
        }
    }

    @GetMapping("stay/{no}")
    public SlogVo getMapInfo (@PathVariable String no){

        System.out.println("Controller ::: stay.no = " + no);

        try{
            return slogService.getMapInfo(no);
        } catch(Exception e){
            log.error(e.getMessage());
            throw new IllegalStateException("[DETAIL] FAIL........");
        }
    }





    @GetMapping("rec")
    public List<RecPlaceVo> findRecPlace(@RequestParam Long no) {
//        System.out.println("no = " + no);
        List<RecPlaceVo> recPlaces = slogService.findRecplace(no);
        if (recPlaces == null || recPlaces.isEmpty()) {
            return new ArrayList<>();

        }
//        System.out.println(recPlaces);
        return recPlaces;
    }

    @DeleteMapping("delete/{no}")
    public int delete(@PathVariable("no") String no){
        int result = slogService.delete(no);
        return result;
    }




        @PutMapping("/edit/{no}")
        public int editSlog(@PathVariable("no") String no,
                            @RequestParam("title") String title,
                            @RequestParam("content") String content,
                            @RequestParam("tagline") String tagline,
                            @RequestParam(value = "fileUrl", required = false) String fileUrl,
                            @RequestParam(value = "titleFileUrl", required = false) String titleFileUrl,
                            @RequestParam(value = "originalName", required = false) String originalName,
                            @RequestParam(value = "files", required = false) MultipartFile[] files,
                            SlogVo slogVo) {

            slogVo.setNo(no);
            System.out.println("editno = " + no);
            int result = slogService.edit(slogVo);
            return result;


        }
    }










