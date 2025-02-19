package com.kh.springfinal.slog;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
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


            s3.putObject("hsi-server", randomName, file.getInputStream(), new ObjectMetadata());


            String fileUrl = s3.getUrl("hsi-server", randomName).toString();
            fileUrls.add(fileUrl);
        }

        return fileUrls;
    }



    @PostMapping("insert")
    public List<String> insert(@ModelAttribute SlogVo vo) {
        slogService.insert(vo);

        return List.of("Success");
    }




}

