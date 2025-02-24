package com.kh.springfinal.slog;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SlogService {

    private final SlogMapper slogMapper;



    public void insert(SlogVo vo) {
        slogMapper.insert(vo);
    }


    public SlogVo detail(String no) {
        return slogMapper.detail(no);
    }

    public SlogVo getSlogVo(String no) {
        return slogMapper.findByNo(no);
    }

    public List<SlogVo> findAll(int pno) {
        int limit = 6;
        int offset = (pno-1) * limit;
        return slogMapper.findAll(offset, limit);
    }


    public List<RecPlaceVo> findRecplace(Long no) {
        System.out.println("no = " + no);
        return slogMapper.findRecPlace(no);
    }


}
