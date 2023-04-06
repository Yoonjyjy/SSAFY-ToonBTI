package com.ssafy.toonbti.user.model.repository;

import com.ssafy.toonbti.user.model.entity.Nbti;
import com.ssafy.toonbti.user.model.entity.User;
import com.ssafy.toonbti.user.model.entity.UserNbti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserNbtiRepositroy extends JpaRepository<UserNbti, Long> {
    Long countByNbti(Nbti nbti);
    @Query(value="SELECT nbti_id, count(*) FROM toonbti.usernbti group by nbti_id order by count(*) desc", nativeQuery = true)
    List<Object[]> getRanking();

    UserNbti findByUser(User user);
}
