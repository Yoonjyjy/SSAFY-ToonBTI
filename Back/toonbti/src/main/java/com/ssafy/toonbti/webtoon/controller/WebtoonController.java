package com.ssafy.toonbti.webtoon.controller;

import com.ssafy.toonbti.webtoon.model.dto.WebtoonResultDTO;
import com.ssafy.toonbti.webtoon.model.dto.WebtoonUserDTO;
import com.ssafy.toonbti.webtoon.model.service.WebtoonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
@RequiredArgsConstructor
public class WebtoonController {
    private final WebtoonService webtoonService;
    private final Logger logger = LoggerFactory.getLogger(WebtoonController.class);

    @MutationMapping
    public WebtoonResultDTO createResult(@Argument Long userId){
        logger.info("createResult | userId: {}", userId);
        return webtoonService.createResult(userId);
    }

    @QueryMapping
    public WebtoonUserDTO getRanking(@Argument Long userId){
        logger.info("getRanking | userId: {}", userId);
        return webtoonService.getRanking(userId);
    }

}
