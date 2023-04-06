package com.ssafy.toonbti.question.model.dto;

import com.ssafy.toonbti.question.model.entity.Answer;
import com.ssafy.toonbti.question.model.entity.Question;
import com.ssafy.toonbti.user.model.dto.UserAnswerDTO;
import lombok.*;
import org.jetbrains.annotations.NotNull;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class QuestionDTO {
    //질문 번호
    private Long questionNo;
    //질문 내용
    private String question;
    //질문 이미지 경로
    private String image;
    //질문답안 리스트
    private List<String> answersList;

    public static QuestionDTO of(@NotNull Question question, List<Answer> answersList){
        return QuestionDTO.builder()
                .questionNo(question.getQuestionId())
                .question(question.getQuestion())
                .image(question.getImage())
                .answersList(UserAnswerDTO.of(answersList))
                .build();
    }
}
