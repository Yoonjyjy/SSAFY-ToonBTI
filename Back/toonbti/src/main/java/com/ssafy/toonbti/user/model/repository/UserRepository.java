package com.ssafy.toonbti.user.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.toonbti.user.model.entity.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUuid(String uuid);

}
