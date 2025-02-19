package com.kh.springfinal.slog;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class SlogService {

    private final SlogMapper slogMapper;



    public void insert(SlogVo vo) {
        slogMapper.insert(vo);
    }
}
