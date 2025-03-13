package com.kh.springfinal.home;

import lombok.Data;

@Data
public class FaqVo {
    private Long no;
    private String title;
    private String content;
    private String showYn;
}
