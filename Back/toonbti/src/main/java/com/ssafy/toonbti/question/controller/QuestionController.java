package com.ssafy.toonbti.question.controller;

import com.ssafy.toonbti.question.model.dto.QuestionDTO;
import com.ssafy.toonbti.question.model.service.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Controller
@Slf4j
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;

    /***
     * 모든 질문 반환
     * @return list형태의 QuestionDTO
     */
    @QueryMapping
    public List<QuestionDTO> getQuestions(){
        return questionService.getQuestions();
    }
}
