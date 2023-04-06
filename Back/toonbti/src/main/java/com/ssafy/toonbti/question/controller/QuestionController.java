package com.ssafy.toonbti.question.controller;

import com.ssafy.toonbti.question.model.dto.QuestionDTO;
import com.ssafy.toonbti.question.model.service.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import java.util.List;

@Controller
@Slf4j
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;
    private final Logger logger = LoggerFactory.getLogger(QuestionService.class);

    /***
     * 모든 질문 반환
     * @return list형태의 QuestionDTO
     */
    @QueryMapping
    public List<QuestionDTO> getQuestions(){
        logger.info("getQuestions");
        return questionService.getQuestions();
    }
}
