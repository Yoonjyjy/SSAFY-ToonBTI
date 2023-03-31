package com.ssafy.toonbti.webtoon.controller;

import com.ssafy.toonbti.webtoon.model.dto.WebtoonResultDTO;
import com.ssafy.toonbti.webtoon.model.service.WebtoonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
@RequiredArgsConstructor
public class WebtoonController {
    private final WebtoonService webtoonService;

    @MutationMapping
    public WebtoonResultDTO createResult(@Argument Long userId){
        return webtoonService.createResult(userId);
    }

}
