package com.ssafy.toonbti.user.model.dto;

import com.ssafy.toonbti.question.model.entity.Answer;
import com.ssafy.toonbti.user.model.entity.UserAnswer;
import lombok.*;
import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserAnswerDTO {

    //유저의 uuid
    private String uuid;
    //유저가 선택한 답안 리스트
    private List<String> answers;

    public static UserAnswerDTO of(@NotNull UserAnswer userAnswer, List<String> answers){
        return UserAnswerDTO.builder()
                .uuid(userAnswer.getUser().getUuid())
                .answers(answers)
                .build();
    }
    public static List<String> of(@NotNull List<Answer> answers) {
        List<String> ans = new ArrayList<>();
        for (Answer a : answers) {
            ans.add(a.getAnswer());
        }
        return ans;
    }
}
