package com.ssafy.toonbti.user.model.repository;

import com.ssafy.toonbti.user.model.entity.Nbti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NbtiRepositroy extends JpaRepository<Nbti, Long> {
    Nbti findByName(String userType);

    Nbti findByNbtiId(Long nbitId);
}
