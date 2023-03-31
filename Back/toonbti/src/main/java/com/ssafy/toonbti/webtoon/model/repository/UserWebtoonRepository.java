package com.ssafy.toonbti.webtoon.model.repository;

import com.ssafy.toonbti.user.model.entity.User;
import com.ssafy.toonbti.webtoon.model.entity.UserWebtoon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserWebtoonRepository extends JpaRepository<UserWebtoon, Long>{
    List<UserWebtoon> findAllByUser(User user);

    Long countByUser(User user);
}
