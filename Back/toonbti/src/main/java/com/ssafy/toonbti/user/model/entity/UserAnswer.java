package com.ssafy.toonbti.user.model.entity;

import com.ssafy.toonbti.question.model.entity.Answer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "userAnswer")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAnswer {
    @Id
    @Column(name = "useranswer_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userAnswerId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;
}
