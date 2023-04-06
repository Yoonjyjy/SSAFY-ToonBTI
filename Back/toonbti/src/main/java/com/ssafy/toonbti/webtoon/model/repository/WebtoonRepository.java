package com.ssafy.toonbti.webtoon.model.repository;

import com.ssafy.toonbti.webtoon.model.entity.Webtoon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WebtoonRepository extends JpaRepository<Webtoon, Long> {
    @Query(value = "select image from webtoon order by rand() limit 12", nativeQuery = true)
    List<String> getRand12();
}
