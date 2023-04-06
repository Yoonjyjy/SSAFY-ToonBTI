package com.ssafy.toonbti.question.model.repository;

import com.ssafy.toonbti.question.model.entity.Answer;
import com.ssafy.toonbti.question.model.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findAllByQuestion(Optional<Question> question);
}
