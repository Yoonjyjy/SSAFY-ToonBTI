package com.ssafy.toonbti.webtoon.model.repository;

import com.ssafy.toonbti.webtoon.model.entity.Webtoon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebtoonRepository extends JpaRepository<Webtoon, Long> {
}
