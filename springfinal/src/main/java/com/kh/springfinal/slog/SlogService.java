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


    public SlogVo getSlogVo(String no) {

//        System.out.println("Service :::: no = " + no);

        return slogMapper.findByNo(no);
    }

    public List<SlogVo> findAll(int pno) {
        int limit = 6;
        int offset = (pno-1) * limit;
        return slogMapper.findAll(offset, limit);
    }


    public List<RecPlaceVo> findRecplace(Long no) {

        return slogMapper.findRecPlace(no);
    }


    public int delete(String no) {
        return slogMapper.delete(no);
    }


    public int edit(SlogVo slogVo) {
        return slogMapper.edit(slogVo);
    }


    public SlogVo shareKakao(String no) {


        return slogMapper.shareKakao(no);
    }

    public SlogVo getMapInfo(String no) {
        return slogMapper.getMapInfo(no);
    }
}
