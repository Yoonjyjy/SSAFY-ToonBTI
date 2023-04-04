package com.ssafy.toonbti.question.model.service;

import com.ssafy.toonbti.question.model.dto.QuestionDTO;
import com.ssafy.toonbti.question.model.entity.Answer;
import com.ssafy.toonbti.question.model.entity.Question;
import com.ssafy.toonbti.question.model.repository.AnswerRepository;
import com.ssafy.toonbti.question.model.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    private final Logger logger = LoggerFactory.getLogger(QuestionService.class);

    /***
     * 모든 질문 반환
     * @return
     */
    public List<QuestionDTO> getQuestions() {
        List<QuestionDTO> questionDTOList = new ArrayList<>();
        // 모든 질문 찾아오기
        List<Question> questions = questionRepository.findAll();
        // 모든 질문을 entity -> DTO로 변환
        for (Question q : questions) {
            List<Answer> answers = answerRepository.findAllByQuestion(Optional.ofNullable(q));
            questionDTOList.add(QuestionDTO.of(q,answers));
        }
        logger.info("QuestionDTO List : {}", questionDTOList);

        return questionDTOList;
    }
}
