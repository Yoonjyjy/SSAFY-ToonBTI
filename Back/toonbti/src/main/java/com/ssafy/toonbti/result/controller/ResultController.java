package com.ssafy.toonbti.result.controller;

import com.ssafy.toonbti.result.model.service.ResultService;
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
public class ResultController {
    private final ResultService resultService;
    private final Logger logger = LoggerFactory.getLogger(ResultController.class);

    @MutationMapping
    public String saveResultJsonFile(@Argument String data, @Argument String uuid){
        log.info("ResultJsonReqDTO | data : {}, uuid : {}", data, uuid);
        try{
            resultService.saveResultJsonFile(data, uuid);
        }catch (Exception e){
            return "error";
        }
        return "success";
    }

    @QueryMapping
    public String getResultJsonFile(@Argument String uuid){
        log.info("ResultJsonReqDTO | uuid : {}", uuid);
        try{
            return resultService.getResultJsonFile(uuid);
        }catch (Exception e){
            return "error";
        }
    }
}
