package com.kh.springfinal.util;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RequiredArgsConstructor
public class FileUtil {

    public static String generateRandomName(){
        String str = UUID.randomUUID().toString();
        return System.currentTimeMillis() + "_" +str;
    }

    public static String uploadFileToAws(MultipartFile f, AmazonS3 s3, String bucket) throws IOException {
        String ext = f.getOriginalFilename().substring(f.getOriginalFilename().lastIndexOf("."));
        String randomName = generateRandomName() + ext;

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(f.getContentType());
        metadata.setContentLength(f.getSize());

        s3.putObject( bucket, randomName ,f.getInputStream(), metadata);

        String url = s3.getUrl(bucket,randomName).toString();
        return url;
    }
}
